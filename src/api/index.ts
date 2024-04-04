import { API_URL } from "../utils/enums"
import { ICategoryData, IPostData, IProductData, IUser } from "../interfaces"
import axios from "./axiosConfig"

export const url = "http://localhost:8080/api"

export const createProductCategory = async (name: string) => {
  await axios.post(`${API_URL.CREATE_PRODUCT_CATEGORY}`, {
    name: name,
  })
}
export const createCategory = async (name: string, user_id: string) => {
  await axios.post(`${API_URL.CREATE_CATEGORY}`, {
    name: name,
    creator: user_id,
  })
}
export const getAllCategories = async (): Promise<ICategoryData[] | []> => {
  try {
    const response = await axios.get(`${API_URL.GET_ALL_CATEGORIES}`)
    return response.data
  } catch (error) {
    console.log("Error: " + error)
    return []
  }
}
export const getAllProdutCategories = async (): Promise<ICategoryData[]> => {
  const response = await axios.get(`${API_URL.GET_PRODUCT_CATEGORIES}`)
  return response.data
}
export const getAllPosts = async (): Promise<IPostData[] | []> => {
  try {
    const posts = await axios.get(`/${API_URL.GET_ALL_POSTS}`)
    return posts.data
  } catch (error) {
    return []
  }
}
export const getSinglePost = async (
  id: string | undefined
): Promise<IPostData | undefined> => {
  const response = await axios.get(`${API_URL.GET_SINGLE_POST}/${id}`)
  return response.data
}
export const getAllProducts = async (): Promise<IProductData[] | []> => {
  const response = await axios.get(`${API_URL.GET_ALL_PRODUCTS}`)
  return response.data
}
export const getUserPosts = async (id: string): Promise<IPostData[]> => {
  const response = await axios.get(`${API_URL.GET_USER_POSTS}/${id}`)
  return response.data
}
export const deleteCategory = async (id: string) => {
  await axios.delete(`${API_URL.DELETE_CATEGORY}/${id}`)
}
export const deleteProductCategory = async (id: string) => {
  await axios.delete(`${API_URL.DELETE_PRODUCT_CATEGORY}/${id}`)
}
export const deleteProduct = async (id: string) => {
  await axios.delete(`${API_URL.DELETE_PRODUCT}/${id}`)
}
export const getAllUsers = async (): Promise<IUser[]> => {
  const response = await axios.get(`${API_URL.GET_USERS}`)

  return response.data
}
export const getUser = async (user_id: string): Promise<IUser> => {
  const response = await axios.get(`/auth/${user_id}`)
  return response.data
}
export const createUser = async (user: {
  firstname: string
  lastname: string
  image?: string
  email: string
  password: string
}) => {
  await axios.post(`${API_URL.CREATE_USER}`, {
    firstname: user.firstname,
    lastname: user.lastname,
    image: user.image,
    email: user.email,
    password: user.password,
  })
}
export const getHighlightedPost = async (): Promise<IPostData> => {
  const response = await axios.get(`${API_URL.GET_HIGHLIGHTED_POSTS}`)
  return response.data
}
export const updateUser = async (
  id: string,
  user: { firstname?: string; lastname?: string; image?: string }
) => {
  const response = await axios.patch(`${API_URL.UPDATE_USER}/${id}`, user)

  return response.data
}
