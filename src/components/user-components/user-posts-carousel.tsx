import { FC } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { Post } from "@/types/data"
import { FiEye } from "react-icons/fi"
import { AiFillLike } from "react-icons/ai"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

type Props = {
  posts?: Post[]
}

const UserPostsCarousel: FC<Props> = ({ posts }) => {
  return (
    <Carousel
      className="w-[400px] lg:w-[700px] flex items-center justify-center"
      opts={{ align: "center" }}
    >
      <CarouselContent className=" w-full h-[300px] lg:w-[400px] ">
        {posts?.map((post, index) => (
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
                  Categoria: {post.category}
                </span>

                <div className="flex items-center gap-2">
                  <div className="capitalize  gap-1 flex items-center bg-zinc-900/40 px-3 py-1 rounded-full text-white  text-[12px]">
                    <FiEye />
                    <p>{post.views}</p>
                  </div>
                  <div className="flex items-center gap-1 capitalize bg-zinc-900/40 px-3 py-1 rounded-full text-white text-[12px]">
                    <AiFillLike />
                    <p>{post.rating}</p>
                  </div>
                </div>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-zinc-300 hidden lg:flex w-12 h-12" />
      <CarouselNext className="bg-zinc-300 hidden lg:flex w-12 h-12" />
    </Carousel>
  )
}

export default UserPostsCarousel
