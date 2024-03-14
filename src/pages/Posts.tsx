import { useEffect, useState } from "react"
import { IPostData } from "../types"
import { getAllPosts } from "../api/apiCalls"
import AdminPostCard from "../components/AdminPostCard"
import { BeatLoader } from "react-spinners"

const Posts = () => {
  const [posts, setPosts] = useState<IPostData[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllPosts()
      setPosts(data)
    }
    fetchData()
  }, [])

  if (posts.length <= 0) {
    return (
      <main className="relative w-full h-[80vh] flex items-center justify-center">
        {/* <div className="absolute inset-0 w-full h-full bg-[#2391ff]"></div> */}
        <BeatLoader color="#382A3F" />
      </main>
    )
  }

  return (
    <main className="w-full h-[500px] py-4 pr-4 scroll-bar overflow-y-auto">
      <div className="w-full relative gap-4 grid grid-cols-4">
        {posts.map((post) => (
          <AdminPostCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  )
}

export default Posts
