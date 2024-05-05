import StretchedPostCard from "./StretchedPostCard"
import { ClipLoader } from "react-spinners"
import { useGetAllPosts } from "@/lib/react-query/queries-and-mutations"

const AllPostsWrapper = () => {
  const { data, isLoading } = useGetAllPosts()

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <ClipLoader color="#111111" size={28} />
      </div>
    )
  }
  return (
    <div className="w-full overflow-y-auto bg-background pr-2 scroll-bar absolute h-[300px]">
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

export default AllPostsWrapper
