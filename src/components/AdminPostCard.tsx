import React, { useState } from "react"
import { IPostData } from "../types"
import { PostProps } from "./RecentPostCard"
import { Link } from "react-router-dom"

interface IPostCard {
  post: {
    _id: string
    category: {
      name: string
    }
    content: string
    isHighlighted: boolean
    mainImage: string
    subtitle: string
    title: string
  }
}

const AdminPostCard: React.FC<IPostCard> = ({
  post: { _id, category, content, isHighlighted, mainImage, subtitle, title },
}) => {
  return (
    <Link
      to={`/post/${_id}`}
      className="cursor-pointer bg-white/30 rounded-lg h-[250px] w-full flex items-center flex-col shadow-sm border border-[1px_solid_#fff]"
    >
      <div className=" w-full h-[160px] rounded-t-lg">
        <img
          src={mainImage}
          className=" w-full h-full object-cover rounded-t-lg"
          alt="Main photo"
        />
      </div>
      <div className="w-full flex flex-col p-2">
        <h1 className="text-[16px] text-pretty font-semibold">
          {title.substring(0, 40).concat("...")}
        </h1>
        <div className="flex">
          <span className="text-[12px] text-[#9D9D9D] mr-1">Categoria:</span>
          <span className="text-[12px] text-[#9D9D9D]">{category.name}</span>
        </div>
      </div>
    </Link>
  )
}

export default AdminPostCard
