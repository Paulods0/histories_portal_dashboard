import {
  getAllCategories,
  getAllPosts,
  getAllProducts,
  getAllProdutCategories,
  getAllUsers,
  getHighlightedPost,
  getSinglePost,
  getUserPosts,
} from "@/api"
import { CategoryData, PostData, ProductData, User } from "@/types/data"
import { useQuery } from "@tanstack/react-query"

export const useGetAllPosts = () => {
  return useQuery<PostData[]>({
    queryKey: ["get-all-posts"],
    queryFn: getAllPosts,
  })
}

export const useGetUserPosts = (user_id: string) => {
  return useQuery<PostData[]>({
    queryKey: ["get-user-posts"],
    queryFn: () => getUserPosts(user_id),
  })
}

export const useGetAllProducts = () => {
  return useQuery<ProductData[]>({
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
  return useQuery<CategoryData[]>({
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
  return useQuery<CategoryData[]>({
    queryKey: ["get-categories"],
    queryFn: getAllCategories,
  })
}

export const useGetSinglePost = (id: string) => {
  return useQuery<PostData>({
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
