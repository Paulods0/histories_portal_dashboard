import { Category } from "@/types/data"
import axios from "../../config/axios-config"

export const createProductCategory = async (name: string) => {
  return await axios.post("/product-category", {
    name: name,
  })
}
export const getAllProdutCategories = async (): Promise<Category[]> => {
  const response = await axios.get("/product-category")
  return response.data
}
export const updateProductCategory = async (data: {
  id: string
  name: string
}) => {
  await axios.put(`/product-category/${data.id}`, {
    name: data.name,
  })
}

export const deleteProductCategory = async (id: string) => {
  await axios.delete(`/product-category/${id}`)
}
