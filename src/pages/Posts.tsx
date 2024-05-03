import { useEffect, useState } from "react"
import { CategoryData, PostData } from "../types"
import { getAllCategories, getAllPosts, getAllPostsByCategory } from "../api"
import AdminPostCard from "../components/AdminPostCard"
import { ClipLoader } from "react-spinners"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  useGetAllPosts,
  useGetCategories,
  // useGetPostsByCategory,
} from "@/utils/react-query/queries-and-mutations"
import { useQuery } from "@tanstack/react-query"
import { FaPlusCircle } from "react-icons/fa"

const Posts = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const path = new URLSearchParams(location.search).get("id")

  const { data: posts, isLoading } = useGetAllPosts()
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategories()

  const [category, setCategory] = useState("all")

  useEffect(() => {
    if (path) {
      setCategory(path)
    } else {
      setCategory("all")
    }
  }, [location.search, path])

  // const handleFilterPosts = () => {
  //   if (category === "all") {
  //     navigate("/posts")
  //   } else {
  //     navigate(`?id=${category}`)
  //   }
  // }

  const { data: filteredPosts } = useQuery<PostData[]>({
    queryKey: ["postsByCategory", category],
    queryFn: () => getAllPostsByCategory(category),
    enabled: category !== "all",
  })

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
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-48 focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Selecionar categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="cursor-pointer" value="all">
              Todos
            </SelectItem>
            {categories?.map((category) => (
              <SelectItem
                className="cursor-pointer"
                key={category._id}
                value={category._id}
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Link to={"/novopost"}>
          <Button variant={"default"} className="gap-x-2 flex">
            <FaPlusCircle size={12} /> Novo
          </Button>
        </Link>
      </div>

      <hr className="w-full my-3" />

      <div className="w-full relative gap-4 grid grid-cols-4 scroll-bar overflow-y-auto h-[calc(90vh-80px)]">
        {posts?.length === 0 ? (
          <main className="w-full h-full flex items-center col-span-4 justify-center">
            <h1>Não há posts nada ainda.</h1>
          </main>
        ) : category !== "all" ? (
          filteredPosts?.map((filterdPost: PostData) => (
            <div key={filterdPost._id}>
              <AdminPostCard post={filterdPost} />
            </div>
          ))
        ) : (
          posts?.map((post) => (
            <div key={post._id}>
              <AdminPostCard post={post} />
            </div>
          ))
        )}
      </div>
    </main>
  )
}

export default Posts
