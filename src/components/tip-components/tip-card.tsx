import { FC } from "react"
import { Tip } from "@/api/tips"
import DeleteTip from "./delete-tip"
import EditTipDialog from "./edit-tip-dialog"

type Props = {
  tip: Tip
}

const TipCard: FC<Props> = ({ tip }) => {
  return (
    <div className="p-4 border rounded-md gap-2 flex flex-col">
      <img src={tip.image} className="w-full h-[250px] object-cover" alt="" />
      <div className="border-t w-full flex flex-col gap-2">
        <h1 className="text-xl  font-semibold">{tip.title}</h1>
        <p dangerouslySetInnerHTML={{ __html: tip.content }} />
        <div className="w-full flex justify-end gap-2 text-2xl">
          <EditTipDialog tip={tip} />
          <DeleteTip tipId={tip._id} />
        </div>
      </div>
    </div>
  )
}

export default TipCard
