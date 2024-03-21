import { LuUsers } from "react-icons/lu"
import { CgNotes } from "react-icons/cg"
import { BsShopWindow } from "react-icons/bs"

type HomeStatsCardType = {
  color: "bg-YELLOW" | "bg-BLACK" | "bg-GRAY-LIGHTER" | "bg-PINK-LIGHT"
  text_color: string
  col_span?: boolean
  amount: number
  icon: "users" | "store" | "my_posts" | "total_posts"
  label: string
}

const icons = {
  users: <LuUsers color="#111111" size={28} strokeWidth={1.5} />,
  store: <BsShopWindow color="#111111" size={28} strokeWidth={0} />,
  my_posts: <CgNotes color="#111111" size={28} strokeWidth={0} />,
  total_posts: <CgNotes color="#FFF" size={28} strokeWidth={0} />,
}

const HomeStatsCard: React.FC<HomeStatsCardType> = ({
  amount,
  text_color,
  color,
  icon,
  label,
  col_span,
}) => {
  return (
    <div
      className={`${color} rounded-[10px] hover:translate-y-1 cursor-pointer duration-200 transition-transform-y ease-in-out p-2  ${
        col_span && "col-span-2"
      } flex flex-col items-center justify-center `}
    >
      <div
        className={`flex w-full items-center justify-around text-${text_color}`}
      >
        <span>{icons[icon]}</span>
        <span className="text-[30px] font-medium">{amount}</span>
      </div>
      <span
        className={`text-[14px] self-start ml-4 text-${text_color} uppercase font-normal`}
      >
        {label}
      </span>
    </div>
  )
}

export default HomeStatsCard
