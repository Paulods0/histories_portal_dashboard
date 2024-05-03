import { getUserPosts } from "@/api"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { useAuthContext } from "@/context/AuthContext"
import { PostData } from "@/types"
import { useEffect, useState } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { ClipLoader } from "react-spinners"

const UserPosts = () => {
  const { userId } = useAuthContext()
  const [posts, setPosts] = useState<PostData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserPosts(userId!!)
        setPosts(data)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <main className="w-full h-[50vh] flex items-center justify-center">
        <ClipLoader size={50} color="#111111" />
      </main>
    )
  }

  return (
    <section className=" mt-4 w-full h-full flex items-center justify-center">
      {posts.length > 0 ? (
        <Carousel
          className="w-[700px] flex items-center justify-center"
          opts={{ align: "center" }}
        >
          <CarouselContent className="h-[300px] w-[400px] bg-red-50">
            {posts.map((post, index) => (
              <CarouselItem key={index}>
                <Card className="h-full relative bg-transparent border-none">
                  <CardTitle className="line-clamp-2 mb-2 text-[16px] text-center">
                    {post.title}
                  </CardTitle>
                  <CardContent className="relative w-full h-full">
                    <img
                      src={post.mainImage}
                      className="absolute inset-0 w-full h-full object-cover"
                      alt="Post image"
                    />
                  </CardContent>
                  <div className="absolute bottom-4 left-2 flex items-center justify-between px-3 w-full">
                    <span className="p-2 capitalize rounded-full text-white  text-[12px] bg-zinc-900/40">
                      Categoria: {post.category.name}
                    </span>
                    <span className="capitalize bg-zinc-900/40 p-2 rounded-full text-white  text-[12px]">
                      views: {post.views}
                    </span>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-zinc-300  w-12 h-12" />
          <CarouselNext className="bg-zinc-300  w-12 h-12" />
        </Carousel>
      ) : (
        <div className="w-full h-[50vh] flex items-center justify-center">
          <h1 className="text-[20px]">Não há nenhum post.</h1>
        </div>
      )}
    </section>
  )
}

export default UserPosts
