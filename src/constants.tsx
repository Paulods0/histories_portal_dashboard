import { HiOutlineHome } from "react-icons/hi"
import { FiEdit2 } from "react-icons/fi"
import { ImFilesEmpty } from "react-icons/im"
import { MdOutlineStorefront } from "react-icons/md"
import { SiGoogleanalytics } from "react-icons/si"
import { BiCategory } from "react-icons/bi"
import { FaUserPlus } from "react-icons/fa"

export const ADMIN_DASHBOARD_NAV_LINKS = [
  {
    name: "Home",
    icon: <HiOutlineHome size={24} />,
    link: "/",
  },
  {
    name: "Novo post",
    icon: <FiEdit2 size={20} />,
    link: "/novopost",
  },
  {
    name: "Posts",
    icon: <ImFilesEmpty size={20} />,
    link: "/posts",
  },
  {
    name: "Loja",
    icon: <MdOutlineStorefront size={20} />,
    link: "/loja",
  },
  {
    name: "Ads",
    icon: <SiGoogleanalytics size={20} />,
    link: "/ads",
  },
  {
    name: "Categorias",
    icon: <BiCategory size={20} />,
    link: "/categorias",
  },
  {
    name: "Adicionar gestor",
    icon: <FaUserPlus size={20} />,
    link: "/adicionargestor",
  },
]
