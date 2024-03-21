import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = () => {
  const user = localStorage.getItem("token")
  if (!user) {
    return <Navigate to={"/login"} />
  }
  return <Outlet />
}

export default ProtectedRoutes
