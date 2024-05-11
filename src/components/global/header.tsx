import { IoCalendarOutline } from "react-icons/io5"
import { formatDate } from "@/utils/helpers"
import { Link, useLocation } from "react-router-dom"
import { useAuthContext } from "@/context/auth-context"
import { ADMIN_DASHBOARD_NAV_LINKS } from "@/utils/constants"
import MobileNavbar from "./mobile-navbar"
import Menu from "./menu"

const Header = () => {
  const { logout, user, userId } = useAuthContext()
  const path = useLocation().pathname.split("/")[1]

  const date = new Date().toISOString()
  const reformatedDate = formatDate(date)

  return (
    <header className="w-full sticky top-0 bg-foreground border-b-zinc-800 border-b-[1px] z-50 h-[60px] px-2 pb-2 flex justify-between items-center">
      <section className="w-full flex items-center gap-x-12">
        <Link to="/">
          <img
            src="/logotipo-texto.png"
            className="w-[120px] h-[35px] object-contain"
            alt="logotipo-texto"
          />
        </Link>

        <ul className="hidden lg:flex items-center justify-center gap-x-4">
          {ADMIN_DASHBOARD_NAV_LINKS.map((link, index) => (
            <Link
              key={index}
              to={link.link}
              className={`cursor-pointer font-semibold gap-x-8 text-[12px] hover:text-zinc-200 text-white rounded-lg duration-300 transition-all ease-in-out ${
                path === link.name.split(" ").join("").toLowerCase()
                  ? "text-zinc-900"
                  : "text-zinc-400"
              } `}
            >
              <span>{link.name}</span>
            </Link>
          ))}
        </ul>

        <div className="hidden lg:flex justify-center items-center gap-x-2 ">
          <IoCalendarOutline size={18} />
          <span className="text-[14px]">{reformatedDate}</span>
        </div>
      </section>

      <div className="hidden lg:flex items-center gap-2">
        <div className="flex gap-x-1 text-[14px] font-semibold w-full">
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
