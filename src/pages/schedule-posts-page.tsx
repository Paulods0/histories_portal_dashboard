import LoaderSpinner from "@/components/global/loader-spinner"
import AddSchedulePost from "@/components/schedule-post-components/add-schedule-post"
import SchedulePostCard from "@/components/schedule-post-components/schedule-post-card"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/auth-context"
import { useGetSchedulePosts } from "@/lib/react-query/queries"
import { FaPlusCircle } from "react-icons/fa"

const SchedulePostsPage = () => {
  const { user } = useAuthContext()
  const { data, isLoading } = useGetSchedulePosts()

  if (isLoading) {
    return <LoaderSpinner />
  }

  return (
    <main className="w-full h-full flex flex-col">
      <div className="flex mb-4 w-full items-end justify-end">
        {user?.role !== "store-manager" && <AddSchedulePost />}
      </div>
      <>
        {data?.length === 0 ? (
          <div className="w-full justify-center items-center flex">
            <h1>Não há nenhum post ainda.</h1>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4">
            {data?.map((post) => (
              <SchedulePostCard key={post._id} post={post!!} />
            ))}
          </section>
        )}
      </>
    </main>
  )
}

export default SchedulePostsPage
