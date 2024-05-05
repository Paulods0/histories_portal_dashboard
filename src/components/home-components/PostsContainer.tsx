import { useState } from "react"
import MyPostsWrapper from "./MyPostsWrapper"
import AllPostsWrapper from "./AllPostsWrapper"
import PostsFilter from "./PostsFilter"

const PostsContainer = () => {
  const [container, setContainer] = useState<"mine" | "all">("all")

  return (
    <section className="w-full absolute h-full overflow-y-hidden scroll-bar bg-background flex flex-col">
      <PostsFilter container={container} setContainer={setContainer} />
      <div className="h-full w-full">
        {container === "all" ? <AllPostsWrapper /> : <MyPostsWrapper />}
      </div>
    </section>
  )
}

export default PostsContainer
