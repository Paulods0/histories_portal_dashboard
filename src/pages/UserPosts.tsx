import { getUserPosts } from "@/api"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { useAuthContext } from "@/context/AuthContext"
import { IPostData } from "@/interfaces"
import { useEffect, useState } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { ClipLoader } from "react-spinners"

const UserPosts = () => {
  const { userId } = useAuthContext()
  const [posts, setPosts] = useState<IPostData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserPosts(userId!!)
        setPosts(data)
        setIsLoading(false)
      } catch (error) {
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
          <CarouselContent className="h-[350px] w-[400px] bg-red-50">
            {posts.map((post, index) => (
              <CarouselItem key={index}>
                <Card className="h-full border-none">
                  <CardTitle className="line-clamp-2 text-[16px] text-center">
                    {post.title}
                  </CardTitle>
                  <CardContent className="relative w-full h-full">
                    <img
                      src={post.mainImage}
                      className="absolute inset-0 w-full h-full object-cover"
                      alt="Post image"
                    />
                  </CardContent>
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
