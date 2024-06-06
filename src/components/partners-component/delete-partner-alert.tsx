import { FC } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { CiTrash } from "react-icons/ci"

type Props = {
  id: number
}

const DeletePartnerAlert: FC<Props> = ({ id }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <CiTrash className="text-red-700 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">
            Tens a certeza que pretendes eliminar?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação é irreversível. Tens a certeza que pretende continuar?
            Todos os dados serão removidos
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="secondary">Cancelar</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive">Remover</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeletePartnerAlert
