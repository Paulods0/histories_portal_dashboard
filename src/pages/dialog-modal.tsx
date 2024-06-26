import LoaderSpinner from "@/components/global/loader-spinner"
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

type DialogModalProps = {
  id: string
  isDeleting: boolean
  handleDelete: (id: string) => Promise<void>
}

const DialogModal = ({ id, handleDelete, isDeleting }: DialogModalProps) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Tens a certeza que pretendes eliminar este post?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Ao eliminar o post não poderá reverter esta operação.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction asChild>
          <Button
            disabled={isDeleting}
            onClick={() => handleDelete(id!!)}
            variant={"destructive"}
          >
            {isDeleting ? <LoaderSpinner /> : "Eliminar"}
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export default DialogModal
