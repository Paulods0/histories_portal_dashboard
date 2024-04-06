import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { CiSettings, CiUser } from "react-icons/ci"
import { IoCalendarOutline } from "react-icons/io5"

import { formatDate } from "@/utils/helpers"
import { Link, useLocation } from "react-router-dom"
import { useAuthContext } from "@/context/AuthContext"

const Header = () => {
  const { logout, user, userId } = useAuthContext()
  const path = useLocation().pathname.split("/")[1]

  const date = new Date().toISOString()
  const reformatedDate = formatDate(date)

  return (
    <header className="w-full h-[60px] px-2 border-b pb-2 flex justify-between items-center">
      <Link to="">
        <img
          src="/logotipo-texto.png"
          className="w-[120px] h-[70px] object-contain"
          alt="logotipo-texto"
        />
      </Link>

      <div className="flex  justify-center items-center gap-x-2 ">
        <IoCalendarOutline size={18} />
        <span className="text-[14px]">{reformatedDate}</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex gap-x-1 text-[14px] font-semibold w-full">
          <span>{user?.firstname}</span>
          <span>{user?.lastname}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            {user?.image ? (
              <Avatar>
                <AvatarImage src={user.image} />
              </Avatar>
            ) : (
              <Avatar>
                <AvatarFallback>
                  {user?.firstname.charAt(0).toUpperCase()}
                  {user?.lastname.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-4 mr-4">
            <DropdownMenuLabel className="text-lg">Menu</DropdownMenuLabel>
            <DropdownMenuLabel className="text-zinc-500 font-normal flex items-center gap-x-1">
              <span>{user?.firstname}</span>
              <span>{user?.lastname}</span>
            </DropdownMenuLabel>
            <DropdownMenuLabel className="text-zinc-500 font-normal">
              {user?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link
                to={`profile/${userId!!}`}
                className="flex items-center gap-x-2"
              >
                <CiUser size={18} />
                Ver perfil
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link
                to={`profile/${userId!!}/settings/edit_profile`}
                className="flex items-center gap-x-2"
              >
                <CiSettings size={18} />
                Editar dados pessoais
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-x-2">
              <CiSettings size={18} />
              <Link
                to={`profile/${userId!!}/settings/security`}
                className="flex items-center gap-x-2"
              >
                Segurança
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="w-full mt-6">
              <Button
                onClick={logout}
                className="w-full"
                variant={"destructive"}
              >
                Sair
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Header
