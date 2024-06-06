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
import { Button } from "../ui/button"
import { CiTrash } from "react-icons/ci"
import LoaderSpinner from "../global/loader-spinner"
import { useDeleteTip } from "@/lib/react-query/mutations/tip-mutation"

type Props = {
  tipId: string
}

const DeleteTip: FC<Props> = ({ tipId }) => {
  const { mutateAsync, isPending } = useDeleteTip(tipId)

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
            onClick={() => mutateAsync()}
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
