import { FC } from "react"
import { Link } from "react-router-dom"
import { CiEdit } from "react-icons/ci"

import DeletePartnerAlert from "./delete-partner-alert"
import { PartnerData } from "@/api/partner"

type Props = {
  partner: PartnerData
}

const PartnerCard: FC<Props> = ({ partner }) => {
  return (
    <div className="p-4 rounded-lg border w-full h-[250px] flex flex-col gap-2">
      <img
        src={partner.image}
        alt="imagem"
        className="w-full object-cover h-[120px]"
      />
      <div className="w-full border-t pt-2 flex flex-col gap-2">
        <h1>{partner.title}</h1>
        <p
          className="line-clamp-1"
          dangerouslySetInnerHTML={{ __html: partner.content }}
        />

        <div className="w-full justify-between items-center flex">
          <div className="flex items-center gap-1 text-xs">
            Autor: <span>{partner.author.firstname}</span>{" "}
            <span>{partner.author.lastname}</span>
          </div>
          <div className="flex items-center gap-4 text-2xl">
            <Link
              to={`/parceiros/${partner._id}`}
              className="flex items-center gap-4"
            >
              <CiEdit />
            </Link>

            <DeletePartnerAlert image={partner.image} id={partner._id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartnerCard
