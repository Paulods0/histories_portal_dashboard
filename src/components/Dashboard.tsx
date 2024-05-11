import { Navigate, Outlet } from "react-router-dom"
import Cookies from "js-cookie"
import Header from "./home-components/header"
import Container from "./global/container"

const Dashboard = () => {
  const token = Cookies.get("token")
  if (!token) {
    return <Navigate to={"/login"} />
  }

  return (
    <main className="w-full flex flex-col dark text-foreground">
      <Header />

      <Container className="pt-2 bg-background h-screen">
        <Outlet />
      </Container>
    </main>
  )
}

export default Dashboard
