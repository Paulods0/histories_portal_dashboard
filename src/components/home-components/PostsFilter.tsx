import React from "react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"

type PostFilterProps = {
  setContainer: React.Dispatch<React.SetStateAction<"mine" | "all">>
  container: string
}

const PostsFilter = ({ setContainer, container }: PostFilterProps) => {
  return (
    <div className="w-full mx-auto px-4 flex text-[14px] font-medium  gap-4 items-center justify-between mb-2">
      <div className="flex items-center gap-x-2">
        <span className="capitalize font-bold text-lg mr-2">filtrar:</span>
        <button
          onClick={() => setContainer("all")}
          className={`${
            container === "all"
              ? "px-2 py-1 rounded-md bg-muted font-bold "
              : "px-2 py-1 rounded-md text-muted-foreground"
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setContainer("mine")}
          className={`${
            container === "mine"
              ? "px-2 py-1 rounded-md bg-muted font-bold "
              : "px-2 py-1 rounded-md text-muted-foreground"
          }`}
        >
          Os meus posts
        </button>
      </div>
      <Link to={"/novopost"} className="self-end text-[14px] underline">
        <Button variant={"outline"}>Adicionar</Button>
      </Link>
    </div>
  )
}

export default PostsFilter
