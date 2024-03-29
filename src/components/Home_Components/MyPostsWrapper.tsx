import { useEffect, useState } from "react"
import StretchedPostCard from "./StretchedPostCard"
import { IPostData } from "../../types"
import { getUserPosts } from "../../api/apiCalls"
import { useAuthContext } from "../../context/AuthContext"
import { ClipLoader } from "react-spinners"

const MyPostsWrapper = () => {
  const [posts, setPosts] = useState<IPostData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserPosts(user!!.id)
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
    <div className="w-full overflow-y-auto scroll-bar pr-2 h-[320px]">
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