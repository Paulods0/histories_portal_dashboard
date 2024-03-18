import { CiUser } from "react-icons/ci"
import {
  MdOutlineCategory,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md"
import { CiFileOn } from "react-icons/ci"

const icons = {
  users: <CiUser />,
  posts: <CiFileOn />,
  products: <MdOutlineProductionQuantityLimits />,
  topics: <MdOutlineCategory />,
}

const HomeStats = ({
  label,
  icon,
  total,
}: {
  label: string
  icon: "users" | "posts" | "products" | "topics"
  total: number
}) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="text-[35px] font-semibold h-20">{total}</div>
      <div className="flex flex-col h-16 gap-0">
        <div>{icons[icon]}</div>
        <span className="text-[14px]">{label}</span>
      </div>
    </div>
  )
}

export default HomeStats
