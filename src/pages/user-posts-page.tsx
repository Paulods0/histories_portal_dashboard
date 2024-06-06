import { useAuthContext } from "@/context/auth-context"
import LoaderSpinner from "@/components/global/loader-spinner"
import { useGetUserPosts } from "@/lib/react-query/queries/user-queries"
import UserPostsCarousel from "@/components/user-components/user-posts-carousel"

const UserPostsPage = () => {
  const { userId } = useAuthContext()

  const { data: posts, isLoading } = useGetUserPosts(userId!!)

  if (isLoading) {
    return (
      <main className="w-full h-[50vh] flex items-center justify-center">
        <LoaderSpinner />
      </main>
    )
  }

  return (
    <section className=" mt-4 w-full h-full flex items-center justify-center">
      {posts!!.length > 0 ? (
        <UserPostsCarousel posts={posts} />
      ) : (
        <div className="w-full h-[50vh] flex items-center justify-center">
          <h1 className="text-[20px]">Não há nenhum post.</h1>
        </div>
      )}
    </section>
  )
}

export default UserPostsPage