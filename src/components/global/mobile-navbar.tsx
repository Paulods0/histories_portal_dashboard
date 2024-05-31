import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetFooter,
} from "../ui/sheet"
import { IoMenu } from "react-icons/io5"
import { UserData, useAuthContext } from "@/context/auth-context"
import { ADMIN_DASHBOARD_NAV_LINKS } from "@/utils/constants"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { LogOutIcon } from "lucide-react"

type Props = {
  user: UserData
}

const MobileNavbar = ({ user }: Props) => {
  const { logout } = useAuthContext()
  if (!user) {
    return
  }

  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <IoMenu size={40} />
      </SheetTrigger>

      <SheetContent className="bg-background space-y-6 border-white/20">
        <SheetHeader className="flex items-center">
          <Avatar className="size-20 text-foreground">
            <AvatarFallback>{user?.firstname.charAt(0)}</AvatarFallback>
            <AvatarImage src={user.image} />
          </Avatar>
          <div className="flex items-center gap-1 text-foreground">
            <span>{user.firstname}</span>
            <span>{user.lastname}</span>
          </div>
        </SheetHeader>

        <ul className="flex flex-col text-foreground gap-6">
          {ADMIN_DASHBOARD_NAV_LINKS.map((link, index) => (
            <li key={index}>
              <SheetClose asChild>
                <Link className="flex items-center gap-1" to={link.link}>
                  <span>{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              </SheetClose>
            </li>
          ))}
        </ul>

        <Button
          className="w-full space-x-4"
          variant="destructive"
          onClick={logout}
        >
          <p>Sair</p>
          <LogOutIcon size={18} />
        </Button>

        <SheetFooter>
          <img
            loading="lazy"
            src="logotipo-tradicional.png"
            className="size-36 self-center mt-4 object-cover"
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNavbar
