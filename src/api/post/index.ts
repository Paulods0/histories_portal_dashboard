import {
  NewClassifiedPost,
  NewExcursionPost,
  NewPost,
  NewSchedulePost,
} from "@/types/create"
import axios from "../../config/axios-config"
import { Post } from "@/types/data"
import { UpdatePost } from "@/types/update"

export const createPost = async (body: NewPost | NewExcursionPost) => {
  return await axios.post("/post", body)
}

export const createSchedulePost = async (body: NewSchedulePost) => {
  return await axios.post("/schedule-post", body)
}

export const createClassifiedPost = async (body: NewClassifiedPost) => {
  return await axios.post("/classified-post", body)
}

export const getAllPosts = async (): Promise<Post[] | []> => {
  try {
    const posts = await axios.get("/post")
    return posts.data
  } catch (error) {
    return []
  }
}

export const getHighlightedPost = async (): Promise<Post> => {
  const response = await axios.get("/post/get/highlighted-post")
  return response.data
}

export const getAllPostsByCategory = async (category_slug: string) => {
  const response = await axios.get(`/post/category/${category_slug}`)
  return response.data
}

export const getSinglePost = async (id: string): Promise<Post> => {
  const response = await axios.get(`/post/${id}`)
  return response.data
}

export const updatePost = async (id: string, data: UpdatePost) => {
  await axios.put(`/post/${id}`, data)
}

export const deletePost = async (id: string) => {
  await axios.delete(`/post/${id}`)
}
