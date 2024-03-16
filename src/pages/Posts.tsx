import { useEffect, useState } from "react"
import { IPostData } from "../types"
import { getAllPosts } from "../api/apiCalls"
import AdminPostCard from "../components/AdminPostCard"
import { BeatLoader } from "react-spinners"

const Posts = () => {
  const [posts, setPosts] = useState<IPostData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllPosts()
      setPosts(data)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <main className="relative w-full h-[80vh] flex items-center justify-center">
        <BeatLoader color="#382A3F" />
      </main>
    )
  }

  if (posts.length === 0) {
    return <h1>Não há nada ainda.</h1>
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

// ) : (
//   !posts && (
//     <>
//       <main className="relative w-full h-[80vh] flex items-center justify-center">
//         <h1>Não há nenhum post</h1>
//       </main>
//     </>
//   )
