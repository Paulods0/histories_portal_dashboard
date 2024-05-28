import { NewClassifiedPost, NewPost, NewSchedulePost } from "@/types/create"
import axios from "../../config/axios-config"
import { ClassifiedPost, Post, SchedulePost } from "@/types/data"
import { UpdatePost, UpdateSchedulePost } from "@/types/update"

export const createPost = async (body: NewPost) => {
  return await axios.post("/post", body)
}

export const createSchedulePost = async (body: NewSchedulePost) => {
  return await axios.post("/schedule-post", body)
}

export const createClassifiedPost = async (body: NewClassifiedPost) => {
  return await axios.post("/classified-post", body)
}

export type PostsDataResponse = {
  total: number
  pages: number
  posts: Post[]
}

export const getAllPosts = async (
  page: number,
  category?: string
): Promise<PostsDataResponse> => {
  const posts = await axios.get(`/post?page=${page}&category=${category}`)
  return posts.data
}

export const getHighlightedPost = async (): Promise<Post> => {
  const response = await axios.get("/post/get/highlighted-post")
  return response.data
}

export const getAllPostsByCategory = async (category_slug: string) => {
  const response = await axios.get(`/post/category/${category_slug}`)
  return response.data.data
}

type SchedulePostResponse = {
  posts: SchedulePost[]
  page: number
}

export const getSchedulePosts = async (
  page: number
): Promise<SchedulePostResponse> => {
  const response = await axios.get(`/schedule-post?page=${page}`)
  return response.data
}

export const getSinglePost = async (id: string): Promise<Post> => {
  const response = await axios.get(`/post/${id}`)
  return response.data
}

export const getClassifiedPosts = async (): Promise<ClassifiedPost[]> => {
  const response = await axios.get("/classified-post")
  return response.data.data
}

export const updatePost = async (data: { id: string; data: UpdatePost }) => {
  await axios.put(`/post/${data.id}`, data.data)
}

export const updateSchedulePost = async (data: {
  id: string
  data: UpdateSchedulePost
}) => {
  await axios.put(`/schedule-post/${data.id}`, data.data)
}

export const updateClassifiedPost = async (data: {
  id: string
  newStatus: string
}) => {
  await axios.put(`/classified-post/${data.id}`, {
    newStatus: data.newStatus,
  })
}

export const deletePost = async (id: string) => {
  await axios.delete(`/post/${id}`)
}
