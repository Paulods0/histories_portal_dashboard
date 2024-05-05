import React, { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import axios from "../api/axiosConfig"
// import { getUser } from "@/api"
// import { IUser } from "@/interfaces"

export type UserData = {
  email: string
  firstname: string
  lastname: string
  image: string
}

type AuthContextType = {
  userId: string | undefined
  user: UserData | undefined
  token: string | undefined
  isLoading: boolean
  logout: () => void
  login: (email: string, password: string) => void
  setUser: React.Dispatch<React.SetStateAction<UserData | undefined>>
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

  const [user, setUser] = useState<UserData | undefined>(() => {
    const userData = localStorage.getItem("userData")
    return userData ? JSON.parse(userData) : undefined
  })

  const [userId, setUserId] = useState<string | undefined>(() => {
    const userId = localStorage.getItem("userId")
    return userId ? JSON.parse(userId) : undefined
  })

  const [token, setToken] = useState(() => {
    const token = Cookies.get("token")
    return token ? token : undefined
  })

  const navigate = useNavigate()

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await axios.post(`/auth/login`, {
        email: email,
        password: password,
      })
      const authData = await response.data
      if (response.status === 200) {
        setUserId(authData.id)
        setToken(authData.token)
        setUser(authData.user)
        localStorage.setItem("userData", JSON.stringify(authData.user))
        localStorage.setItem("userId", JSON.stringify(authData.id))
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
    setUser(undefined)
    localStorage.removeItem("userId")
    localStorage.removeItem("userData")
    Cookies.remove("token")
    navigate("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userId,
        token,
        login,
        logout,
        setUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
