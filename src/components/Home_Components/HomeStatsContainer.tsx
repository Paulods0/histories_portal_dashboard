import { useEffect, useState } from "react"
import HomeStatsCard from "./HomeStatsCard"
import {
  getAllPosts,
  getAllProducts,
  getAllUsers,
  getUserPosts,
} from "../../api/apiCalls"
import { useAuthContext } from "../../context/AuthContext"
import { ClipLoader } from "react-spinners"

const HomeStatsContainer = () => {
  const { user } = useAuthContext()

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
        getUserPosts(user!!.id),
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
            color="bg-YELLOW"
            label="usuários"
            text_color="BLACK"
            icon="users"
          />
          <HomeStatsCard
            amount={products}
            color="bg-BLUE"
            label="loja"
            text_color="BLACK"
            icon="store"
          />
          <HomeStatsCard
            amount={userPosts}
            color="bg-GRAY-LIGHTER"
            label="meus posts"
            text_color="BLACK"
            icon="my_posts"
          />
          <HomeStatsCard
            amount={posts}
            color="bg-BLACK"
            col_span
            label="total de posts"
            text_color="white"
            icon="total_posts"
          />
        </div>
      )}
    </div>
  )
}

export default HomeStatsContainer
