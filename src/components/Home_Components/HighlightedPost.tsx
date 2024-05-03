import { Link } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { useGetHighlightedPost } from "@/utils/react-query/queries-and-mutations"
import { FaEye } from "react-icons/fa"
import { SlLike } from "react-icons/sl"

SlLike

const HighlightedPost = () => {
  const { data, isLoading } = useGetHighlightedPost()
  console.log(data)

  if (isLoading) {
    return (
      <main className="w-full h-full flex items-center justify-center">
        <ClipLoader size={40} color="#111111" />
      </main>
    )
  }

  return (
    <Link
      to={`/post/${data?._id}`}
      className="relative outline-none w-full rounded-[6px] border-none"
    >
      <img
        src={data?.mainImage}
        alt="imagem do post"
        className="rounded-[6px] inset-0 h-[240px] w-full object-cover"
      />
      <div className="absolute inset-0 rounded-[6px] flex-col w-full h-full bg-zinc-800/70 hover:opacity-0 duration-300 transition-all flex items-center justify-center">
        <span className="text-white">Post em destaque</span>
        <div className="flex items-center mt-4 gap-x-4">
          <span className="text-white flex items-center gap-x-1">
            <FaEye size={18} />
            {data?.views}
          </span>
          <span className="text-white flex items-center gap-x-1">
            <SlLike size={18} />
            {data?.rating}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default HighlightedPost
