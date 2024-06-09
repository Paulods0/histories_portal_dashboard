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
import { useDeletePartner } from "@/lib/react-query/mutations/partner-mutation"
import { deleteImageFromFirebase } from "@/utils/helpers"

type Props = {
  id: string
  image: string
}

const DeletePartnerAlert: FC<Props> = ({ id, image }) => {
  const { mutate } = useDeletePartner()

  async function deletePartner() {
    try {
      await deleteImageFromFirebase(image, "partners")
      mutate(id)
    } catch (error) {
      console.log(error)
    }
  }
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
            <Button onClick={deletePartner} variant="destructive">
              Remover
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeletePartnerAlert
