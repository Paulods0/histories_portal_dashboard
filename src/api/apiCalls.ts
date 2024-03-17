import { API_URL } from "../utils/enums"
import { ICategoryData, IPostData, IProduct } from "../types"

export const url = "http://localhost:8080/api/"

export async function getAllCategories(): Promise<ICategoryData[] | []> {
  try {
    const response = await fetch(`${url}${API_URL.GET_ALL_CATEGORIES}`)
    const data: ICategoryData[] = await response.json()
    // console.log(data)
    return data
  } catch (error) {
    console.log("Error: " + error)
    return []
  }
}
export const getAllPosts = async (): Promise<IPostData[] | []> => {
  try {
    const response = await fetch(url + API_URL.GET_ALL_POSTS)
    const posts = await response.json()
    return posts
  } catch (error) {
    console.log("getAllPosts ~ error", error)
    return []
  }
}
export const getSinglePost = async (
  id: string | undefined
): Promise<IPostData | undefined> => {
  const response = await fetch(`${url}${API_URL.GET_SINGLE_POST}/${id}`, {
    method: "GET",
  })
  const data = await response.json()
  return data
}

export const getAllProducts = async (): Promise<IProduct[] | []> => {
  const response = await fetch(`${url}${API_URL.GET_ALL_PRODUCTS}`)
  const data = await response.json()
  return data
}
