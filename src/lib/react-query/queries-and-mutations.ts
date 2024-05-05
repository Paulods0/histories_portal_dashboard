import {
  createClassifiedPost,
  createPost,
  createPostCategory,
  createProductCategory,
  createSchedulePost,
  deleteCategory,
  deletePost,
  deleteProductCategory,
  deleteUser,
  getAllCategories,
  getAllPosts,
  getAllProducts,
  getAllProdutCategories,
  getAllUsers,
  getHighlightedPost,
  getSinglePost,
  getUserPosts,
  updatePost,
  updatePostCategory,
  updateProductCategory,
  updateUser,
} from "@/api"
import {
  CategoryData,
  PostData,
  ProductData,
  UpdatePost,
  User,
} from "@/types/data"
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

export const useUpdatePost = (id: string, data: UpdatePost) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => updatePost(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-posts"] }),
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-users"] }),
  })
}

export const useUpdatePostCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updatePostCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-categories"] }),
  })
}

export const useUpdateProductCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateProductCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["get-all-product-categories"],
      }),
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

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-posts"] }),
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

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-users"] }),
  })
}
