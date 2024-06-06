import { useQuery } from "@tanstack/react-query"
import { Tip, TipResponse, TipsEntity } from "@/api/tips"

export const useGetTips = (page: number = 1) => {
  return useQuery<TipResponse>({
    queryKey: ["get-tips", page],
    queryFn: () => TipsEntity.getTips(page),
  })
}

export const useGetSingleTip = (id: string) => {
  return useQuery<Tip>({
    queryKey: ["get-single-tip", id],
    queryFn: () => TipsEntity.getSingleTip(id),
  })
}
