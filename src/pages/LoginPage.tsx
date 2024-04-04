import { FormEvent, useState } from "react"
import { IoMdEye } from "react-icons/io"
import { IoMdEyeOff } from "react-icons/io"
import { Navigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { useAuthContext } from "../context/AuthContext"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const userCredentialsSchema = z.object({
  email: z.string().email({ message: "O email é obrigatório" }).min(1),
  password: z.string().min(1),
})
type UserCredentialsType = z.infer<typeof userCredentialsSchema>

// COMPONENT ITSELF
const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { login, isLoading } = useAuthContext()

  const { register, handleSubmit } = useForm<UserCredentialsType>({
    resolver: zodResolver(userCredentialsSchema),
  })
  
  const token = Cookies.get("token")
  if (token) {
    return <Navigate to="/" />
  }

  const handleLogin = async (credentials: UserCredentialsType) => {
    try {
      login(credentials.email, credentials.password)
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
        <h1 className="text-2xl text-black uppercase mb-4 font-bold">
          Faça o login
        </h1>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="w-full flex flex-col gap-4 p-12"
        >
          <Input {...register("email")} placeholder="Email" />

          <div className="relative w-full">
            <Input
              {...register("password")}
              type={isPasswordVisible ? "text" : "password"}
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

          <Button
            variant={"default"}
            disabled={isLoading}
            type="submit"
            className="uppercase"
          >
            {isLoading ? <ClipLoader size={24} color="#fff" /> : "login"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
