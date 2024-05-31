import StretchedPostCard from "./home-post-card"
import { useGetAllPosts } from "@/lib/react-query/queries"
import LoaderSpinner from "../global/loader-spinner"

const AllPostsWrapper = () => {
  const { data, isLoading } = useGetAllPosts(1, "")

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoaderSpinner />
      </div>
    )
  }

  return (
    <div className="overflow-y-auto bg-background pr-2 scroll-bar h-[45vh] pb-4 w-auto">
      {data?.posts.length === 0 || data?.posts.length === undefined ? (
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-foreground">Não há posts ainda</h1>
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
