import {
  createClassifiedPost,
  createPost,
  createSchedulePost,
  deletePost,
  updateClassifiedPost,
  updatePost,
} from "@/api/post"
// import {
//   createPostCategory,
//   deleteCategory,
//   updatePostCategory,
// } from "@/api/post-category"
import { createProduct, deleteProduct, updateProduct } from "@/api/product"
import {
  createProductCategory,
  deleteProductCategory,
  updateProductCategory,
} from "@/api/product-category"
import { createUser, deleteUser, updateUser } from "@/api/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createPost,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-posts"] }),
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

// export const useCreatePostCategory = () => {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: createPostCategory,
//     onSuccess: () =>
//       queryClient.invalidateQueries({ queryKey: ["get-categories"] }),
//   })
// }

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

export const useUpdatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updatePost,
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

// export const useUpdatePostCategory = () => {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: updatePostCategory,
//     onSuccess: () =>
//       queryClient.invalidateQueries({ queryKey: ["get-categories"] }),
//   })
// }

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

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-products"] }),
  })
}

export const useUpdateClassifiedPost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateClassifiedPost,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-classified-posts"] }),
  })
}

// export const useDeletePostCategory = () => {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: deleteCategory,
//     onSuccess: () =>
//       queryClient.invalidateQueries({ queryKey: ["get-categories"] }),
//   })
// }

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
