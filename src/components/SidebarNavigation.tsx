import { Link, useLocation } from "react-router-dom"
import { ADMIN_DASHBOARD_NAV_LINKS } from "../constants"
import { FiLogOut } from "react-icons/fi"

const SidebarNavigation = () => {
  const HOME_LINK_PATH = "home"
  const path =
    useLocation().pathname.split("/")[1] === ""
      ? HOME_LINK_PATH
      : useLocation().pathname.split("/")[1]

  return (
    <aside className="rounded-[20px] w-[70px] ml-6 h-[550px] items-center justify-between shadow-2xl bg-[#ffffff] backdrop-blur-lg flex flex-col">
      <ul className="flex mt-12 flex-col  items-center justify-center gap-8">
        {ADMIN_DASHBOARD_NAV_LINKS.map((link, index) => (
          <Link
            key={index}
            to={link.link}
            className={`cursor-pointer  hover:text-purple-900/40 text-[14px] duration-300 transition-all ease-in-out ${
              path === link.name.split(" ").join("").toLowerCase()
                ? "text-[#1A101F]"
                : "text-[#9D9D9D]"
            } `}
          >
            <span>{link.icon}</span>
            {/* <span className="font-semibold">{link.name}</span> */}
          </Link>
        ))}
      </ul>

      <button className="h-10 cursor-pointer bg-[#1A101F] hover:scale-95 duration-300 transition-all ease-in-out flex items-center justify-center w-10 mb-10 rounded-full shadow-[1px_1px_10px_0px_#9D9D9D]">
        <FiLogOut color="#fff" size={16} />
      </button>
    </aside>
  )
}

export default SidebarNavigation
