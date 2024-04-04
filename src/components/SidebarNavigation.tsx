import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import { ADMIN_DASHBOARD_NAV_LINKS } from "../constants"
import { FiLogOut } from "react-icons/fi"
import { useAuthContext } from "../context/AuthContext"
import { LiaToggleOffSolid } from "react-icons/lia"
import { LiaToggleOnSolid } from "react-icons/lia"
import { Button } from "./ui/button"

const SidebarNavigation = () => {
  const { logout } = useAuthContext()

  const locationPath = useLocation()

  const handleLogout = () => logout()

  const HOME_LINK_PATH = "home"
  const path =
    locationPath.pathname.split("/")[1] === ""
      ? HOME_LINK_PATH
      : locationPath.pathname.split("/")[1]

  return (
    <aside className="w-[70px] h-full border-r-zinc-300 border-r items-center justify-between flex flex-col">
      <ul className="flex my-auto flex-col items-center justify-center gap-8">
        {ADMIN_DASHBOARD_NAV_LINKS.map((link, index) => (
          <Link
            key={index}
            to={link.link}
            className={`cursor-pointer hover:text-zinc-200 text-[14px] duration-300 transition-all ease-in-out ${
              path === link.name.split(" ").join("").toLowerCase()
                ? "text-zinc-900"
                : "text-zinc-400"
            } `}
          >
            <span>{link.icon}</span>
          </Link>
        ))}
      </ul>

      <Button
        variant={"destructive"}
        onClick={handleLogout}
        className="mb-4 rounded-md"
      >
        <FiLogOut color="#fff" size={18} />
      </Button>
    </aside>
  )
}

export default SidebarNavigation
