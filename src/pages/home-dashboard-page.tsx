import HomeStatsContainer from "../components/home-components/HomeStatsContainer"
import PostsContainer from "../components/home-components/PostsContainer"
import HighlightedPost from "../components/home-components/HighlightedPost"
import StoreTableData from "@/components/home-components/StoreTableData"

const HomeDashboardPage = () => {
  return (
    <main className="w-full px-4 py-2 rounded-lg flex-col flex items-center justify-center">
      <div className="w-full grid-rows-2 grid gap-5 ">
        <div className="grid grid-cols-3 gap-5">
          <div className="self-end col-span-2 flex flex-col gap-y-3">
            <h1 className="text-3xl font-bold uppercase">dashboard</h1>
            <HomeStatsContainer />
          </div>

          <div className="h-full">
            <HighlightedPost />
          </div>
        </div>

        <div className="grid grid-cols-3 relative gap-5">
          <div className="col-span-2 w-full h-full relative">
            <PostsContainer />
          </div>

          <div className="w-full h-full relative">
            <StoreTableData />
          </div>
        </div>
      </div>
    </main>
  )
}

export default HomeDashboardPage
