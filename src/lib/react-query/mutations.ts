import {
  createClassifiedPost,
  createPost,
  createPostCategory,
  createProduct,
  createProductCategory,
  createSchedulePost,
  createUser,
  deleteCategory,
  deletePost,
  deleteProduct,
  deleteProductCategory,
  deleteUser,
  updatePost,
  updatePostCategory,
  updateProductCategory,
  updateUser,
} from "@/api"
import { UpdatePost } from "@/types/data"
import { useMutation, useQueryClient } from "@tanstack/react-query"

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

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-products"] }),
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

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-products"] }),
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
export const useCreateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-users"] }),
  })
}
