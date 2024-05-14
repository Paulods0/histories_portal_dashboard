import {
  getAllPosts,
  getClassifiedPosts,
  getHighlightedPost,
  getSchedulePosts,
  getSinglePost,
} from "@/api/post"
import { getAllCategories } from "@/api/post-category"
import { getAllProducts } from "@/api/product"
import { getAllProdutCategories } from "@/api/product-category"
import { getAllUsers, getUserPosts } from "@/api/user"
import {
  Category,
  ClassifiedPost,
  Post,
  Product,
  SchedulePost,
  User,
} from "@/types/data"
import { useQuery } from "@tanstack/react-query"

export const useGetAllPosts = () => {
  return useQuery<Post[]>({
    queryKey: ["get-all-posts"],
    queryFn: getAllPosts,
  })
}

export const useGetUserPosts = (user_id: string) => {
  return useQuery<Post[]>({
    queryKey: ["get-user-posts"],
    queryFn: () => getUserPosts(user_id),
  })
}

export const useGetAllProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["get-all-products"],
    queryFn: getAllProducts,
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

export const useGetCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["get-categories"],
    queryFn: getAllCategories,
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

export const useGetSchedulePosts = () => {
  return useQuery<SchedulePost[]>({
    queryKey: ["get-schedule-posts"],
    queryFn: getSchedulePosts,
  })
}

export const useGetClassifiedPosts = () => {
  return useQuery<ClassifiedPost[]>({
    queryKey: ["get-classified-posts"],
    queryFn: getClassifiedPosts,
  })
}
