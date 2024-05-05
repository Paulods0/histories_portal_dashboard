import { useNavigate } from "react-router-dom"

const withAuthentication = (WrappedComponent: any) => {
  const AuthComponent = (props: any) => {
    const navigate = useNavigate()
    const authToken = localStorage.getItem("user")
    if (!authToken || authToken === null) {
      navigate("/login")
      return null
    }

    return <WrappedComponent {...props} />
  }
  return AuthComponent
}

export default withAuthentication
