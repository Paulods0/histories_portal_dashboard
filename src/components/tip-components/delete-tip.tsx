import { FC } from "react"
import {
  AlertDialogTitle,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "../ui/alert-dialog"
import { CiTrash } from "react-icons/ci"
import { Button } from "../ui/button"
import { toast } from "react-toastify"
import { useDeleteTip } from "@/lib/react-query/mutations"
import LoaderSpinner from "../global/loader-spinner"

type Props = {
  tipId: string
}

const DeleteTip: FC<Props> = ({ tipId }) => {
  const { mutate, isPending } = useDeleteTip(tipId)
  async function handleDeleteTip() {
    try {
      mutate()
      console.log(tipId)
      toast.success("Dica removida com sucesso")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="cursor-pointer text-red-700">
        <CiTrash />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">
            Tens a certeza que pretendes eliminar esta Dica?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação é irreversível, tens a certeza que pretendes contiunar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogCancel asChild>
          <Button variant="secondary">Cancelar</Button>
        </AlertDialogCancel>
        <AlertDialogAction asChild>
          <Button
            disabled={isPending}
            onClick={handleDeleteTip}
            variant="destructive"
          >
            {isPending ? <LoaderSpinner /> : "Remover"}
          </Button>
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteTip
