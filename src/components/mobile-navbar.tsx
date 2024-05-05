import { User } from "@/types/data"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetFooter,
} from "./ui/sheet"
import { IoMenu } from "react-icons/io5"
import { UserData } from "@/context/AuthContext"
import { ADMIN_DASHBOARD_NAV_LINKS } from "@/utils/constants"
import { Link } from "react-router-dom"

type Props = {
  user: UserData
}

const MobileNavbar = ({ user }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <>
          <IoMenu size={32} />
        </>
      </SheetTrigger>

      <SheetContent className="bg-foreground space-y-6 text-background border-white/20">
        <SheetHeader className="flex items-center">
          <Avatar>
            <AvatarFallback>
              <span>{user.firstname[0]}</span>
              <span>{user.lastname[0]}</span>
            </AvatarFallback>
            <AvatarImage src={user.image} />
          </Avatar>
          <div className="flex items-center gap-1 text-background">
            <span>{user.firstname}</span>
            <span>{user.lastname}</span>
          </div>
        </SheetHeader>

        <ul className="flex flex-col  gap-6">
          {ADMIN_DASHBOARD_NAV_LINKS.map((link, index) => (
            <li key={index}>
              <SheetClose asChild>
                <Link
                  className="flex items-center gap-1 text-background"
                  to={link.link}
                >
                  <span>{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              </SheetClose>
            </li>
          ))}
        </ul>
        <SheetFooter>
          <img
            src="logotipo-texto.png"
            className="w-full h-16 self-center mt-4 object-contain"
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNavbar
