import { useEffect, useState } from "react"
import HomeStatsCard from "./HomeStatsCard"
import {
  getAllPosts,
  getAllProducts,
  getAllProdutCategories,
  getAllUsers,
  getUserPosts,
} from "../../api"
import { useAuthContext } from "../../context/AuthContext"
import { ClipLoader } from "react-spinners"
import { IPostData } from "@/interfaces"

const HomeStatsContainer = () => {
  const { userId } = useAuthContext()

  const [posts, setPosts] = useState<IPostData[]>([])
  const [userPosts, setUserPosts] = useState<IPostData[]>([])
  const [productCategories, setProductCategories] = useState(0)
  const [products, setProducts] = useState(0)
  const [users, setUsers] = useState(0)

  const [isLoading, setIsLoading] = useState(true)

  const postsViews = posts.reduce((total, acc) => acc.views + total, 0)
  const userPostsViews = userPosts.reduce((total, acc) => acc.views + total, 0)

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        getAllPosts(),
        getAllProducts(),
        getUserPosts(userId!!),
        getAllUsers(),
        getAllProdutCategories(),
      ])
        .then((responses) => {
          const [posts, products, userPosts, users, productCategories] =
            responses
          setPosts(posts)
          setProducts(products.length)
          setUserPosts(userPosts)
          setUsers(users.length)
          setProductCategories(productCategories.length)

          setIsLoading(false)
        })
        .catch((err) => {
          const [err1, err2] = err
          console.log({
            postsErr: err1,
            categoriesErr: err2,
          })
        })
    }
    fetchData()
  }, [])
  return (
    <div>
      {isLoading ? (
        <div className="w-full flex items-center justify-center h-full">
          <ClipLoader color="#111111" size={28} />
        </div>
      ) : (
        <div className="flex w-full gap-2">
          <HomeStatsCard
            amount={users}
            label="usuários"
            classname="border border-zinc-300 w-full text-zinc-900"
          />
          <HomeStatsCard
            amount={products}
            label="produtos na loja"
            text1="Categorias"
            text2={productCategories.toString()}
            iconText="category"
            classname="border border-zinc-300 w-full text-zinc-900"
          />
          <HomeStatsCard
            amount={userPosts.length}
            label="os meus posts"
            text1="views"
            text2={userPostsViews.toString()}
            iconText="views"
            classname="border border-zinc-300 w-full text-zinc-900"
          />

          <HomeStatsCard
            amount={posts.length}
            text1="views"
            text2={postsViews.toString()}
            label="total de posts"
            iconText="views"
            classname="border-zinc-300 w-full border text-BLACK "
          />
        </div>
      )}
    </div>
  )
}

export default HomeStatsContainer
