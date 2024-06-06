import { TipsEntity } from "@/api/tips"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateTip = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: TipsEntity.createTip,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["get-tips"] }),
  })
}

export const useUpdateTip = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: TipsEntity.updateTip,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["get-tips"] }),
  })
}

export const useDeleteTip = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => TipsEntity.deleteTip(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["get-tips"] }),
  })
}
