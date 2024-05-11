import { LiaUser } from "react-icons/lia"
import { BiCategory } from "react-icons/bi"
import { CiCalendarDate } from "react-icons/ci"
import { Post } from "../../types/data"

const HomePostCard = ({
  post: { mainImage, title, createdAt, category, author },
}: {
  post: Post
}) => {
  return (
    <div className="cursor-pointer bg-background text-foreground w-full hover:bg-foreground/10 mt-2 border ease-in-out duration-200 transition-all rounded-[10px] p-2 flex">
      <div className="relative w-full h-56 lg:h-[70px] lg:w-[80px] ">
        <img
          src={mainImage}
          className="absolute rounded-[8px] inset-0 w-full aspect-square h-full object-cover"
          alt=""
        />
        <h1 className="absolute bottom-4 text-base p-2 flex lg:hidden font-bold line-clamp-1">
          {title}
        </h1>
      </div>

      <div className="w-full hidden lg:flex flex-col justify-between items-start ml-4">
        <h1 className="font-bold line-clamp-1">{title}</h1>
        <div className="w-full flex justify-between items-end">
          <div className="flex flex-col">
            <div className="flex gap-1">
              <div className="flex items-center gap-1">
                <BiCategory size={12} />
                <span className="text-[12px] font-semibold">Tópico:</span>
              </div>
              <span className="text-[12px]">{category?.name}</span>
            </div>

            <div className="flex gap-1">
              <div className="flex items-center gap-1">
                <LiaUser size={12} />
                <span className="text-[12px] font-semibold">Autor:</span>
              </div>
              <span className="text-[12px] font-normal">
                {author
                  ? `${author?.firstname} ${author?.lastname}`
                  : "unknown"}
              </span>
            </div>
          </div>

          <div className="flex">
            <div className="flex items-center gap-1">
              <CiCalendarDate size={12} />
              <span className="text-[12px] mr-1 font-semibold">Data:</span>
            </div>
            <span className="text-[12px]">{createdAt?.split("T")[0]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePostCard
