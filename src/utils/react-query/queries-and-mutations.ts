import {
  createClassifiedPost,
  createPost,
  createPostCategory,
  createProductCategory,
  createSchedulePost,
  deleteCategory,
  deletePost,
  deleteProductCategory,
  getAllCategories,
  getAllPosts,
  getAllProducts,
  getAllProdutCategories,
  getAllUsers,
  getHighlightedPost,
  getSinglePost,
  getUserPosts,
  updatePost,
} from "@/api"
import { CategoryData, PostData, ProductData, UpdatePost, User } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCreatePost = () => {
  return useMutation({
    mutationFn: createPost,
  })
}

export const useCreateSchedulePost = () => {
  return useMutation({
    mutationFn: createSchedulePost,
  })
}

export const useCreatePostCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createPostCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-categories"] }),
  })
}

export const useCreateProductCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createProductCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["get-all-product-categories"],
      }),
  })
}

export const useCreateClassifiedPost = () => {
  return useMutation({
    mutationFn: createClassifiedPost,
  })
}

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

// export const useGetPostsByCategory = (category_id: string) => {
//   return useQuery({
//     queryKey: ["get-categories"],
//     queryFn: () => getAllPostsByCategory(category_id),
//   })
// }

export const useGetSinglePost = (id: string) => {
  return useQuery<PostData>({
    queryKey: ["single-post", id],
    queryFn: () => getSinglePost(id),
    enabled: true,
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-posts"] }),
  })
}

export const useUpdatePost = (id: string, data: UpdatePost) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["update-post"],
    mutationFn: () => updatePost(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-posts"] }),
  })
}

export const useGetPostById = (id: string) => {
  return useQuery({
    queryKey: ["get-post-by-id", id],
    queryFn: () => getSinglePost(id),
  })
}

export const useDeletePostCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-categories"] }),
  })
}

export const useDeleteProductCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteProductCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["get-all-product-categories"],
      }),
  })
}
