import HomeStatsCard from "./home-stats-card"
import { useAuthContext } from "../../context/auth-context"

import {
  useGetAllPosts,
  useGetAllProductCategories,
  useGetAllProducts,
  useGetUserPosts,
} from "@/lib/react-query/queries"
import LoaderSpinner from "../global/loader-spinner"
import { useMemo } from "react"

const HomeStatsContainer = () => {
  const { userId } = useAuthContext()

  const { data: postsData, isLoading } = useGetAllPosts(1, "")
  const { data: products } = useGetAllProducts()
  const { data: userPosts } = useGetUserPosts(userId!!)

  const totalPostsViews = postsData?.posts?.reduce(
    (total, acc) => acc.views + total,
    0
  )

  const userPostsViews = userPosts?.reduce((total, acc) => acc.views + total, 0)
  const totalPosts = useMemo(() => {
    return postsData?.posts.length
  }, [postsData?.posts])

  console.log(totalPosts)

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <LoaderSpinner />
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
            amount={postsData?.posts.length.toString()}
            description="posts no total"
            footerIcon="views"
            footerText="views"
            footerAmount={totalPostsViews}
          />
          <HomeStatsCard
            customStyle="bg-[#505050] w-full"
            titleIcon="store"
            title="subscritos"
            amount={products?.products.length.toString()}
            description="Inscritos"
            footerIcon="category"
            footerText="inscritos"
            footerAmount={16}
          />
        </div>
      )}
    </div>
  )
}

export default HomeStatsContainer
