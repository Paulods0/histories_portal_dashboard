import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"
import {
  useDeletePostCategory,
  useDeleteProductCategory,
} from "@/lib/react-query/queries-and-mutations"
import { toast } from "react-toastify"

type Props = {
  id: string
  type: "post-category" | "product-category"
}

const DeleteCategoryDialog = ({ id, type }: Props) => {
  const { mutateAsync: deletePostCategory, isPending: isDeletingPostCategory } =
    useDeletePostCategory()
  const {
    mutateAsync: deleteProductCategory,
    isPending: isDeletingProductCategory,
  } = useDeleteProductCategory()

  const handleDeletePostCategory = () => {
    try {
      deletePostCategory(id)
    } catch (error) {
      toast.error("Erro ao apagar a categoria")
    }
  }

  const handleDeleteProductCategory = () => {
    try {
      deleteProductCategory(id)
    } catch (error) {
      toast.error("Erro ao apagar a categoria")
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"} className="text-xs">
          Apagar
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-foreground">
        <DialogTitle className="text-background">
          Tem a certeza que pretende apagar?
        </DialogTitle>
        <DialogDescription>Esta ação é irreversível.</DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"} className="text-xs">
              Cancelar
            </Button>
          </DialogClose>

          <Button
            disabled={isDeletingPostCategory || isDeletingProductCategory}
            onClick={
              type === "post-category"
                ? handleDeletePostCategory
                : handleDeleteProductCategory
            }
            variant={"destructive"}
            className="text-xs"
          >
            {isDeletingPostCategory || isDeletingProductCategory
              ? "Eliminando..."
              : " Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteCategoryDialog
