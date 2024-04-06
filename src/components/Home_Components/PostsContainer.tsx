import { useState } from "react"
import MyPostsWrapper from "./MyPostsWrapper"
import AllPostsWrapper from "./AllPostsWrapper"
import PostsFilter from "./PostsFilter"

const PostsContainer = () => {
  const [container, setContainer] = useState<"mine" | "all">("all")

  return (
    <section className="w-full h-full flex flex-col mt-8">
      <PostsFilter container={container} setContainer={setContainer} />
      <div className="h-full relative">
        {container === "all" ? <AllPostsWrapper /> : <MyPostsWrapper />}
      </div>
    </section>
  )
}

export default PostsContainer
