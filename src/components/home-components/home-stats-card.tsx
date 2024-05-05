import { FaUsers, FaEye, FaFile } from "react-icons/fa"
import { BsShopWindow } from "react-icons/bs"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Link } from "react-router-dom"

type HomeStatsProps = {
  customStyle?: string
  titleIcon: "store" | "posts" | "myPosts"
  title: string
  amount?: string
  description?: string
  footerIcon: "views" | "category"
  footerAmount: number | 0 | undefined
  footerText: string
}

const titleIcons = {
  store: <BsShopWindow size={18} />,
  posts: <FaFile size={18} />,
  myPosts: <FaUsers size={18} />,
}
const icons = {
  views: <FaEye size={12} />,
  category: <BsShopWindow size={12} />,
}

const HomeStatsCard = ({
  customStyle,
  titleIcon,
  title,
  amount,
  description,
  footerAmount,
  footerText,
  footerIcon,
}: HomeStatsProps) => {
  return (
    <Card
      className={`w-[120px]  ${customStyle} hover:translate-y-1 transition-all duration-200 ease-linear`}
    >
      <CardHeader className="">
        <CardDescription className="flex items-center justify-between">
          <div className="flex items-center text-background gap-x-2">
            {titleIcons[titleIcon]}
            <span className="capitalize text-[12px]">{title}</span>
          </div>
          <Link
            to={""}
            className="text-background rounded-full px-4 py-1 bg-foreground/10"
          >
            Ver
          </Link>
        </CardDescription>

        <CardTitle className="capitalize text-[18px] text-background flex items-center gap-x-2">
          <span>{amount}</span>
          <span>{description}</span>
        </CardTitle>
      </CardHeader>

      <CardFooter>
        <p className="px-2 py-1 text-background bg-foreground/10 rounded-full flex items-center gap-x-2 text-[10px]">
          {icons[footerIcon]}
          <span>{footerAmount}</span>
          <span>{footerText}</span>
        </p>
      </CardFooter>
    </Card>
  )
}

export default HomeStatsCard
