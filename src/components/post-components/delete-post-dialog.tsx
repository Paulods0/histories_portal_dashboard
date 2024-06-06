import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Post } from "@/types/data"
import { Button } from "../ui/button"
import { toast } from "react-toastify"
import { CiTrash } from "react-icons/ci"
import LoaderSpinner from "../global/loader-spinner"
import { deleteImageFromFirebase } from "@/utils/helpers"
import { useDeletePost } from "@/lib/react-query/mutations/post-mutation"

type Props = {
  post: Post
}

const DeletePostDialog = ({ post }: Props) => {
  const { mutateAsync, isPending } = useDeletePost()

  const handleDeletePost = () => {
    try {
      deleteImageFromFirebase(post.mainImage, "posts")
      mutateAsync(post._id)
      toast.success("Post eliminado com sucesso")
    } catch (error) {
      console.log(error)
      toast.error("Erro ao deletar o post, tente novamente")
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span className="cursor-pointer text-red-600">
          <CiTrash size={22} />
        </span>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-foreground border-white/20">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Tem a certeza que pretende eliminar esta publicação?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação é irreversível, os dados serão removidos do banco de
            dados.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex items-center gap-2">
          <AlertDialogCancel className="text-foreground">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={handleDeletePost}
              disabled={isPending}
              variant={"destructive"}
            >
              {isPending ? <LoaderSpinner /> : "Eliminar"}
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeletePostDialog
