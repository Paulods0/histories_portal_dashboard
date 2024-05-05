import MyPostsWrapper from "./my-posts-wrapper"
import AllPostsWrapper from "./all-posts-wrapper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"

const PostsContainer = () => {
  return (
    <section className="w-full absolute h-full overflow-y-hidden scroll-bar bg-background flex flex-col">
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
      <Link to={"/novopost"} className="absolute right-5 text-xs underline">
        <Button variant={"outline"}>Adicionar</Button>
      </Link>
    </section>
  )
}

export default PostsContainer
