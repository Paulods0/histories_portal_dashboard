import { useEffect, useState } from "react"
import { IPostData } from "../interfaces"
import { getAllPosts } from "../api"
import AdminPostCard from "../components/AdminPostCard"
import { BeatLoader, ClipLoader } from "react-spinners"

const Posts = () => {
  const [posts, setPosts] = useState<IPostData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPosts()
        setPosts(data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <main className="relative w-full h-[80vh] flex items-center justify-center">
        <ClipLoader color="#111111" size={40} />
      </main>
    )
  }

  if (posts.length === 0) {
    return (
      <main className="w-full h-full flex items-center justify-center">
        <h1>Não há posts nada ainda.</h1>
      </main>
    )
  }

  return (
    <main className="w-full h-full p-2 rounded-[10px] ">
      <div className="w-full flex items-center justify-between mb-3 p-3">
        <button>1</button>
        <button>2</button>
      </div>

      <div className="w-full relative gap-4 grid grid-cols-4 scroll-bar overflow-y-auto h-[calc(90vh-80px)]">
        {posts.map((post) => (
          <div key={post._id}>
            <AdminPostCard post={post} />
          </div>
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
