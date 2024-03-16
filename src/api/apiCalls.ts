import { API_URL } from "../utils"
import { ICategoryData, IPostData, IProduct } from "../types"

export const url = "http://localhost:8080/api/"

export async function getAllCategories(): Promise<ICategoryData[] | []> {
  try {
    const response = await fetch(url + "category/all")
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
  const response = await fetch(`http://localhost:8080/api/post/get/${id}`, {
    method: "GET",
  })
  const data = await response.json()
  return data
}
// export const getAllProducts = async (): Promise<IProduct> => {
//   try {
//   } catch (error) {
//     console.log(error)
//   }
// }
