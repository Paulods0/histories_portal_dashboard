import { FC } from "react"
import { Link } from "react-router-dom"
import { CiEdit } from "react-icons/ci"

import DeletePartnerAlert from "./delete-partner-alert"

type Props = {
  // partners: {
  //   _id: string
  //   title: string
  //   image: string
  //   content: string
  //   author: {
  //     _id: string
  //     firstname: string
  //     lastname: string
  //     image: string
  //   }
  // }
}

const PartnerCard: FC<Props> = () => {
  return (
    <div className="p-4 rounded-lg border w-full h-[250px] flex flex-col gap-2">
      <img src="" alt="imagem" className="w-full object-cover h-[120px]" />
      <div className="w-full border-t pt-2 flex flex-col gap-2">
        <h1>Lorem ipsum dolor sit.</h1>
        <p className="line-clamp-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima amet
          porro a molestias tempore eius modi repellat voluptatibus ipsam vero.
        </p>

        <div className="w-full justify-between items-center flex">
          <div className="flex items-center gap-1 text-xs">
            Autor: <span>Paulo</span> <span>Luguenda</span>
          </div>
          <div className="flex items-center gap-4 text-2xl">
            <Link to={"/"} className="flex items-center gap-4">
              <CiEdit />
            </Link>

            <DeletePartnerAlert id={1} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartnerCard
