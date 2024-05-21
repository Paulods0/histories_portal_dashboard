import { Navigate, Outlet } from "react-router-dom"
import Cookies from "js-cookie"
import Container from "./container"
import Header from "./header"

const ProtectedRoutes = () => {
  const token = Cookies.get("token")

  if (!token) {
    return <Navigate to={"/login"} />
  }

  return (
    <>
      <Header />
      <Container className="w-full flex flex-col">
        <Outlet />
      </Container>
    </>
  )
}

export default ProtectedRoutes
