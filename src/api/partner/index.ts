import axios from "@/config/axios-config"
import { toast } from "react-toastify"

export type AddPartner = {
  title: string
  image: string
  content: string
  author: string
}
export type UpdatePartner = {
  id: string
  title?: string
  image?: string
  content?: string
  authorId?: string
}
export type PartnerData = {
  _id: string
  title: string
  image: string
  content: string
  author: { _id: string; firstname: string; lastname: string; image: string }
}

type PartnerRes = {
  page: number
  partners: PartnerData[]
}

export class Partner {
  static async createPartner(data: AddPartner): Promise<void> {
    try {
      const response = await axios.post("/partner", data)
      toast.success(response.data.message)
    } catch (error: any) {
      toast.error(error.response.data.message)
      console.log(error)
    }
  }

  static async getAllPartners(page: number): Promise<PartnerRes> {
    try {
      const response = await axios.get(`/partner?${page || 1}`)
      return response.data
    } catch (error) {
      console.log(error)
      throw new Error(String(error))
    }
  }

  static async getSinglePartner(id: string): Promise<PartnerData> {
    try {
      const response = await axios.get(`/partner/${id}`)
      return response.data
    } catch (error) {
      console.log(error)
      throw new Error(String(error))
    }
  }

  static async updatePartner(data: UpdatePartner): Promise<void> {
    try {
      const response = await axios.put(`/partner/${data.id}`, data)
      toast.success(response.data.message)
    } catch (error: any) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }
  static async deletePartner(id: string): Promise<void> {
    try {
      const response = await axios.delete(`/partner/${id}`)
      toast.success(response.data.message)
    } catch (error: any) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }
}
