import React from "react"

const PostsFilter = ({
  setContainer,
  container,
}: {
  setContainer: React.Dispatch<React.SetStateAction<"mine" | "all">>
  container: string
}) => {
  return (
    <div className="w-full flex text-[14px] font-medium ml-4 gap-4 items-center mb-4">
      <button
        onClick={() => setContainer("all")}
        className={`${container === "all" ? "text-BLACK" : "text-GRAY-DARKER"}`}
      >
        Todos
      </button>
      <button
        onClick={() => setContainer("mine")}
        className={`${
          container === "mine" ? "text-BLACK" : "text-GRAY-DARKER"
        }`}
      >
        Os meus posts
      </button>
    </div>
  )
}

export default PostsFilter
