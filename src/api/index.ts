import axios from "./axiosConfig"
import {
  CategoryData,
  NewPost,
  NewClassifiedPost,
  NewSchedulePost,
  PostData,
  ProductData,
  UpdatePost,
  User,
  NewExcursionPost,
} from "@/types"

export const createPost = async (body: NewPost | NewExcursionPost) => {
  return await axios.post("/post", body)
}
export const createSchedulePost = async (body: NewSchedulePost) => {
  return await axios.post("/schedule-post", body)
}
export const createClassifiedPost = async (body: NewClassifiedPost) => {
  return await axios.post("/classified-post", body)
}

export const createProductCategory = async (name: string) => {
  return await axios.post("/product-category", {
    name: name,
  })
}

export const createPostCategory = async (data: {
  name: string
  user_id: string
}) => {
  return await axios.post("/post-category", {
    name: data.name,
    creator: data.user_id,
  })
}

export const getAllCategories = async (): Promise<CategoryData[] | []> => {
  try {
    const response = await axios.get("/post-category")
    return response.data
  } catch (error) {
    console.log("Error: " + error)
    return []
  }
}
export const getAllProdutCategories = async (): Promise<CategoryData[]> => {
  const response = await axios.get("/product-category")
  return response.data
}
export const getAllPosts = async (): Promise<PostData[] | []> => {
  try {
    const posts = await axios.get("/post")
    return posts.data
  } catch (error) {
    return []
  }
}
export const getSinglePost = async (id: string): Promise<PostData> => {
  const response = await axios.get(`/post/${id}`)
  return response.data
}
export const getAllProducts = async (): Promise<ProductData[] | []> => {
  const response = await axios.get("/product")
  return response.data
}
export const getUserPosts = async (id: string): Promise<PostData[]> => {
  const response = await axios.get(`/post/user-posts/${id}`)
  return response.data
}
export const deleteCategory = async (id: string) => {
  await axios.delete(`/post-category/${id}`)
}

export const deleteProductCategory = async (id: string) => {
  await axios.delete(`/product-category/${id}`)
}

export const deleteProduct = async (id: string) => {
  await axios.delete(`/product/${id}`)
}

export const deletePost = async (id: string) => {
  await axios.delete(`/post/${id}`)
}
export const getAllUsers = async (): Promise<User[]> => {
  const response = await axios.get("/auth")
  return response.data
}
export const getUser = async (user_id: string): Promise<User> => {
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
  await axios.post("/auth", {
    firstname: user.firstname,
    lastname: user.lastname,
    image: user.image,
    email: user.email,
    password: user.password,
  })
}
export const getHighlightedPost = async (): Promise<PostData> => {
  const response = await axios.get("/post/get/highlighted-post")
  return response.data
}
export const updateUser = async (
  id: string,
  user: { firstname?: string; lastname?: string; image?: string }
) => {
  await axios.put(`/auth/${id}`, user)
}
export const getAllPostsByCategory = async (category_slug: string) => {
  const response = await axios.get(`/post/category/${category_slug}`)
  return response.data
}

export const updateProduct = async (id: string, data: any) => {
  const response = await axios.put(`/post/${id}`, data)
  return response.data
}

export const updatePost = async (id: string, data: UpdatePost) => {
  await axios.put(`/post/${id}`, data)
}
