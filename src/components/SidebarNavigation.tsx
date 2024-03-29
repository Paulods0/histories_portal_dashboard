import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import { ADMIN_DASHBOARD_NAV_LINKS } from "../constants"
import { FiLogOut } from "react-icons/fi"
import { useAuthContext } from "../context/AuthContext"
import { LiaToggleOffSolid } from "react-icons/lia"
import { LiaToggleOnSolid } from "react-icons/lia"

import { useTheme } from "../context/ThemeContext"

const SidebarNavigation = () => {
  const { logout } = useAuthContext()
  const { theme, toggleTheme } = useTheme()

  const locationPath = useLocation()

  const handleLogout = () => logout()

  const HOME_LINK_PATH = "home"
  const path =
    locationPath.pathname.split("/")[1] === ""
      ? HOME_LINK_PATH
      : locationPath.pathname.split("/")[1]

  return (
    <aside className="w-[70px] ml-4 rounded-md h-[calc(90vh-10px)] border-r-GRAY-LIGHTER border items-center justify-between bg-BLACK flex flex-col">
      <ul className="flex mt-12 flex-col  items-center justify-center gap-8">
        {ADMIN_DASHBOARD_NAV_LINKS.map((link, index) => (
          <Link
            key={index}
            to={link.link}
            className={`cursor-pointer  hover:text-white/40 text-[14px] duration-300 transition-all ease-in-out ${
              path === link.name.split(" ").join("").toLowerCase()
                ? "text-[#FFF]"
                : "text-GRAY-DARKER/50"
            } `}
          >
            <span>{link.icon}</span>
            {/* <span className="font-semibold">{link.name}</span> */}
          </Link>
        ))}
      </ul>

      <button className="" onClick={toggleTheme}>
        {theme === "light" ? (
          <LiaToggleOffSolid color="#FFF" />
        ) : (
          <LiaToggleOnSolid color="#FFF" />
        )}
      </button>

      <button
        onClick={handleLogout}
        className="h-10 cursor-pointer bg-RED-DARK hover:scale-95 duration-300 transition-all ease-in-out flex items-center justify-center w-10 mb-10 rounded-full "
      >
        <FiLogOut color="#fff" size={16} />
      </button>
    </aside>
  )
}

export default SidebarNavigation
