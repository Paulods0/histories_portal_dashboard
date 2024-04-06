import { useEffect, useState } from "react"
import StretchedPostCard from "./StretchedPostCard"
import { IPostData } from "../../interfaces"
import { getUserPosts } from "../../api"
import { useAuthContext } from "../../context/AuthContext"
import { ClipLoader } from "react-spinners"

const MyPostsWrapper = () => {
  const [posts, setPosts] = useState<IPostData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { userId } = useAuthContext()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserPosts(userId!!)
        setPosts(data)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <ClipLoader color="#111111" size={28} />
      </div>
    )
  }

  return (
    <div className="w-full overflow-y-auto scroll-bar pr-2 absolute h-[92%]">
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

export default MyPostsWrapper
