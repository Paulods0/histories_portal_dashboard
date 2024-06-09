import { Partner } from "@/api/partner"
import { useQuery } from "@tanstack/react-query"

export const useGetPartners = (page: number) => {
  return useQuery({
    queryKey: ["get-all-partners"],
    queryFn: () => Partner.getAllPartners(page),
  })

}
export const useGetSinglePartner = (id: string) => {
  return useQuery({
    queryKey: ["get-partner"],
    queryFn: () => Partner.getSinglePartner(id),
  })
}
