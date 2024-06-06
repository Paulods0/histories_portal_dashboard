import { Post, User } from "@/types/data"
import { useQuery } from "@tanstack/react-query"
import { UserEntity } from "@/api/user"

export const useGetAllUsers = () => {
  return useQuery<User[]>({
    queryKey: ["get-all-users"],
    queryFn: UserEntity.getAllUsers,
  })
}

export const useGetUserPosts = (user_id: string) => {
  return useQuery<Post[]>({
    queryKey: ["get-user-posts"],
    queryFn: () => UserEntity.getUserPosts(user_id),
  })
}
