import {
  BiUser,
  BiPlus,
  BiHomeAlt2,
  BiStore,
  BiSolidGrid,
  BiSolidFile,
} from "react-icons/bi"

export const ADMIN_DASHBOARD_NAV_LINKS = [
  {
    name: "Home",
    icon: <BiHomeAlt2 size={24} />,
    link: "/",
  },
  {
    name: "Novo post",
    icon: <BiPlus size={20} />,
    link: "/novopost",
  },
  {
    name: "Posts",
    icon: <BiSolidFile size={20} />,
    link: "/posts",
  },
  {
    name: "Loja",
    icon: <BiStore size={20} />,
    link: "/loja",
  },
  // {
  //   name: "Ads",
  //   icon: <SiGoogleanalytics size={20} />,
  //   link: "/ads",
  // },
  // {
  //   name: "Categorias",
  //   icon: <BiSolidGrid size={20} />,
  //   link: "/categorias",
  // },
  {
    name: "Usuários",
    icon: <BiUser size={20} />,
    link: "/usuarios",
  },
]

export const STORE_PRODUCT_HEADERS = [
  "Imagem",
  "Nome",
  "Categoria",
  "Preço",
  "Quantidade",
  "Ações",
]

export const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // to
  ["blockquote"],
  ["link", "image", "video"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  // [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
]

export const CLASSIFIED_FILTERS = [
  {
    id: 1,
    name: "À venda",
    value: "sell",
  },
  {
    id: 2,
    name: "Comprar",
    value: "buy",
  },
  {
    id: 3,
    name: "Activo",
    value: "active",
  },
  {
    id: 4,
    name: "Suspenso",
    value: "suspended",
  },
  {
    id: 5,
    name: "Inativo",
    value: "inactive",
  },
]

export const CATEGORIES = [
  "reviews",
  "jornal overland",
  "histórias",
  "passeios",
  "agenda ao",
  "classificados",
  "overland experience",
]

export const CATEGORIES_SLUG = [
  {
    label: "reviews",
    slug: "reviews",
  },
  {
    label: "jornal overland",
    slug: "jornal-overland",
  },
  {
    label: "histórias",
    slug: "histórias",
  },
  {
    label: "passeios",
    slug: "passeios",
  },
  {
    label: "agenda ao",
    slug: "agenda-ao",
  },
  {
    label: "classificados",
    slug: "classificados",
  },
  {
    label: "overland experience",
    slug: "overland-experience",
  },
]
export const PRODUCT_CATEGORIES = [
  {
    label: "merchandising",
    slug: "merchandising",
  },
  {
    label: "camping gear",
    slug: "camping-gear",
  },
  {
    label: "car gear",
    slug: "car-gear",
  },
  {
    label: "vestuário",
    slug: "vestuário",
  },
  {
    label: "cursos",
    slug: "cursos",
  },
]
