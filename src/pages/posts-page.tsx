import AdminPostCard from "../components/post-components/post-card"
import { ClipLoader } from "react-spinners"
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Link, useSearchParams } from "react-router-dom"
import { useGetAllPosts, useGetCategories } from "@/lib/react-query/queries"

import { FaPlusCircle } from "react-icons/fa"
import { useAuthContext } from "@/context/auth-context"

const PostsPage = () => {
  const { user } = useAuthContext()

  const { data: posts, isLoading } = useGetAllPosts()
  const { data: categories } = useGetCategories()

  const [searchParams, setSearchParams] = useSearchParams({ category: "" })

  const handleFilter = (value: string) => {
    setSearchParams((prev) => {
      prev.set("category", value)
      return prev
    })
  }

  const category = searchParams.get("category")
  const filterdPosts =
    category === "all" || category === ""
      ? posts
      : posts?.filter((post) => post.category_slug === category)

  const filteredCategories = categories?.filter(
    (cat) =>
      cat.name !== "Agenda AO" &&
      cat.name !== "Classificados" &&
      cat.name !== "Overland Experience"
  )

  if (isLoading) {
    return (
      <main className="relative w-full h-[80vh] flex items-center justify-center">
        <ClipLoader color="#111111" size={40} />
      </main>
    )
  }

  return (
    <main className="w-full h-full flex-col px-1 flex">
      <div className="gap-x-2 flex w-full justify-between items-center">
        <div className="flex items-center gap-6 w-fit">
          <Select defaultValue="all" onValueChange={handleFilter}>
            <SelectTrigger className="w-fit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {filteredCategories?.map((category) => (
                <SelectItem
                  key={category._id}
                  value={category.name.toLowerCase()}
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant={"ghost"} asChild>
            <Link to="/posts/agenda-ao">Ver Agenda AO</Link>
          </Button>

          <Button variant={"ghost"} asChild>
            <Link to="/posts/classificados">Ver Classificados</Link>
          </Button>
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

      <div className="w-full relative gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 scroll-bar overflow-y-auto h-[calc(90vh-80px)]">
        {filterdPosts?.length === 0 ? (
          <main className="w-full h-full flex items-center col-span-4 justify-center">
            <h1>Não há posts nada ainda.</h1>
          </main>
        ) : (
          filterdPosts?.map((post) => (
            <div key={post._id}>
              <AdminPostCard post={post} />
            </div>
          ))
        )}
      </div>
    </main>
  )
}

export default PostsPage
