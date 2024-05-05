import AuthorNotes from "@/components/post-details-components/AuthorNotes"
import { formatDate } from "@/utils/helpers"
import { useGetSinglePost } from "@/lib/react-query/queries-and-mutations"
import { Link, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { SlLike, SlDislike } from "react-icons/sl"
import { AiFillLike } from "react-icons/ai"
import { FaEye, FaUser } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"

const PostDetailsPage = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetSinglePost(id!!)
  const { userId } = useAuth()
  console.log(data)

  if (isLoading) {
    return (
      <section className="w-full h-40 flex items-center justify-center">
        <ClipLoader size={40} color="#FFF" />
      </section>
    )
  }

  return (
    <main className="w-full flex items-center overflow-y-clip scroll-bar px-8 h-full">
      <div className="w-full mt-3 flex items-center flex-col relative">
        {userId === data?.author._id && (
          <Link to={`/edit-post/${data!!._id}`}>
            <Button variant={"outline"} className="absolute right-2 top-12">
              Editar
            </Button>
          </Link>
        )}
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
          className="lg:w-[700px] lg:h-[400px] object-cover"
          alt=""
        />
        <div className="w-[950px] pb-3 mt-3 mx-auto">
          <p
            className="text-base mt-4 text-zinc-400"
            dangerouslySetInnerHTML={{ __html: data!!.content }}
          />
          <hr className="w-full bg-zinc-400 my-8" />

          <div className="w-full flex my-8 items-center justify-between">
            <div className="flex items-center">
              <h3 className="font-bold capitalize text-[18px] mr-3">tags:</h3>
              {data!!.tag.map((tag, index) => (
                <span
                  className="text-zinc-400 text-sm italic"
                  key={index}
                >{`#${tag} `}</span>
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

          <AuthorNotes author={data!!.author} notes={data!!.author_notes} />
        </div>
      </div>
    </main>
  )
}

export default PostDetailsPage
