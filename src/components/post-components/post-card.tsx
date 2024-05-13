import { Post } from "../../types/data"
import { Link } from "react-router-dom"
import DeletePostDialog from "./delete-post-dialog"
import { CiEdit } from "react-icons/ci"
import { useAuthContext } from "@/context/auth-context"

type PostCardProps = {
  post: Post
}

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useAuthContext()

  return (
    <div className="bg-background h-[270px] w-full flex items-center flex-col border border-secondary">
      <Link to={`/post/${post._id}`} className="relative w-full h-[160px] ">
        <img
          src={post.mainImage}
          loading="lazy"
          className=" w-full h-full absolute inset-0 object-cover "
          alt="Main photo"
        />
      </Link>
      <div className="w-full flex flex-col p-2">
        <h1 className="text-[16px] text-pretty font-semibold line-clamp-1">
          {post.title}
        </h1>
        <div className="flex flex-col items-start w-full justify-between mt-2">
          <div className="flex">
            <span className="text-[12px] text-foreground mr-1">Categoria:</span>
            <span className="text-[12px] text-foreground">
              {post.category?.name}
            </span>
          </div>

          <div className="flex items-center w-full text-[12px] justify-between">
            <div className="flex items-center gap-1">
              <span className="text-GRAY-DARKER">Author: </span>
              <span className="text-GRAY-DARKER">
                {post.author
                  ? `${post.author.firstname} ${post.author.lastname}`
                  : "unknown"}
              </span>
            </div>

            {user!!.role !== "store-manager" && (
              <div className="flex items-center gap-3">
                <Link to={`/edit-post/${post._id}`}>
                  <CiEdit size={22} />
                </Link>

                <DeletePostDialog post={post} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
