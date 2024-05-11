import MyPostsWrapper from "./my-posts-wrapper"
import AllPostsWrapper from "./all-posts-wrapper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

const PostsContainer = () => {
  return (
    <div>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="my-posts">Os meus posts</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <AllPostsWrapper />
        </TabsContent>
        <TabsContent value="my-posts">
          <MyPostsWrapper />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PostsContainer
