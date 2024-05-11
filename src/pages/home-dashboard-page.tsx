import HomeStatsContainer from "../components/home-components/home-stats-container"
import PostsContainer from "../components/home-components/posts-container"
import HighlightedPost from "../components/home-components/highlighted-post"

const HomeDashboardPage = () => {
  return (
    <main className="w-full flex flex-col gap-4">
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col">
          <h1 className="text-2xl font-bold uppercase mb-4">dashboard</h1>
          <HomeStatsContainer />
        </div>

        <HighlightedPost />
      </div>

      <div className="h-full mt-6 lg:mt-0">
        <PostsContainer />
      </div>
    </main>
  )
}

export default HomeDashboardPage
