import { useEffect, useState } from "react"
import { ICategoryData, IPostData } from "../interfaces"
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
import { useLocation, useNavigate } from "react-router-dom"

const Posts = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const path = new URLSearchParams(location.search).get("cat")

  const [posts, setPosts] = useState<IPostData[]>([])
  const [categories, setCategories] = useState<ICategoryData[]>([])
  const [category, setCategory] = useState("all")

  const [isLoading, setIsLoading] = useState(true)

  const handleFilterPosts = () => {
    if (category === "all") {
      navigate("/posts")
      return
    }
    navigate(`?cat=${category}`)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      let data
      try {
        if (path) {
          data = await getAllPostsByCategory(category)
          setPosts(data)
        } else {
          data = await getAllPosts()
          setPosts(data)
        }
      } catch (error) {
        console.error(error)
      }
      setIsLoading(false)
    }
    fetchPosts()
  }, [location.search])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories()
        setCategories(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchCategories()
  }, [])

  if (isLoading) {
    return (
      <main className="relative w-full h-[80vh] flex items-center justify-center">
        <ClipLoader color="#111111" size={40} />
      </main>
    )
  }

  return (
    <main className="w-full h-full px-1 rounded-[10px] ">
      <div className="w-full flex border-b items-center justify-between mb-3 p-3">
        <Input
          type="search"
          className="w-[250px]"
          placeholder="Pesquisar post"
        />
        <div className="w-[200px] flex items-center gap-x-2">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="focus:ring-0  focus:ring-offset-0">
              <SelectValue placeholder="Selecionar categoria" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleFilterPosts} variant={"default"}>
            Filtrar
          </Button>
        </div>
      </div>

      <div className="w-full relative gap-4 grid grid-cols-4 scroll-bar overflow-y-auto h-[calc(90vh-80px)]">
        {posts.length === 0 ? (
          <main className="w-full h-full flex items-center col-span-4 justify-center">
            <h1>Não há posts nada ainda.</h1>
          </main>
        ) : (
          posts.map((post) => (
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
