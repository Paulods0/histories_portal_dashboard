import { Link } from "react-router-dom"
import HomeStatsContainer from "../components/Home_Components/HomeStatsContainer"
import PostsContainer from "../components/Home_Components/PostsContainer"
import HighlightedPost from "../components/Home_Components/HighlightedPost"
import { useAuthContext } from "../context/AuthContext"
import StoreTableData from "../components/Home_Components/StoreTableData"
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

import { CiSettings, CiUser, CiCalendar } from "react-icons/ci"
import { formatDate } from "@/utils/helpers"

const HomeDashboard = () => {
  const { logout, user, userId } = useAuthContext()

  const date = new Date().toISOString()
  const reformatedDate = formatDate(date)

  return (
    <main className="w-full px-5 rounded-lg h-full flex flex-col">
      {/**HEADER */}
      <header className="w-full px-2 flex justify-between items-center">
        <h1 className="text-[18px] font-semibold">
          Seja bem-vindo,{user?.firstname}
          Home
        </h1>
        <div className="flex items-center gap-x-2">
          <CiCalendar size={18} />
          <span className="text-[14px]">{reformatedDate}</span>
        </div>
        <div className="flex items-center gap-2">
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
              <DropdownMenuLabel className="text-lg">
                <Link to={`/profile/${userId!!}`}>Ver o meu perfil</Link>
              </DropdownMenuLabel>
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
                  to={`profile/${userId!!}/settings/edit_profile`}
                  className="flex items-center gap-x-2"
                >
                  <CiUser size={18} />
                  Editar dados pessoais
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-x-2">
                <CiSettings size={18} />
                <Link
                  to={`profile/${userId!!}/settings/security`}
                  className="flex items-center gap-x-2"
                >
                  <CiUser size={18} />
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
      {/** END HEADER */}

      <div className="gap-4 grid-cols-3 grid place-items-center w-full">
        {/** LEFT SIDE */}
        <section className="p-3 border gap-4 rounded-[10px] h-full w-full flex flex-col col-span-2">
          {/** UPPER SIDE */}
          <div>
            <HomeStatsContainer />
          </div>
          {/** END UPPER SIDE */}
          {/** BOTTOM SIDE */}
          <div className="relative h-full mt-2 w-full flex flex-col gap-2">
            <h1 className="text-zinc-900 font-bold text-[22px]">Posts</h1>

            <PostsContainer />
          </div>
          {/** END BOTTOM SIDE */}
        </section>
        {/** END LEFT SIDE */}

        {/** RIGHT SIDE */}
        <section className="w-full h-full flex flex-col">
          <div className="flex w-full items-center justify-between p-2">
            <h1 className="font-medium">Post em destaque</h1>
          </div>

          <HighlightedPost />

          <section className="w-full h-full flex flex-col gap-4">
            <div className="flex w-full items-center justify-between">
              <h1 className="font-semibold text-zinc-900 text-[18px]">
                Produtos na loja
              </h1>
              <Link to="loja" className="text-[14px] underline text-zinc-900">
                Ir à loja
              </Link>
            </div>
            <StoreTableData />
          </section>
        </section>
        {/** END RIGHT SIDE */}
      </div>
    </main>
  )
}

export default HomeDashboard
