import { ProductEntity } from "@/api/product"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ProductEntity.createProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-products"] }),
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ProductEntity.updateProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-products"] }),
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ProductEntity.deleteProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-products"] }),
  })
}
