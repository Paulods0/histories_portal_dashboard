import { PostEntity } from "@/api/post"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: PostEntity.createPost,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-posts"] }),
  })
}

export const useCreateSchedulePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: PostEntity.createSchedulePost,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-schedule-posts"] }),
  })
}

export const useUpdateSchedulePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: PostEntity.updateSchedulePost,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-schedule-posts"] }),
  })
}

export const useCreateClassifiedPost = () => {
  return useMutation({
    mutationFn: PostEntity.createClassifiedPost,
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: PostEntity.updatePost,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-posts"] }),
  })
}

export const useUpdateClassifiedPost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: PostEntity.updateClassifiedPost,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-classified-posts"] }),
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: PostEntity.deletePost,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-posts"] }),
  })
}

export const useDeleteSchedulePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: PostEntity.DeleteSchedulePost,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-schedule-posts"] }),
  })
}
