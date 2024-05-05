import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import { ADMIN_DASHBOARD_NAV_LINKS } from "../utils/constants"
import { FiLogOut } from "react-icons/fi"
import { useAuthContext } from "../context/AuthContext"
import { LiaToggleOffSolid } from "react-icons/lia"
import { LiaToggleOnSolid } from "react-icons/lia"
import { Button } from "./ui/button"

const SidebarNavigation = () => {
  const { logout } = useAuthContext()

  const locationPath = useLocation()

  const handleLogout = () => logout()
  console.log(locationPath.pathname)

  const HOME_LINK_PATH = "/"
  const path =
    locationPath.pathname === "/" ? "Home" : locationPath.pathname.split("/")[1]

  return (
    <aside className="w-[170px] border-r-zinc-300 border-r items-center justify-center flex flex-col">
      <ul className="flex my-auto flex-col items-start justify-start px-3 gap-4">
        {ADMIN_DASHBOARD_NAV_LINKS.map((link, index) => (
          <Link
            key={index}
            to={link.link}
            className={`cursor-pointer gap-x-2 flex items-center text-[12px] hover:text-zinc-200 text-white p-2 w-full rounded-lg duration-300 transition-all ease-in-out ${
              path === link.name.split(" ").join("").toLowerCase()
                ? "bg-zinc-900"
                : "text-zinc-400"
            } `}
          >
            <span>{link.icon}</span>
            <span>{link.name}</span>
          </Link>
        ))}
      </ul>

      <Button
        variant={"destructive"}
        onClick={handleLogout}
        className="mb-4 rounded-lg w-[80%] "
      >
        <FiLogOut color="#fff" size={18} />
      </Button>
    </aside>
  )
}

export default SidebarNavigation
