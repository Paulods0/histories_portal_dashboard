import {
  ClassifiedPostResponse,
  PostsDataResponse,
  getAllPosts,
  getClassifiedPosts,
  getHighlightedPost,
  getSchedulePosts,
  getSinglePost,
} from "@/api/post"
import { getAllProducts } from "@/api/product"
import { getAllProdutCategories } from "@/api/product-category"
import { getAllUsers, getUserPosts } from "@/api/user"
import { Category, Post, User } from "@/types/data"
import { useQuery } from "@tanstack/react-query"

export const useGetAllPosts = (page: number, category?: string) => {
  return useQuery<PostsDataResponse>({
    queryKey: ["get-all-posts", page, category],
    queryFn: () => getAllPosts(page, category),
  })
}

export const useGetUserPosts = (user_id: string) => {
  return useQuery<Post[]>({
    queryKey: ["get-user-posts"],
    queryFn: () => getUserPosts(user_id),
  })
}

export const useGetAllProducts = (page: number = 1, category: string = "") => {
  return useQuery({
    queryKey: ["get-all-products", page, category],
    queryFn: () => getAllProducts(page, category),
  })
}

export const useGetAllUsers = () => {
  return useQuery<User[]>({
    queryKey: ["get-all-users"],
    queryFn: getAllUsers,
  })
}

export const useGetAllProductCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["get-all-product-categories"],
    queryFn: getAllProdutCategories,
  })
}

export const useGetHighlightedPost = () => {
  return useQuery({
    queryKey: ["get-highlighted-post"],
    queryFn: getHighlightedPost,
  })
}

export const useGetSinglePost = (id: string) => {
  return useQuery<Post>({
    queryKey: ["single-post", id],
    queryFn: () => getSinglePost(id),
    enabled: true,
  })
}

export const useGetPostById = (id: string) => {
  return useQuery({
    queryKey: ["get-post-by-id", id],
    queryFn: () => getSinglePost(id),
  })
}

export const useGetSchedulePosts = (page: number) => {
  return useQuery({
    queryKey: ["get-schedule-posts", page],
    queryFn: () => getSchedulePosts(page),
  })
}

export const useGetClassifiedPosts = (page: number = 1) => {
  return useQuery<ClassifiedPostResponse>({
    queryKey: ["get-classified-posts", page],
    queryFn: () => getClassifiedPosts(page),
  })
}
