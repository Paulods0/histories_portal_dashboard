import { useEffect, useState } from "react"
import MyPostsWrapper from "./MyPostsWrapper"
import AllPostsWrapper from "./AllPostsWrapper"
import PostsFilter from "./PostsFilter"
import { getAllPosts } from "../../api/apiCalls"
import { IPostData } from "../../types"

const PostsContainer = () => {
  const [container, setContainer] = useState<"mine" | "all">("all")
 
  return (
    <section className="w-full flex flex-col h-full">
      <PostsFilter container={container} setContainer={setContainer} />
      {container === "all" ? <AllPostsWrapper /> : <MyPostsWrapper />}
    </section>
  )
}

export default PostsContainer
