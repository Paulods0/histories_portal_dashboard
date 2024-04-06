import { useEffect, useState } from "react"
import StretchedPostCard from "./StretchedPostCard"
import { IPostData } from "../../interfaces"
import { getAllPosts } from "../../api"
import { ClipLoader } from "react-spinners"

const AllPostsWrapper = () => {
  const [posts, setPosts] = useState<IPostData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const data = await getAllPosts()
        setPosts(data)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }
    fetchPostsData()
  }, [])

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <ClipLoader color="#111111" size={28} />
      </div>
    )
  }
  return (
    <div className="w-full overflow-y-auto pr-2 scroll-bar absolute h-[92%]">
      {posts.length === 0 || posts.length === undefined ? (
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-black">Não há posts ainda</h1>
        </div>
      ) : (
        posts &&
        posts.map((post) => (
          <div key={post._id}>
            <StretchedPostCard post={post} />
          </div>
        ))
      )}
    </div>
  )
}

export default AllPostsWrapper
