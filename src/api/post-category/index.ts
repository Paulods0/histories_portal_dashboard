import { Category } from "@/types/data"
import axios from "../../config/axios-config"
import { NewPostCategory } from "@/types/create"
import { UpdatePostCategory } from "@/types/update"

export const createPostCategory = async (data: NewPostCategory) => {
  return await axios.post("/post-category", {
    name: data.name,
    creator: data.user_id,
  })
}
export const getAllCategories = async (): Promise<Category[] | []> => {
  try {
    const response = await axios.get("/post-category")
    return response.data
  } catch (error) {
    console.log("Error: " + error)
    return []
  }
}

export const updatePostCategory = async (data: UpdatePostCategory) => {
  await axios.put(`/post-category/${data.id}`, {
    name: data.name,
  })
}
export const deleteCategory = async (id: string) => {
  await axios.delete(`/post-category/${id}`)
}
