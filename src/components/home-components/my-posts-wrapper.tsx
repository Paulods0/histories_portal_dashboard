import StretchedPostCard from "./home-post-card"
import LoaderSpinner from "../global/loader-spinner"
import { useAuthContext } from "../../context/auth-context"
import { useGetUserPosts } from "@/lib/react-query/queries/user-queries"

const MyPostsWrapper = () => {
  const { userId } = useAuthContext()
  const { data, isLoading } = useGetUserPosts(userId!!)

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoaderSpinner />
      </div>
    )
  }

  return (
    <div className="overflow-y-auto bg-background scroll-bar pr-2 h-[45vh] pb-4 w-auto">
      {data?.length === 0 || data?.length === undefined ? (
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-foreground text-xl">Não há posts ainda</h1>
        </div>
      ) : (
        data &&
        data.map((post) => (
          <div key={post._id}>
            <StretchedPostCard post={post} />
          </div>
        ))
      )}
    </div>
  )
}

export default MyPostsWrapper
