import { Navigate, Outlet } from "react-router-dom"
import SidebarNavigation from "./SidebarNavigation"
import Cookies from "js-cookie"
import { useTheme } from "../context/ThemeContext"

const Dashboard = () => {
  const { theme } = useTheme()
  const token = Cookies.get("token")
  if (!token) {
    return <Navigate to={"/login"} />
  }

  return (
    <main className={`h-screen w-full ${theme === "light" ? "light" : "dark"}`}>
      <div className="relative flex h-full items-center justify-center">
        <SidebarNavigation />
        <div className="flex  w-full flex-col items-center justify-center ">
          {/* <Header /> */}
          <main className="py-2 h-screen w-full flex items-center justify-between px-2">
            <Outlet />
          </main>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
