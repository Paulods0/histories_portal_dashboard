import {
  ClassifiedPostResponse,
  PostsDataResponse,
  PostEntity,
} from "@/api/post"
import { useQuery } from "@tanstack/react-query"
import { Post } from "@/types/data"

export const useGetAllPosts = (page: number, category?: string) => {
  return useQuery<PostsDataResponse>({
    queryKey: ["get-all-posts", page, category],
    queryFn: () => PostEntity.getAllPosts(page, category),
  })
}

export const useGetHighlightedPost = () => {
  return useQuery({
    queryKey: ["get-highlighted-post"],
    queryFn: PostEntity.getHighlightedPost,
  })
}

export const useGetSinglePost = (id: string) => {
  return useQuery<Post>({
    queryKey: ["single-post", id],
    queryFn: () => PostEntity.getSinglePost(id),
    enabled: true,
  })
}

export const useGetPostById = (id: string) => {
  return useQuery({
    queryKey: ["get-post-by-id", id],
    queryFn: () => PostEntity.getSinglePost(id),
  })
}

export const useGetClassifiedPosts = (page: number = 1) => {
  return useQuery<ClassifiedPostResponse>({
    queryKey: ["get-classified-posts", page],
    queryFn: () => PostEntity.getClassifiedPosts(page),
  })
}

export const useGetSchedulePosts = (page: number) => {
  return useQuery({
    queryKey: ["get-schedule-posts", page],
    queryFn: () => PostEntity.getSchedulePosts(page),
  })
}
