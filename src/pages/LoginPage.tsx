import { FormEvent, useEffect, useState } from "react"
import { IoMdEye } from "react-icons/io"
import { IoMdEyeOff } from "react-icons/io"
import { url } from "../api/apiCalls"
import { Navigate } from "react-router-dom"

import { ClipLoader } from "react-spinners"
import { useAuthContext } from "../context/AuthContext"
import Cookies from "js-cookie"

const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, isLoading } = useAuthContext()

  const token = Cookies.get("token")

  if (token) {
    return <Navigate to="/" />
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    try {
      login(email, password)
    } catch (error) {
      console.log(error)
    }
  }

  const changePasswordState = () => {
    setIsPasswordVisible((prev) => !prev)
  }

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <div className="absolute w-[400px] h-screen flex items-center justify-center flex-col">
        <h1 className="text-2xl text-white uppercase mb-4 font-bold">
          Faça o login
        </h1>
        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col gap-4 p-12"
        >
          <div className="w-full p-2 border rounded-sm">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              className="w-full border-none outline-none bg-transparent text-[12px] text-black"
              placeholder="Email"
            />
          </div>
          <div className="relative w-full p-2 border rounded-sm">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={isPasswordVisible ? "text" : "password"}
              className="w-full border-none outline-none bg-transparent text-[12px] text-black"
              placeholder="Password"
            />
            <span
              onClick={changePasswordState}
              className="absolute right-2 top-3 cursor-pointer"
            >
              {isPasswordVisible ? (
                <IoMdEyeOff color="black" size={18} />
              ) : (
                <IoMdEye color="black" size={18} />
              )}
            </span>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className={`${
              isLoading ? "bg-zinc-700" : "bg-[#111111]"
            }  w-full p-2 border flex items-center justify-center rounded-sm  text-white uppercase hover:bg-[#2D2D2D]`}
          >
            {isLoading ? <ClipLoader size={24} color="#fff" /> : "login"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
