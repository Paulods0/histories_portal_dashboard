import AuthorNotes from "@/components/post-details-components/author-notes"
import { formatDate } from "@/utils/helpers"
import { useGetSinglePost } from "@/lib/react-query/queries"
import { Link, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { SlLike, SlDislike } from "react-icons/sl"
import { FaEye } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"

const PostDetailsPage = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetSinglePost(id!!)
  const { userId } = useAuth()

  if (isLoading) {
    return (
      <section className="w-full h-40 flex items-center justify-center">
        <ClipLoader size={40} color="#FFF" />
      </section>
    )
  }

  return (
    <main className="w-full flex items-center overflow-y-clip scroll-bar px-8">
      <div className="w-full mt-3 flex items-center flex-col relative">
        <h1 className="font-bold text-4xl mb-6 text-center text-foreground">
          {data?.title}
        </h1>
        <div className="flex text-zinc-400 items-center gap-x-1 mb-3">
          <div className="flex gap-x-1 items-center ">
            <h4>{data?.author.firstname}</h4>
            <h4>{data?.author.lastname}</h4>
          </div>
          <span>/</span>
          <h4>{formatDate(data!!.createdAt)}</h4>
        </div>
        <img
          src={data?.mainImage}
          className="lg:w-[700px] w-full lg:h-[400px] object-contain lg:object-cover"
          alt="imagem principal"
        />
        <div className="w-full lg:w-[950px] pb-3 mt-3 mx-auto">
          <div
            className="text-base mt-4 text-white"
            dangerouslySetInnerHTML={{ __html: data?.content ?? "" }}
          />
          <hr className="w-full bg-zinc-400 my-8" />

          <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-0 my-8 lg:items-center lg:justify-between">
            <div className="flex items-center">
              <h3 className="font-bold capitalize text-[18px] mr-3">tags:</h3>
              {data!!.tag!!.map((eachTag, index) => (
                <span
                  className="text-zinc-400 text-sm italic"
                  key={index}
                >{`#${eachTag} `}</span>
              ))}
            </div>

            <div className="flex text-foreground items-center gap-x-3">
              <div className="flex items-center mr-6 gap-x-2">
                <FaEye size={20} />
                <span>{`${data!!.views} views`}</span>
              </div>

              <div className="flex text-red-400 items-center gap-x-1">
                <SlDislike size={20} />
                <span className="">{data!!.rating}</span>
              </div>

              <div className="flex text-green-400 items-center gap-x-1">
                <SlLike size={20} />
                <span className="">{data!!.rating}</span>
              </div>
            </div>
          </div>

          <AuthorNotes author={data?.author} notes={data?.author_notes} />
        </div>
      </div>
    </main>
  )
}

export default PostDetailsPage
