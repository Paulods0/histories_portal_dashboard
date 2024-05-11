import { Link } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { useGetHighlightedPost } from "@/lib/react-query/queries"
import { FaEye } from "react-icons/fa"
import { SlLike } from "react-icons/sl"
import { Button } from "../ui/button"

const HighlightedPost = () => {
  const { data, isLoading } = useGetHighlightedPost()

  if (isLoading) {
    return (
      <main className="w-full h-full flex items-center justify-center">
        <ClipLoader size={40} color="#111111" />
      </main>
    )
  }
  if (!data) {
    return (
      <main className="w-full gap-4 h-full flex flex-col items-center justify-center border rounded-lg">
        <h1>Não há nenhum post em destaque.</h1>
        <Link to="/posts">
          <Button variant={"ghost"}>Adicionar</Button>
        </Link>
      </main>
    )
  }

  return (
    <Link
      to={`/post/${data?._id}`}
      className="relative h-fit outline-none w-full rounded-lg border-none"
    >
      <img
        src={data?.mainImage}
        alt="imagem do post"
        className="rounded-[6px] inset-0 h-[240px] w-full object-cover"
      />

      <div className="absolute gap-4 inset-0 flex flex-col items-center justify-center bg-black/50 opacity-1 hover:opacity-0 duration-200 transition-all ease-in-out">
        <span className="text-white">Post em destaque</span>
        <div className="flex items-center gap-4">
          <span className="text-white h-auto flex items-center gap-x-1">
            <FaEye size={18} />
            {data?.views}
          </span>
          <span className="text-white h-auto flex items-center gap-x-1">
            <SlLike size={18} />
            {data?.rating}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default HighlightedPost
