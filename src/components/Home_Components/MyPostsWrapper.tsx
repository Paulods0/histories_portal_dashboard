import StretchedPostCard from "./StretchedPostCard"
import { useAuthContext } from "../../context/AuthContext"
import { ClipLoader } from "react-spinners"
import { useGetUserPosts } from "@/utils/react-query/queries-and-mutations"

const MyPostsWrapper = () => {
  const { userId } = useAuthContext()
  const { data, isLoading } = useGetUserPosts(userId!!)

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <ClipLoader color="#111111" size={28} />
      </div>
    )
  }

  return (
    <div className="w-full overflow-y-auto scroll-bar pr-2 absolute h-[92%]">
      {data?.length === 0 || data?.length === undefined ? (
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-black">Não há posts ainda</h1>
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
