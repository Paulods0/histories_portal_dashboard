import { FaPlusCircle } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { CATEGORIES_SLUG } from "@/utils/constants"
import Pagination from "@/components/global/pagination"
import { useAuthContext } from "@/context/auth-context"
import { Link, useSearchParams } from "react-router-dom"
import LoaderSpinner from "@/components/global/loader-spinner"
import AdminPostCard from "../components/post-components/post-card"
import { useGetAllPosts } from "@/lib/react-query/queries/post-queries"
import FilterPostCategory from "@/components/post-components/filter-post-category"

const PostsPage = () => {
  const { user } = useAuthContext()
  const [filter, setFilter] = useSearchParams({
    page: "1",
    category: "",
  })

  const page = filter.get("page")!!
  const category = filter.get("category")!!

  const { data: posts, isLoading } = useGetAllPosts(parseInt(page), category)

  const handleChangePage = (newPage: number) => {
    setFilter((prev) => {
      prev.set("page", newPage.toString())
      return prev
    })
  }

  const handleFilter = (value: string) => {
    setFilter((prev) => {
      prev.set("category", value)
      return prev
    })
  }

  const filteredCategories = CATEGORIES_SLUG.filter(
    (cat) => cat.label !== "agenda ao" && cat.label !== "classificados"
  )

  if (isLoading) {
    return (
      <main className="relative w-full h-[80vh] flex items-center justify-center">
        <LoaderSpinner />
      </main>
    )
  }

  const isUserAuthorized = user!!.role !== "store-manager"

  return (
    <main className="w-full flex-col  justify-between px-1 flex">
      <div className="gap-x-2 flex w-full justify-between items-center">
        <div className="flex lg:flex-row flex-col items-center gap-6">
          <FilterPostCategory
            category={category}
            onChange={handleFilter}
            filteredCategories={filteredCategories}
          />

          <div className="gap-4 flex lg:flex-row flex-col">
            <Button variant={"secondary"} asChild>
              <Link to="/posts/agenda-ao">Ver Agenda AO</Link>
            </Button>

            <Button variant={"secondary"} asChild>
              <Link to="/posts/classificados">Ver Classificados</Link>
            </Button>
          </div>
        </div>

        {isUserAuthorized && (
          <Button variant={"default"} asChild>
            <Link to={"/novopost"} className="flex items-center gap-2 ">
              <FaPlusCircle size={12} /> Novo
            </Link>
          </Button>
        )}
      </div>

      <hr className="w-full my-3" />

      <div className="w-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-4 overflow-y-auto h-full lg:h-[67vh]">
        {posts?.posts.length === 0 ? (
          <main className="w-full h-full flex items-center col-span-4 justify-center">
            <h1>Não há posts nada ainda.</h1>
          </main>
        ) : (
          posts?.posts.map((post) => (
            <AdminPostCard key={post._id} post={post} />
          ))
        )}
      </div>

      <hr className="w-[70vw] mx-auto h-[1px] bg-zinc-300" />

      <Pagination
        currentPage={1}
        onPageChange={handleChangePage}
        totalPages={posts!!.pages}
      />
    </main>
  )
}

export default PostsPage
