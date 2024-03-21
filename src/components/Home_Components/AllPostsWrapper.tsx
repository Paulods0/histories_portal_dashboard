import { useEffect, useState } from "react"
import StretchedPostCard from "./StretchedPostCard"
import { IPostData } from "../../types"
import { getAllPosts } from "../../api/apiCalls"

const AllPostsWrapper = () => {
  const [posts, setPosts] = useState<IPostData[]>()

  useEffect(() => {
    const fetchPostsData = async () => {
      const data = await getAllPosts()
      setPosts(data)
      // setIsLoading(false)
    }
    fetchPostsData()
  }, [])
  return (
    <div className="w-full overflow-y-auto scroll-bar h-[320px]">
      {posts?.map((post) => (
        <div key={post._id}>
          <StretchedPostCard post={post} />
        </div>
      ))}
    </div>
  )
}

export default AllPostsWrapper
