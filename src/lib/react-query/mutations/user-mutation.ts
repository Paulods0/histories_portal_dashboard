import { UserEntity } from "@/api/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: UserEntity.createUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-users"] }),
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: UserEntity.updateUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-users"] }),
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: UserEntity.deleteUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-users"] }),
  })
}
