import React, { useState } from "react"
import { IPostData } from "../types"
import { PostProps } from "./RecentPostCard"
import { Link } from "react-router-dom"

interface IPostCard {
  post: IPostData
}

const AdminPostCard: React.FC<IPostCard> = ({
  post: { _id, category, mainImage, author, title },
}) => {
  return (
    <Link
      to={`/post/${_id}`}
      className="cursor-pointer bg-white rounded-lg h-[250px] w-full flex items-center flex-col border border-GRAY-LIGHTER"
    >
      <div className="relative w-full h-[160px] rounded-t-lg">
        <img
          src={mainImage}
          className=" w-full h-full absolute inset-0 object-cover rounded-t-lg"
          alt="Main photo"
        />
      </div>
      <div className="w-full flex flex-col p-2">
        <h1 className="text-[16px] text-pretty font-semibold">
          {title.substring(0, 40).concat("...")}
        </h1>
        <div className="flex items-center w-full justify-between mt-2">
          <div className="flex">
            <span className="text-[12px] text-[#9D9D9D] mr-1">Categoria:</span>
            <span className="text-[12px] text-[#9D9D9D]">{category?.name}</span>
          </div>
          <div className="flex items-center gap-1 text-[12px]">
            <span className="text-GRAY-DARKER">Author: </span>
            <span className="text-GRAY-DARKER">
              {author ? `${author.firstname} ${author.lastname}` : "unknown"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default AdminPostCard
