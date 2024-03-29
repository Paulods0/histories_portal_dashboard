import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { ICategoryData, IPostData, IProductData } from "../types"
import { getAllCategories, getAllPosts, getAllProducts } from "../api/apiCalls"
import { BeatLoader, ClipLoader } from "react-spinners"
import HomeStatsContainer from "../components/Home_Components/HomeStatsContainer"
import PostsContainer from "../components/Home_Components/PostsContainer"
import HighlightedPost from "../components/Home_Components/HighlightedPost"
import { useAuthContext } from "../context/AuthContext"
import StoreTableData from "../components/Home_Components/StoreTableData"

const HomeDashboard = () => {
  // const [categories, setCategories] = useState<ICategoryData[]>([])
  // const [products, setProducts] = useState<IProductData[]>([])
  // const [posts, setPosts] = useState<IPostData[]>([])
  // const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuthContext()
  // console.log(user)

  // useEffect(() => {
  //   const fetchCategoriesData = async () => {
  //     const categories = await getAllCategories()
  //     setCategories(categories)
  //   }
  //   fetchCategoriesData()
  // }, [])

  // useEffect(() => {
  //   const fetchProductsData = async () => {
  //     const products = await getAllProducts()
  //     setProducts(products)
  //   }
  //   fetchProductsData()
  // }, [])

  // useEffect(() => {
  //   const fetchPostsData = async () => {
  //     const posts = await getAllPosts()
  //     setPosts(posts)
  //     setIsLoading(false)
  //   }
  //   fetchPostsData()
  // }, [])

  // if (isLoading) {
  //   return (
  //     <main className="relative w-full h-[80vh] flex items-center justify-center">
  //       <ClipLoader color="#111111" size={40} />
  //     </main>
  //   )
  // }

  // if (posts.length === 0) {
  //   return (
  //     <div className="w-full h-full flex items-center justify-center">
  //       <h1>Não há nenhum post ainda</h1>
  //     </div>
  //   )
  // }

  return (
    <main className="w-full px-5 pb-4 rounded-lg h-full flex flex-col gap-6">
      {/**HEADER */}
      <header className="w-full px-2 mt-2 flex  justify-between items-center">
        <h1 className="text-[22px] font-semibold">
          Seja bem-vindo,{user?.firstname}
        </h1>
        <span className="text-[14px] font-semibold">19 Março de 2024</span>
        <div className="flex items-center gap-2">
          <div className="flex flex-col justify-center items-end">
            <div className="flex gap-[2px]">
              <span className="text-[14px] font-bold text-BLACK">
                {user?.firstname}
              </span>
              <span className="text-[14px] font-bold text-BLACK">
                {user?.lastname}
              </span>
            </div>
            <span className="text-[12px] font-semibold text-GRAY-DARKER">
              {user?.email}
            </span>
          </div>
          <div className="relative w-9 h-9 rounded-full border">
            {user?.image && (
              <img
                src={user.image}
                className="absolute w-full h-full rounded-full object-cover"
                alt="Profile image"
              />
            )}
          </div>
        </div>
      </header>
      {/** END HEADER */}

      <div className="gap-4 grid-cols-3 grid place-items-center w-full h-full">
        {/** LEFT SIDE */}
        <section className="p-3 border gap-4 bg-white border-GRAY-LIGHTER rounded-[10px] w-full h-full flex flex-col col-span-2 ">
          {/** UPPER SIDE */}
          <div>
            <HomeStatsContainer />
          </div>
          {/** END UPPER SIDE */}
          {/** BOTTOM SIDE */}
          <div className="h-full mt-2 w-full flex flex-col gap-2">
            <h1 className="text-BLACK font-bold text-[22px]">Posts</h1>
            <PostsContainer />
          </div>
          {/** END BOTTOM SIDE */}
        </section>
        {/** END LEFT SIDE */}

        {/** RIGHT SIDE */}
        <section className="w-full h-full flex flex-col">
          <div className="flex w-full items-center justify-between  p-2">
            <h1 className="font-medium">Post em destaque</h1>
            <span className="text-[12px] font-normal">Editar</span>
          </div>
          <HighlightedPost />
          <section className="w-full mt-6 flex flex-col gap-4">
            <div className="flex w-full items-center justify-between">
              <h1 className="font-semibold text-BLACK text-[18px]">
                Produtos na loja
              </h1>
              <Link to="loja" className="text-[14px] underline text-BLACK">
                Ir à loja
              </Link>
            </div>
            <StoreTableData />
          </section>
        </section>
        {/** END RIGHT SIDE */}
      </div>
    </main>
  )
}

export default HomeDashboard
