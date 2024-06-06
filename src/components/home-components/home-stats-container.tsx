import { useMemo } from "react"
import HomeStatsCard from "./home-stats-card"
import LoaderSpinner from "../global/loader-spinner"
import { useAuthContext } from "../../context/auth-context"
import { useGetAllPosts } from "@/lib/react-query/queries/post-queries"
import { useGetUserPosts } from "@/lib/react-query/queries/user-queries"
import { useGetAllProducts } from "@/lib/react-query/queries/product-queries"

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

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <HomeStatsCard
            footerIcon="views"
            footerText="views"
            titleIcon="myPosts"
            title="Os meus posts"
            description="Posts meus"
            footerAmount={userPostsViews}
            customStyle="bg-[#D93C3C] w-full"
            amount={userPosts?.length.toString()}
          />
          <HomeStatsCard
            titleIcon="posts"
            footerIcon="views"
            footerText="views"
            title="Total de posts"
            description="posts no total"
            footerAmount={totalPostsViews}
            amount={totalPosts?.toString()}
            customStyle="bg-[#423B94] w-full"
          />
          <HomeStatsCard
            footerAmount={16}
            titleIcon="store"
            title="subscritos"
            footerIcon="category"
            footerText="inscritos"
            description="Inscritos"
            customStyle="bg-[#505050] w-full"
            amount={products?.products.length.toString()}
          />
        </div>
      )}
    </div>
  )
}

export default HomeStatsContainer
