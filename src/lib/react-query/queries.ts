import {
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
import { Category, ClassifiedPost, Post, User } from "@/types/data"
import { useQuery } from "@tanstack/react-query"

export const useGetAllPosts = (
  page: number,
  category?: string,
  limit?: number
) => {
  return useQuery<PostsDataResponse>({
    queryKey: ["get-all-posts", page, category, limit],
    queryFn: () => getAllPosts(page, category, limit),
  })
}

export const useGetUserPosts = (user_id: string) => {
  return useQuery<Post[]>({
    queryKey: ["get-user-posts"],
    queryFn: () => getUserPosts(user_id),
  })
}

export const useGetAllProducts = (
  page: number = 1,
  category: string = "",
  limit: number = 100
) => {
  return useQuery({
    queryKey: ["get-all-products", page, category, limit],
    queryFn: () => getAllProducts(page, category, limit),
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

// export const useGetCategories = () => {
//   return useQuery<Category[]>({
//     queryKey: ["get-categories"],
//     queryFn: getAllCategories,
//   })
// }

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

export const useGetClassifiedPosts = () => {
  return useQuery<ClassifiedPost[]>({
    queryKey: ["get-classified-posts"],
    queryFn: getClassifiedPosts,
  })
}
