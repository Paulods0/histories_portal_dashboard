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
import { Link } from "react-router-dom"
import { UserData } from "@/context/auth-context"

type Props = {
  userId: string | undefined
  user: UserData | undefined
  logout: () => void
}

const Menu = ({ logout, user, userId }: Props) => {
  return (
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
      
      <DropdownMenuContent className="p-4 text-foreground bg-background border-white/20 mr-4">
        <DropdownMenuLabel className="text-lg ">Menu</DropdownMenuLabel>
        <DropdownMenuLabel className="text-zinc-500 font-normal flex items-center gap-x-1">
          <span>{user?.firstname}</span>
          <span>{user?.lastname}</span>
        </DropdownMenuLabel>
        <DropdownMenuLabel className="text-zinc-500 font-normal">
          {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-600" />

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
          <Button onClick={logout} className="w-full" variant={"destructive"}>
            Sair
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Menu
