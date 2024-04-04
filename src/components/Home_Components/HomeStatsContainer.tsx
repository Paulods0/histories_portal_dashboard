import { useEffect, useState } from "react"
import HomeStatsCard from "./HomeStatsCard"
import {
  getAllPosts,
  getAllProducts,
  getAllUsers,
  getUserPosts,
} from "../../api"
import { useAuthContext } from "../../context/AuthContext"
import { ClipLoader } from "react-spinners"

const HomeStatsContainer = () => {
  const { user, userId } = useAuthContext()

  const [posts, setPosts] = useState(0)
  const [products, setProducts] = useState(0)
  const [userPosts, setUserPosts] = useState(0)
  const [users, setUsers] = useState(0)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        getAllPosts(),
        getAllProducts(),
        getUserPosts(userId!!),
        getAllUsers(),
      ])
        .then((responses) => {
          const [posts, products, userPosts, users] = responses
          setPosts(posts.length)
          setProducts(products.length)
          setUserPosts(userPosts.length)
          setUsers(users.length)

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
        <div className="grid grid-cols-5 gap-2">
          <HomeStatsCard
            amount={users}
            label="usuários"
            icon="users"
            classname="border border-zinc-300 text-zinc-900"
          />
          <HomeStatsCard
            amount={products}
            label="loja"
            icon="store"
            classname="border border-zinc-300 text-zinc-900"
          />
          <HomeStatsCard
            amount={userPosts}
            label="meus posts"
            icon="my_posts"
            classname="border border-zinc-300 text-zinc-900"
          />

          <HomeStatsCard
            amount={posts}
            label="total de posts"
            icon="total_posts"
            classname="bg-black text-white col-span-2"
          />
        </div>
      )}
    </div>
  )
}

export default HomeStatsContainer
