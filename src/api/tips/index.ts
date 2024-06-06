import axios from "@/config/axios-config"
import { User } from "@/types/data"
import { toast } from "react-toastify"

export type CreateTip = {
  title: string
  image: string
  content: string
  author: string
  category: string
}
export type UpdateTip = {
  id: string
  title?: string
  image?: string
  content?: string
  author?: string
}

export type Tip = {
  _id: string
  author: User
  image: string
  title: string
  content: string
  category: string
}

export type TipResponse = {
  pages: number
  posts: Tip[]
}

export class TipsEntity {
  static async createTip(data: CreateTip) {
    try {
      await axios.post("/tip", data)
    } catch (error: any) {
      console.log(error.response.data.message)
      throw new Error(error.response.data.message)
    }
  }

  static async getTips(page: number = 1): Promise<TipResponse> {
    try {
      const response = await axios.get(`/tip?${page}`)
      return response.data
    } catch (error) {
      throw new Error("Não foi possível ler os dados")
    }
  }

  static async getSingleTip(id: string): Promise<Tip> {
    try {
      const response = await axios.get(`/tip/${id}`)
      return response.data
    } catch (error: any) {
      console.log(error)
      throw new Error(error.response.data.message)
    }
  }

  static async updateTip(data: UpdateTip) {
    try {
      const response = await axios.put(`/tip/${data.id}`, {
        title: data.title,
        image: data.image,
        author: data.author,
        content: data.content,
      })
      toast.success(response.data.message)
    } catch (error: any) {
      console.log(error)
      throw new Error(error.response.data.message)
    }
  }
  static async deleteTip(id: string): Promise<void> {
    try {
      const response = await axios.delete(`/tip/${id}`)
      toast.success(response.data.message)
      console.log(response.data.message)
    } catch (error: any) {
      toast.error(error.response.data.message)
      throw new Error(error.response.data.message)
    }
  }
}
