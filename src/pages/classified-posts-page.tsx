import { useSearchParams } from "react-router-dom"
import Pagination from "@/components/global/pagination"
import LoaderSpinner from "@/components/global/loader-spinner"
import { useGetClassifiedPosts } from "@/lib/react-query/queries/post-queries"
import ClassifiedCard from "@/components/classified-post-components/classified-card"
import ClassifiedFilter from "@/components/classified-post-components/classified-filter"
import { useMemo } from "react"

const ClassifiedPostsPage = () => {
  const [filter, setFilter] = useSearchParams({ page: "1", category: "" })
  const currentPage = Number(filter.get("page")) || 1
  const category = filter.get("category") || ""

  const { data, isLoading } = useGetClassifiedPosts(currentPage)

  if (isLoading) {
    return <LoaderSpinner size={24} />
  }

  const filteredPosts = useMemo(
    () =>
      category === "" || category === "all"
        ? data?.posts
        : data?.posts.filter(
            (posts) => posts.type === category || posts.status === category
          ),
    [category]
  )

  console.log(filteredPosts)

  function handlePaginate(newPage: number) {
    setFilter((prev) => {
      prev.set("page", String(newPage))
      return prev
    })
  }

  return (
    <main className="w-full flex-col flex items-center gap-4">
      <div className="w-full flex items-center justify-between border-b pb-2">
        <ClassifiedFilter setFilter={setFilter} />
      </div>
      {filteredPosts?.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <h1>Não há posts ainda.</h1>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-4 lg:gap-6">
          {filteredPosts?.map((post) => (
            <ClassifiedCard key={post._id} post={post} />
          ))}
        </section>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={data!!.pages}
        onPageChange={handlePaginate}
      />
    </main>
  )
}

export default ClassifiedPostsPage
