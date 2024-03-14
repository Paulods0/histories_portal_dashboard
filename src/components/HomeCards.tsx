import { IPostData } from "../types"
import { FaFileAlt } from "react-icons/fa"
import { FaUsers } from "react-icons/fa"
import { FaHeart } from "react-icons/fa"

const icons = {
  users: <FaUsers color="#382A3F" size={40} />,
  posts: <FaFileAlt color="#382A3F" size={40} />,
  likes: <FaHeart color="#382A3F" size={40} />,
}

const HomeCards = ({
  posts,
  tittle,
  rotateIcon,
  icon,
}: {
  posts: IPostData[]
  tittle: string
  rotateIcon?: boolean
  icon: "users" | "posts" | "likes"
}) => {
  return (
    <div className=" bg-white/50 h-[140px] w-full  rounded-[10px] p-4 border border-[1px_solid_#9d9d9d] flex flex-col justify-between">
      <div className="text-[#27182E] flex gap-4 items-center ">
        <div className={`${rotateIcon ? "rotate-12" : ""}`}>{icons[icon]}</div>

        <h1 className="text-[#27182E] text-lg font-bold">{tittle}</h1>
      </div>
      <div className="flex gap-2 self-end">
        <h1 className="text-[#27182E] text-5xl font-medium">{posts.length}</h1>
      </div>
    </div>
  )
}

export default HomeCards
