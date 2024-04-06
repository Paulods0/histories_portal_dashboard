import { FaUsers } from "react-icons/fa"
import { BsShopWindow } from "react-icons/bs"

type HomeStatsCardType = {
  classname?: string
  amount: number
  iconText?: "views" | "category"

  text1?: string
  text2?: string
  label: string
}

const icons = {
  views: <FaUsers size={12} />,
  category: <BsShopWindow size={12} />,
}

const HomeStatsCard: React.FC<HomeStatsCardType> = ({
  amount,
  text1,
  text2,

  iconText,
  label,
  classname,
}) => {
  return (
    <div
      className={`rounded-[10px] hover:translate-y-1 bg-WHITE cursor-pointer duration-200 transition-transform-y ease-in-out p-2  flex flex-col items-center justify-center ${classname}`}
    >
      <div className="flex flex-col">
        <span className="text-[12px] capitalize text-zinc-400">{label}</span>
        <span className="font-bold text-[26px] text-center">{amount}</span>
      </div>

      {text1 || text2 ? (
        <div className="w-full flex items-center gap-x-3">
          <span className="ml-2 font-normal text-BLACK text-[12px]">
            {text1}
          </span>
          <span className="px-3 py-1 rounded-full bg-zinc-300/50 font-light text-green-500 text-[12px] flex items-center gap-x-2">
            {text2}

            {iconText && icons[iconText]}
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default HomeStatsCard
