import { API_URL } from "../utils/enums"
import { ICategoryData, IPostData, IProductData, IUser } from "../types"
import { useAuthContext } from "../context/AuthContext"

export const url = "http://localhost:8080/api/"

export const createProductCategory = async (name: string) => {
  await fetch(`${url}prod-category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  })
}

export const createCategory = async (name: string, user_id: string) => {
  await fetch(`${url}category/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, creator: user_id }),
  })
}
export const getAllCategories = async (): Promise<ICategoryData[] | []> => {
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
export const getAllProdutCategories = async (): Promise<ICategoryData[]> => {
  const response = await fetch(`${url}prod-category/categories`)
  const data = await response.json()
  return data
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
export const getAllProducts = async (): Promise<IProductData[] | []> => {
  const response = await fetch(`${url}${API_URL.GET_ALL_PRODUCTS}`)
  const data = await response.json()
  return data
}
export const getUserPosts = async (id: string): Promise<IPostData[]> => {
  const response = await fetch(`${url}post/get/userposts/${id}`)
  const posts = await response.json()
  return posts
}
export const deleteCategory = async (id: string) => {
  await fetch(`${url}category/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
}
export const deleteProductCategory = async (id: string) => {
  const response = await fetch(`${url}prod-category/${id}`, {
    method: "DELETE",
  })
  const data = await response.json()
  return data.message
}
export const deleteProduct = async (id: string) => {
  await fetch(`${url}product/${id}`, { method: "DELETE" })
}

export const getAllUsers = async (): Promise<IUser[]> => {
  const response = await fetch(`${url}auth`)
  const data = await response.json()
  return data
}

export const createUser = async (user: {
  firstname: string
  lastname: string
  image?: string
  email: string
  password: string
}) => {
  await fetch(`${url}auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
}
