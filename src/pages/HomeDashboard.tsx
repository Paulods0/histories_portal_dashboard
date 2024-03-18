import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { ICategoryData, IPostData, IProductData } from "../types"
import { getAllCategories, getAllPosts, getAllProducts } from "../api/apiCalls"
import { BeatLoader } from "react-spinners"
import HomeStats from "../components/HomeStats"
import { GoPlus } from "react-icons/go"
import RecentPostCard from "../components/RecentPostCard"

const HomeDashboard = () => {
  const [categories, setCategories] = useState<ICategoryData[]>([])
  const [products, setProducts] = useState<IProductData[]>([])
  const [posts, setPosts] = useState<IPostData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategoriesData = async () => {
      const categories = await getAllCategories()
      setCategories(categories)
    }
    fetchCategoriesData()
  }, [])

  useEffect(() => {
    const fetchProductsData = async () => {
      const products = await getAllProducts()
      setProducts(products)
    }
    fetchProductsData()
  }, [])

  useEffect(() => {
    const fetchPostsData = async () => {
      const posts = await getAllPosts()
      setPosts(posts)
      setIsLoading(false)
    }
    fetchPostsData()
  }, [])

  if (isLoading) {
    return (
      <main className="relative w-full h-[80vh] flex items-center justify-center">
        <BeatLoader color="#382A3F" />
      </main>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1>Não há nenhum post ainda</h1>
      </div>
    )
  }

  return (
    <main className="w-full px-2 h-full gap-6 flex">
      {/**LEFT SIDE */}
      <div className="flex flex-col flex-1">
        <div className="flex flex-col">
          {/**DASHBOARD TITLE */}
          <h1 className="text-[25px] font-semibold uppercase">Dashboard</h1>
          {/**HOME STATS */}
          <div className="flex bg-white shadow-md rounded-lg p-4 items-center gap-10 mt-8">
            <HomeStats label="Usuários" icon="users" total={1} />
            <HomeStats
              label="Tópicos"
              icon="topics"
              total={categories.length}
            />
            <HomeStats label="Posts" icon="posts" total={posts.length} />
            <HomeStats
              label="Produtos"
              icon="products"
              total={products.length}
            />
          </div>
          <div className="w-full h-[400px] flex flex-col gap-3 mt-4">
            <div className="w-full flex justify-between items-center">
              <h1 className="font-bold text-lg text-[#1A101F]">
                Posts Recentes
              </h1>
              <Link to="/novopost" className="flex px-2 h-8 items-center">
                <GoPlus size={14} color="#1A101F" />
                <span className="text-[#1A101F] text-center">Adicionar</span>
              </Link>
            </div>
            <div className="w-full pr-2 scroll-bar overflow-y-auto">
              {/** RECENT POSTS CARD */}
              {posts.map((post) => (
                <RecentPostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/**RIGHT SIDE */}
      <div className="flex-[0.7] justify-around flex flex-col">
        {/**UPPER SIDE */}
        <div>
          {/** TITLE - HIGHLIGHTED */}
          <div className="flex w-full justify-between mb-4">
            <h1 className="font-bold text-[#1A101F]">Em Destaque</h1>
            <Link to="" className="font-medium text-sm text-[#1A101F] ">
              Editar
            </Link>
          </div>
          {/** HIGHLIGHTED POST CARD */}
          <div className="shadow-lg border border-gray-300 p-2 rounded-xl flex items-center justify-between">
            <div className="relative h-[60px] w-[80px] mr-4">
              <img
                src="6.jpg"
                alt="Imagem do post em destaque"
                className="absolute rounded-xl inset-0 w-full h-full object-cover "
              />
            </div>
            <h1 className="text-[#1A101F] font-semibold">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi,
              rem.
            </h1>
          </div>
        </div>
        {/**DOWN SIDE */}
        <div className="flex mt-2 flex-col justify-center gap-4 w-full">
          {/* <h1 className="text-2xl">Produtos</h1> */}
          <table className="flex flex-col  h-[200px] p-2 gap-4 bg-white shadow-md rounded-lg">
            <thead className="w-full flex text-center">
              <tr className="border-b flex items-center border-gray-300 w-full text-center justify-between">
                <th className=" w-full text-[#1A101F] font-bold">Imagem</th>
                <th className=" w-full text-[#1A101F] font-bold">Nome</th>
                <th className=" w-full text-[#1A101F] font-bold">Preço</th>
              </tr>
            </thead>
            <tbody className="scroll-bar flex flex-col  overflow-auto text-center items-center w-full">
              <tr className="w-full">
                {products.map((product) => (
                  <div
                    key={product.name}
                    className="w-full flex justify-between items-center"
                  >
                    <td className="w-full flex justify-center items-center">
                      <img
                        src={product.image}
                        alt=""
                        className="w-12 h-12 object-cover"
                      />
                    </td>
                    <td className="w-full">{product.name}</td>
                    <td className="w-full">${product.price}</td>
                  </div>
                ))}
              </tr>
            </tbody>
          </table>

          {/* <h1 className="text-2xl">Tópicos</h1> */}
          <div className="w-full flex flex-col">
            <div className="border-b flex items-center justify-between border-gray-300 text-left">
              <h1 className=" text-[#1A101F] font-bold">Nome</h1>
              <h1 className="text-[#1A101F] font-bold">Nª de Posts</h1>
              <h1 className="text-[#1A101F] font-medium text-sm">Ver todos</h1>
            </div>

            <div className="">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="w-full flex justify-between items-center"
                >
                  <h1 className="w-full">{category.name}</h1>
                  <h1 className="w-full">nª de post</h1>
                  <h1 className="w-full">ver todos</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default HomeDashboard
