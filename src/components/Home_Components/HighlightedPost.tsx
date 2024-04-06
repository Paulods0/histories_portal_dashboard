import { useEffect, useState } from "react"
import { IPostData } from "../../interfaces"
import { getHighlightedPost } from "../../api"
import { Link } from "react-router-dom"
import { ClipLoader } from "react-spinners"

const HighlightedPost = () => {
  const [highlightedPost, setHighlightedPost] = useState<IPostData>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHighlightedPost()
        setHighlightedPost(data)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <main className="w-full h-full flex items-center justify-center">
        <ClipLoader size={40} color="#111111" />
      </main>
    )
  }

  return (
    <Link
      to={`/post/${highlightedPost?._id}`}
      className="relative outline-none border-none"
    >
      <img
        src={highlightedPost?.mainImage}
        alt="imagem do post"
        className="rounded-[6px] inset-0 h-[200px] w-full object-cover"
      />
      <div className="absolute inset-0 w-full h-full bg-zinc-800/70 hover:opacity-0 duration-300 transition-all flex items-center justify-center">
        <span className="text-white">Post em destaque</span>
      </div>
    </Link>
  )
}

export default HighlightedPost
