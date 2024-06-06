import { useState } from "react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { User } from "@/types/data"
import { Button } from "../ui/button"
  import { toast } from "react-toastify"
import { deleteImageFromFirebase } from "@/utils/helpers"
import { useDeleteUser } from "@/lib/react-query/mutations/user-mutation"

type Props = {
  user: User
}
const DeleteUserDialog = ({ user }: Props) => {
  const { mutate } = useDeleteUser()
  const [isLoading, setIsLoading] = useState(false)

  async function handleDeleteUser() {
    try {
      setIsLoading(true)
      if (user.image) {
        await deleteImageFromFirebase(user.image!!, "profile")
      }
      mutate(user._id)
      toast.success("Usuário removido com sucesso")
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      toast.error("Erro ao remover usuário, por favor tente novamente")
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={"destructive"}>Remover</Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-foreground">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Tens a certeza que pretendes remover este usuário?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação é irreversível.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            type="button"
            onClick={handleDeleteUser}
            disabled={isLoading}
            variant={"destructive"}
          >
            {isLoading ? "Removendo..." : "Remover"}
          </Button>

          <AlertDialogCancel asChild>
            <Button variant={"secondary"}>Cancelar</Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteUserDialog
