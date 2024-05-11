import HomeStatsCard from "./home-stats-card"
import { useAuthContext } from "../../context/auth-context"
import { ClipLoader } from "react-spinners"

import {
  useGetAllPosts,
  useGetAllProductCategories,
  useGetAllProducts,
  useGetUserPosts,
} from "@/lib/react-query/queries"

const HomeStatsContainer = () => {
  const { userId } = useAuthContext()

  const { data: posts, isLoading } = useGetAllPosts()
  const { data: products } = useGetAllProducts()
  const { data: userPosts } = useGetUserPosts(userId!!)
  const { data: productCategories } = useGetAllProductCategories()

  const totalPostsViews = posts?.reduce((total, acc) => acc.views + total, 0)
  const userPostsViews = userPosts?.reduce((total, acc) => acc.views + total, 0)
  const totalProductCategories = productCategories?.length

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <ClipLoader color="#111111" size={28} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <HomeStatsCard
            customStyle="bg-[#D93C3C] w-full"
            titleIcon="myPosts"
            title="Os meus posts"
            amount={userPosts?.length.toString()}
            description="Posts meus "
            footerIcon="views"
            footerText="views"
            footerAmount={userPostsViews}
          />
          <HomeStatsCard
            customStyle="bg-[#423B94] w-full"
            titleIcon="posts"
            title="Total de posts"
            amount={posts?.length.toString()}
            description="posts no total"
            footerIcon="views"
            footerText="views"
            footerAmount={totalPostsViews}
          />
          <HomeStatsCard
            customStyle="bg-[#505050] w-full"
            titleIcon="store"
            title="loja"
            amount={products?.length.toString()}
            description="Produtos"
            footerIcon="category"
            footerText="categorias"
            footerAmount={totalProductCategories}
          />
        </div>
      )}
    </div>
  )
}

export default HomeStatsContainer
