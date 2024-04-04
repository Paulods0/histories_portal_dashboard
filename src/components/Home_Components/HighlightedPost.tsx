import { useEffect, useState } from "react"
import { IPostData } from "../../interfaces"
import { getHighlightedPost } from "../../api"
import { Link } from "react-router-dom"

const HighlightedPost = () => {
  const [highlightedPost, setHighlightedPost] = useState<IPostData>()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHighlightedPost()
      setHighlightedPost(data)
    }
    fetchData()
  }, [])
  return (
    <Link to={`/post/${highlightedPost?._id}`}>
      <div className="p-2 h-full cursor-pointer bg-white hover:bg-GRAY-LIGHTER duration-200 ease-linear transition-all border border-GRAY-LIGHTER rounded-[6px] gap-2 grid grid-cols-3">
        <div className="relative w-full h-full">
          <img
            src={highlightedPost?.mainImage}
            alt="imagem do post"
            className="absolute rounded-[5px] inset-0 h-full w-full object-contain"
          />
        </div>

        <div className="w-full col-span-2">
          <h1 className="text-[14px] text-BLACK font-semibold line-clamp-2">
            {highlightedPost?.title}
          </h1>

          <div
            className="text-[12px] text-GRAY-DARKER line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: highlightedPost?.content ? highlightedPost?.content : "",
            }}
          />
        </div>
      </div>
    </Link>
  )
}

export default HighlightedPost
