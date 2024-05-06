import { toast } from "react-toastify"
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
import { User } from "@/types/data"
import { deleteImageFromFirebase } from "@/utils/helpers"
import { useDeleteUser } from "@/lib/react-query/mutations"

type Props = {
  user: User
}
const DeleteUserDialog = ({ user }: Props) => {
  const { mutate, isPending } = useDeleteUser()

  const handleDeleteUser = async () => {
    try {
      if (user.image) {
        await deleteImageFromFirebase(user.image, "profile")
      }

      mutate(user._id)
      toast.success("Usuário removido com sucesso")
    } catch (error) {
      console.log(error)
      toast.error("Erro ao remover usuário, por favor tente novamente")
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
          <AlertDialogAction asChild>
            <Button
              disabled={isPending}
              onClick={handleDeleteUser}
              variant={"destructive"}
            >
              {isPending ? "Removendo..." : "Remover"}
            </Button>
          </AlertDialogAction>
          <AlertDialogCancel asChild>
            <Button variant={"outline"}>Cancelar</Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteUserDialog
