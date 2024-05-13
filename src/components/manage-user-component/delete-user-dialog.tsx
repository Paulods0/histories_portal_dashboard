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
import { useState } from "react"

type Props = {
  user: User
}
const DeleteUserDialog = ({ user }: Props) => {
  const { mutate } = useDeleteUser()
  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteUser = async () => {
    setIsLoading(true)
    try {
      // if (user.image) {
      //   await deleteImageFromFirebase(user.image, "profile")
      // }

      mutate(user._id)
      setIsLoading(false)
      toast.success("Usuário removido com sucesso")
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
          <AlertDialogAction asChild>
            <Button
              disabled={isLoading}
              onClick={handleDeleteUser}
              variant={"destructive"}
            >
              {isLoading ? "Removendo..." : "Remover"}
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
