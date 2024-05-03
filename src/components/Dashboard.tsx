import { Navigate, Outlet } from "react-router-dom"
import SidebarNavigation from "./SidebarNavigation"
import Cookies from "js-cookie"
import Header from "./Home_Components/Header"

const Dashboard = () => {
  const token = Cookies.get("token")
  if (!token) {
    return <Navigate to={"/login"} />
  }

  return (
    <main className="w-full bg-background flex flex-col overflow-y-hidden dark text-foreground min-h-screen">
      <Header />
      <section className="w-full px-4 h-full overflow-y-hidden py-2">
        <Outlet />
      </section>
    </main>
  )
}

export default Dashboard
