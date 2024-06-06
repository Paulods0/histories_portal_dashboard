import { SubscriberEntity } from "@/api/subscribers"
import { useQuery } from "@tanstack/react-query"

import { Subscriber } from "@/components/subscribers-table"

export const useGetSubscribers = () => {
  return useQuery<Subscriber[]>({
    queryKey: ["get-subscribers"],
    queryFn: SubscriberEntity.getSubscribers,
  })
}
