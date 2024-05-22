import StretchedPostCard from "./home-post-card"
import { ClipLoader } from "react-spinners"
import { useGetAllPosts } from "@/lib/react-query/queries"

const AllPostsWrapper = () => {
  const { data, isLoading } = useGetAllPosts(1, "", 0)

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <ClipLoader color="#111111" size={28} />
      </div>
    )
  }

  return (
    <div className="overflow-y-auto bg-background pr-2 scroll-bar h-[45vh] pb-4 w-auto">
      {data?.posts.length === 0 || data?.posts.length === undefined ? (
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-black">Não há posts ainda</h1>
        </div>
      ) : (
        data.posts &&
        data.posts.map((post) => (
          <div key={post._id}>
            <StretchedPostCard post={post} />
          </div>
        ))
      )}
    </div>
  )
}

export default AllPostsWrapper
