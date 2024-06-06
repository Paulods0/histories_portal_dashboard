import AdminPostCard from "../components/post-components/post-card"
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Link, useSearchParams } from "react-router-dom"
import { useGetAllPosts } from "@/lib/react-query/queries"

import { FaPlusCircle } from "react-icons/fa"
import { useAuthContext } from "@/context/auth-context"
import { CATEGORIES_SLUG } from "@/utils/constants"
import Pagination from "@/components/global/pagination"
import LoaderSpinner from "@/components/global/loader-spinner"

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

  return (
    <main className="w-full flex-col  justify-between px-1 flex">
      <div className="gap-x-2 flex w-full justify-between items-center">
        <div className="flex lg:flex-row flex-col items-center gap-6">
          <Select defaultValue={category} onValueChange={handleFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={category ? category : "Todos"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="##">Todos</SelectItem>
              {filteredCategories?.map((category, index) => (
                <SelectItem key={index} value={category.slug}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="gap-4 flex lg:flex-row flex-col">
            <Button variant={"secondary"} asChild>
              <Link to="/posts/agenda-ao">Ver Agenda AO</Link>
            </Button>

            <Button variant={"secondary"} asChild>
              <Link to="/posts/classificados">Ver Classificados</Link>
            </Button>
          </div>
        </div>

        {user!!.role !== "store-manager" && (
          <Link to={"/novopost"}>
            <Button variant={"default"} className="gap-x-2 flex">
              <FaPlusCircle size={12} /> Novo
            </Button>
          </Link>
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
      <div className="mx-auto">
        <Pagination
          currentPage={1}
          onPageChange={handleChangePage}
          totalPages={posts!!.pages}
        />
      </div>
    </main>
  )
}

export default PostsPage
