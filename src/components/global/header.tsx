import { Link, useLocation } from "react-router-dom"
import { useAuthContext } from "@/context/auth-context"
import { ADMIN_DASHBOARD_NAV_LINKS } from "@/utils/constants"
import MobileNavbar from "./mobile-navbar"
import Menu from "./menu"

import { MdOutlineLightMode } from "react-icons/md"
import { MdLightMode } from "react-icons/md"

import { useThemeContext } from "@/context/theme-context"

const Header = () => {
  const { logout, user, userId } = useAuthContext()
  const path = useLocation().pathname.split("/")[1]
  const { theme, toggleTheme } = useThemeContext()

  const handleChangeTheme = () => toggleTheme()

  return (
    <header className="w-full sticky top-0 bg-background border-b border-b-foreground/10 z-50 h-[60px] px-8 py-10 lg:px-2 lg:py-2 flex justify-between items-center">
      <Link to="/">
        <img
          src="/logotipo-texto.png"
          className="w-[120px] h-[35px] object-contain self-start"
          alt="logotipo-texto"
        />
      </Link>

      <ul className="hidden lg:flex items-center justify-center gap-x-4">
        {ADMIN_DASHBOARD_NAV_LINKS.map((link, index) => (
          <Link
            key={index}
            to={link.link}
            className={`cursor-pointer mr-4 uppercase font-bold gap-x-8 text-xs rounded-lg duration-300 transition-all ease-in-out ${
              path === link.name.split(" ").join("").toLowerCase()
                ? "text-zinc-900"
                : "text-zinc-400"
            } `}
          >
            <span>{link.name}</span>
          </Link>
        ))}
      </ul>

      <div className="hidden lg:flex items-center gap-2">
        <div
          onClick={handleChangeTheme}
          className="cursor-pointer text-xl text-foreground p-2 rounded-lg shadow-foreground/10 shadow"
        >
          {theme === "dark" ? <MdOutlineLightMode /> : <MdLightMode />}
        </div>

        <div className="flex gap-x-1 text-[14px] text-foreground pl-6 font-semibold w-full">
          <span>{user?.firstname}</span>
          <span>{user?.lastname}</span>
        </div>

        <Menu logout={logout} user={user} userId={userId} />
      </div>

      <div className="flex lg:hidden">
        <MobileNavbar user={user!!} />
      </div>
    </header>
  )
}

export default Header
