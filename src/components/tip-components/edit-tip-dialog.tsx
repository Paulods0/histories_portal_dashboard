import { Tip } from "@/api/tips"
import { FC } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import EditTipForm from "./edit-tip-form"
import { CiEdit } from "react-icons/ci"

type Props = {
  tip: Tip
}

const EditTipDialog: FC<Props> = ({ tip }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CiEdit />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Dica</DialogTitle>
        </DialogHeader>
        <EditTipForm tip={tip} />
      </DialogContent>
    </Dialog>
  )
}

export default EditTipDialog
