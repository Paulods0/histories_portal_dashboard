import { NewProduct } from "@/types/create"
import axios from "../../config/axios-config"
import { Product } from "@/types/data"
import { UpdateProduct } from "@/types/update"

export const createProduct = async (data: NewProduct) => {
  await axios.post("/product", data)
}

export const getAllProducts = async (): Promise<Product[] | []> => {
  const response = await axios.get("/product")
  return response.data
}
export const updateProduct = async (data: UpdateProduct) => {
  const response = await axios.put(`/product/${data.id}`, data)
  return response.data
}

export const deleteProduct = async (id: string) => {
  await axios.delete(`/product/${id}`)
}
