import { PostData } from "../types/data"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth } from "@/context/AuthContext"

type PostCardProps = {
  post: PostData
}

const AdminPostCard = ({
  post: { _id, category, mainImage, author, title },
}: PostCardProps) => {
  return (
    <div className="bg-background h-[270px] w-full flex items-center flex-col border border-secondary">
      <Link to={`/post/${_id}`} className="relative w-full h-[160px] ">
        <img
          src={mainImage}
          className=" w-full h-full absolute inset-0 object-cover "
          alt="Main photo"
        />
      </Link>
      <div className="w-full flex flex-col p-2">
        <h1 className="text-[16px] text-pretty font-semibold line-clamp-1">
          {title}
        </h1>
        <div className="flex flex-col items-start w-full justify-between mt-2">
          <div className="flex">
            <span className="text-[12px] text-foreground mr-1">Categoria:</span>
            <span className="text-[12px] text-foreground">
              {category?.name}
            </span>
          </div>

          <div className="flex items-center w-full text-[12px] justify-between">
            <div className="flex items-center gap-1">
              <span className="text-GRAY-DARKER">Author: </span>
              <span className="text-GRAY-DARKER">
                {author ? `${author.firstname} ${author.lastname}` : "unknown"}
              </span>
            </div>

            {/* {userId === author._id && (
            )} */}
            <Button variant={"outline"}>
              <Link to={`/edit-post/${_id}`}>Editar</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPostCard
