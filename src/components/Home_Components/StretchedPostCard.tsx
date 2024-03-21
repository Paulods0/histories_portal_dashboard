import { LiaUser } from "react-icons/lia"
import { BiCategory } from "react-icons/bi"
import { CiCalendarDate } from "react-icons/ci"
import { IPostData } from "../../types"

const StretchedPostCard: React.FC<{ post: IPostData }> = ({
  post: { mainImage, title, createdAt, category },
}) => {
  return (
    <div className="cursor-pointer w-full hover:bg-GRAY-LIGHTER ease-in-out hover:scale-95 duration-200 transition-all rounded-[10px] p-2 flex">
      <div className="relative h-[70px] w-[80px] ">
        <img
          src={mainImage}
          className="absolute rounded-[8px] inset-0 w-full h-full object-cover"
          alt=""
        />
      </div>

      <div className="w-full flex flex-col justify-between items-start ml-4">
        <h1 className="font-bold">{title}</h1>
        <div className="w-full flex justify-between items-end">
          <div className="flex flex-col">
            <div className="flex gap-1">
              <div className="flex items-center gap-1">
                <BiCategory size={12} />
                <span className="text-[12px] font-semibold">Tópico:</span>
              </div>

              <span className="text-[12px]">{category.name}</span>
            </div>

            <div className="flex gap-1">
              <div className="flex items-center gap-1">
                <LiaUser size={12} />
                <span className="text-[12px] font-semibold">Autor:</span>
              </div>

              <span className="text-[12px]">Paulo Luguenda</span>
            </div>
          </div>

          <div className="flex">
            <div className="flex items-center gap-1">
              <CiCalendarDate size={12} />
              <span className="text-[12px] mr-1 font-semibold">Data:</span>
            </div>
            <span className="text-[12px]">{createdAt.split("T")[0]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StretchedPostCard
