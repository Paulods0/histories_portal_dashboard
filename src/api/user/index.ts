import { NewUser } from "@/types/create"
import axios from "../../config/axios-config"
import { Post, User } from "@/types/data"

export const createUser = async (user: NewUser) => {
  await axios.post("/auth", {
    firstname: user.firstname,
    lastname: user.lastname,
    image: user.image,
    email: user.email,
    password: user.password,
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

export const updateUser = async (data: {
  id: string
  user: { firstname?: string; lastname?: string; image?: string }
}) => {
  await axios.put(`/auth/${data.id}`, data.user)
}

export const deleteUser = async (id: string) => {
  await axios.delete(`/auth/${id}`)
}
