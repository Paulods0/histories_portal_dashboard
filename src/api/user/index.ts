import { NewUser } from "@/types/create"
import axios from "../../config/axios-config"
import { Post, User } from "@/types/data"
import { UpdateUser } from "@/types/update"

export class UserEntity {
  
  static async createUser(user: NewUser) {
    await axios.post("/auth", {
      firstname: user.firstname,
      lastname: user.lastname,
      image: user.image,
      email: user.email,
      password: user.password,
      role: user.role,
    })
  }

  static async getUserPosts(id: string): Promise<Post[]> {
    const response = await axios.get(`/post/user-posts/${id}`)
    return response.data
  }

  static async getAllUsers(): Promise<User[]> {
    const response = await axios.get("/auth")
    return response.data
  }

  static async getUser(user_id: string): Promise<User> {
    const response = await axios.get(`/auth/${user_id}`)
    return response.data
  }

  static async updateUser(user: UpdateUser) {
    await axios.put(`/auth/${user.id}`, {
      firstname: user?.firstname,
      lastname: user?.lastname,
      image: user?.image,
      role: user?.role,
    } as UpdateUser)
  }

  static async deleteUser(id: string) {
    try {
      await axios.delete(`/auth/${id}`)
    } catch (error) {
      console.log(error)
    }
  }
}
