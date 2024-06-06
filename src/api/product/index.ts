import { NewProduct } from "@/types/create"
import axios from "../../config/axios-config"
import { Product } from "@/types/data"
import { UpdateProduct } from "@/types/update"

export type ProductsResponse = {
  products: Product[]
  pages: number
}

export class ProductEntity {
  
  static async createProduct(data: NewProduct) {
    await axios.post("/product", data)
  }

  static async getAllProducts(
    page?: number,
    category?: string
  ): Promise<ProductsResponse> {
    const response = await axios.get(
      `/product?page=${page}&category=${category}`
    )
    return response.data
  }

  static async updateProduct(data: UpdateProduct) {
    const response = await axios.put(`/product/${data.id}`, data)
    return response.data
  }

  static async deleteProduct(id: string) {
    await axios.delete(`/product/${id}`)
  }
}
