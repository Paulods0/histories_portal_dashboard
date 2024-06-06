import { ProductEntity } from "@/api/product"
import { useQuery } from "@tanstack/react-query"

export const useGetAllProducts = (page: number = 1, category: string = "") => {
  return useQuery({
    queryKey: ["get-all-products", page, category],
    queryFn: () => ProductEntity.getAllProducts(page, category),
  })
}
