import { Partner } from "@/api/partner"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreatePartner = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: Partner.createPartner,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-partners"] }),
  })
}
export const useUpdatePartner = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: Partner.updatePartner,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-partners"] }),
  })
}
export const useDeletePartner = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: Partner.deletePartner,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-partners"] }),
  })
}
