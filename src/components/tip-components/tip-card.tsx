import { FC } from "react"
import { Tip } from "@/api/tips"
import DeleteTip from "./delete-tip"
import { Link } from "react-router-dom"
import { CiEdit } from "react-icons/ci"

type Props = {
  tip: Tip
}

const TipCard: FC<Props> = ({ tip }) => {
  return (
    <div className="p-4 border w-full h-fit rounded-md gap-2 flex flex-col">
      <img src={tip.image} className="w-full h-[200px] object-cover" alt="" />

      <div className="border-t w-full mt-2 pt-2 flex flex-col gap-2">
        <h1 className="text-xl  font-semibold">{tip.title}</h1>
        <p
          className="line-clamp-1"
          dangerouslySetInnerHTML={{ __html: tip.content }}
        />
        <div className="w-full flex justify-between gap-4 text-2xl">
          <div className="text-xs text-neutral-500 flex items-center gap-1">
            Author:
            <p>{tip.author.firstname} </p>
            <p>{tip.author.lastname}</p>
          </div>
          <div className="flex gap-2 items-center">
            <Link to={`/dicas/${tip._id}`} className="text-2xl ">
              <CiEdit />
            </Link>
            <DeleteTip tipId={tip._id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TipCard
