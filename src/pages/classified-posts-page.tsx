import ClassifiedCard from "@/components/classified-post-components/classified-card"
import ClassifiedFilter from "@/components/classified-post-components/classified-filter"
import LoaderSpinner from "@/components/global/loader-spinner"
import { useGetClassifiedPosts } from "@/lib/react-query/queries"
import { useSearchParams } from "react-router-dom"

const ClassifiedPostsPage = () => {
  const { data, isLoading } = useGetClassifiedPosts()

  const [filter, setFilter] = useSearchParams({ filter: "" })
  const currFilter = filter.get("filter") ?? ""

  if (isLoading) {
    return <LoaderSpinner color="#FFF" size={24} />
  }

  const filterPost =
    currFilter === "" || currFilter === "all"
      ? data
      : data?.filter(
          (post) => post.type === currFilter || post.status === currFilter
        )

  return (
    <main className="w-full flex-col flex items-center gap-4 justify-center">
      <div className="w-full flex items-center justify-between border-b pb-2">
        <ClassifiedFilter setFilter={setFilter} />
      </div>
      {data?.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <h1>Não há posts ainda.</h1>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-4 lg:gap-6">
          {filterPost?.map((post) => (
            <ClassifiedCard key={post._id} post={post} />
          ))}
        </section>
      )}
    </main>
  )
}

export default ClassifiedPostsPage
