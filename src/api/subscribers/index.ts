import { Subscriber } from "@/components/subscribers-table"
import axios from "@/config/axios-config"

export class SubscriberEntity {
  static async getSubscribers(): Promise<Subscriber[]> {
    try {
      const response = await axios.get("/newsletter")
      return response.data
    } catch (error) {
      return []
    }
  }
}
