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
    <main className="relative h-screen w-full bg-WHITE flex flex-col text-BLACK">
      <Header />
      <section className="h-screen w-full flex">
        <SidebarNavigation />
        <div className="w-full h-full bg-zinc-100">
          <Outlet />
        </div>
      </section>
    </main>
  )
}

export default Dashboard
