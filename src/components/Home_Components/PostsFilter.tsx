import React from "react"
import { Link } from "react-router-dom"

const PostsFilter = ({
  setContainer,
  container,
}: {
  setContainer: React.Dispatch<React.SetStateAction<"mine" | "all">>
  container: string
}) => {
  return (
    <div className="w-full mx-auto px-4 flex text-[14px] font-medium  gap-4 items-center justify-between mb-2">
      <div className="flex items-center gap-x-2">
        <button
          onClick={() => setContainer("all")}
          className={`${
            container === "all" ? "text-zinc-900 font-bold" : "text-zinc-400"
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setContainer("mine")}
          className={`${
            container === "mine" ? "text-zinc-900 font-bold" : "text-zinc-400"
          }`}
        >
          Os meus posts
        </button>
      </div>
      <Link to={"/posts"} className="self-end text-[14px] underline">
        Ver todos
      </Link>
    </div>
  )
}

export default PostsFilter
