import { NewUser } from "@/types/create"
import axios from "../../config/axios-config"
import { Post, User } from "@/types/data"
import { UpdateUser } from "@/types/update"

export const createUser = async (user: NewUser) => {
  await axios.post("/auth", {
    firstname: user.firstname,
    lastname: user.lastname,
    image: user.image,
    email: user.email,
    password: user.password,
    role: user.role,
  })
}

export const getUserPosts = async (id: string): Promise<Post[]> => {
  const response = await axios.get(`/post/user-posts/${id}`)
  return response.data
}

export const getAllUsers = async (): Promise<User[]> => {
  const response = await axios.get("/auth")
  return response.data
}

export const getUser = async (user_id: string): Promise<User> => {
  const response = await axios.get(`/auth/${user_id}`)
  return response.data
}

export const updateUser = async (user: UpdateUser) => {
  await axios.put(`/auth/${user.id}`, {
    firstname: user?.firstname,
    lastname: user?.lastname,
    image: user?.image,
    role: user?.role,
  } as UpdateUser)
}

export const deleteUser = async (id: string) => {
  await axios.delete(`/auth/${id}`)
}
