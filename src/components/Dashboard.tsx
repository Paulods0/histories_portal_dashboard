import { Outlet } from "react-router-dom"
import SidebarNavigation from "./SidebarNavigation"
import Header from "./Header"

const Dashboard = () => {
  return (
    <main className="h-screen w-full bg-[#f6f6f6]">
      <div className="relative flex h-full items-center justify-center">
        <SidebarNavigation />
        <div className="flex  w-full flex-col items-center justify-center">
          {/* <Header /> */}
          <main className="py-5 h-screen w-full   flex items-center justify-between px-4 pr-8">
            <Outlet />
          </main>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
