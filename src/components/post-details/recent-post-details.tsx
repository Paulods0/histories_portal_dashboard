import { BiCalendar } from "react-icons/bi"
import { FaHeart } from "react-icons/fa"
import { MdOutlineCategory } from "react-icons/md"
type RecentPostDetailsProps = {
  icon: "topics" | "likes" | "createdAt"
  label: string
  title: string
}

const icons = {
  createdAt: <BiCalendar size={16} color="#1A101F" />,
  likes: <FaHeart size={16} color="#1A101F" />,
  topics: <MdOutlineCategory size={16} color="#1A101F" />,
}

const RecentPostsDetails = ({ icon, label, title }: RecentPostDetailsProps) => {
  return (
    <div className="flex flex-col text-[12px] items-start w-full">
      <div className="ml-4 text-center">{icons[icon]}</div>
      <div className="flex gap-1 items-center">
        <div className="font-semibold ">{label}:</div>
        <div className="px-3 py-1 rounded-full font-semibold text-[#1A101F] bg-black/10">
          {title}
        </div>
      </div>
    </div>
  )
}

export default RecentPostsDetails
