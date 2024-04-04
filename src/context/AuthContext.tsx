import React, { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import axios from "../api/axiosConfig"
import { getUser } from "@/api"
import { IUser } from "@/interfaces"

type UserIdType = {
  id: string
}

type AuthContextType = {
  userId: string | undefined
  user: IUser | undefined
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>
  login: (email: string, password: string) => void
  logout: () => void
  setUserId: React.Dispatch<React.SetStateAction<string | undefined>>
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
  const [user, setUser] = useState<IUser | undefined>(undefined)

  const [userId, setUserId] = useState<string | undefined>(() => {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : undefined
  })

  const [token, setToken] = useState(() => {
    const token = Cookies.get("token")
    return token ? token : undefined
  })

  const navigate = useNavigate()

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await axios.post(`auth/login`, {
        email: email,
        password: password,
      })
      const authData = await response.data
      if (response.status === 200) {
        setUserId(authData.id)
        setToken(authData.token)
        localStorage.setItem("user", JSON.stringify(authData.id))
        Cookies.set("token", authData.token, { expires: 7 })
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
    setUserId(undefined)
    localStorage.removeItem("user")
    Cookies.remove("token")
    navigate("/login")
  }
  const getCurrentUser = async (): Promise<IUser | undefined> => {
    const userId = localStorage.getItem("user")
    if (!userId) return undefined
    try {
      const user = await getUser(JSON.parse(userId!!))
      return user
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getCurrentUser()
      if (!userData) {
        return
      }
      setUser(userData)
    }
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userId,
        token,
        login,
        logout,
        isLoading,
        setUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
