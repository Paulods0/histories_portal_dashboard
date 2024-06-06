import { NewClassifiedPost, NewPost, NewSchedulePost } from "@/types/create"
import axios from "../../config/axios-config"
import { ClassifiedPost, Post, SchedulePost } from "@/types/data"
import { UpdatePost, UpdateSchedulePost } from "@/types/update"

export type PostsDataResponse = {
  total: number
  pages: number
  posts: Post[]
}

type SchedulePostResponse = {
  posts: SchedulePost[]
  page: number
}

export type ClassifiedPostResponse = {
  pages: number
  posts: ClassifiedPost[]
}

export class PostEntity {
  static async createPost(body: NewPost) {
    return await axios.post("/post", body)
  }

  static async createSchedulePost(body: NewSchedulePost) {
    return await axios.post("/schedule-post", body)
  }

  static async createClassifiedPost(body: NewClassifiedPost) {
    return await axios.post("/classified-post", body)
  }

  static async getAllPosts(
    page?: number,
    category?: string
  ): Promise<PostsDataResponse> {
    const posts = await axios.get(`/post?page=${page}&category=${category}`)
    return posts.data
  }

  static async getHighlightedPost(): Promise<Post> {
    const response = await axios.get("/post/get/highlighted-post")
    return response.data
  }

  static async getAllPostsByCategory(category_slug: string) {
    const response = await axios.get(`/post/category/${category_slug}`)
    return response.data.data
  }

  static async getSchedulePosts(page: number): Promise<SchedulePostResponse> {
    const response = await axios.get(`/schedule-post?page=${page}`)
    return response.data
  }

  static async getSinglePost(id: string): Promise<Post> {
    const response = await axios.get(`/post/${id}`)
    return response.data
  }

  static async getClassifiedPosts(
    page: number = 1
  ): Promise<ClassifiedPostResponse> {
    const response = await axios.get(`/classified-post?page=${page}`)
    return response.data
  }

  static async updatePost(data: { id: string; data: UpdatePost }) {
    await axios.put(`/post/${data.id}`, data.data)
  }

  static async updateSchedulePost(data: UpdateSchedulePost) {
    await axios.put(`/schedule-post/${data.id}`, data)
  }

  static async updateClassifiedPost(data: { id: string; newStatus: string }) {
    await axios.put(`/classified-post/${data.id}`, {
      newStatus: data.newStatus,
    })
  }

  static async deletePost(id: string) {
    await axios.delete(`/post/${id}`)
  }
}
