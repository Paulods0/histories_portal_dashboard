import { Subscriber } from "@/components/subscribers-table"
import axios from "@/config/axios-config"

export async function getSubscribers(): Promise<Subscriber[]> {
  try {
    const response = await axios.get("/newsletter")
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
}
