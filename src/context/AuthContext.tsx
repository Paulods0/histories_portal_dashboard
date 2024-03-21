import { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { url } from "../api/apiCalls"

type UserType = {
  id: string
  firstname: string
  lastname: string
  email: string
}

type AuthContextType = {
  user: UserType | undefined
  login: (email: string, password: string) => void
  logout: () => void
  token: string | undefined
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be called within AuthContext")
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<UserType | undefined>(() => {
    const user = Cookies.get("user")
    return user ? JSON.parse(user) : undefined
  })

  const [token, setToken] = useState(() => {
    const token = Cookies.get("token")
    return token ? JSON.parse(token) : undefined
  })

  const navigate = useNavigate()

  // console.log(user)

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${url}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      })
      const authData = await response.json()
      if (response.ok) {
        setUser(authData.user)
        setToken(authData.token)
        Cookies.set("user", JSON.stringify(authData.user), { expires: 7 })
        Cookies.set("token", JSON.stringify(authData.token), { expires: 7 })
        setIsLoading(false)
        navigate("/")
        return
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const logout = () => {
    setIsLoading(false)
    setToken(undefined)
    setUser(undefined)
    Cookies.remove("token")
    Cookies.remove("user")
    navigate("/login")
  }
  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
