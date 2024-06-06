import { CiTrash } from "react-icons/ci"

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
} from "@/components/ui/alert-dialog"
import { useDeleteProduct } from "@/lib/react-query/mutations"
import { Product } from "@/types/data"
import { toast } from "react-toastify"
import { deleteImageFromFirebase } from "@/utils/helpers"
import { Button } from "../ui/button"

type Props = {
  product: Product
}

const DeleteProduct = ({ product }: Props) => {
  const { mutate } = useDeleteProduct()

  const handleDeleteProduct = async () => {
    try {
      await deleteImageFromFirebase(product.image, "products")
      mutate(product._id)
      toast.success("Produto removido com sucesso")
      console.log("Deletado!: " + product)
    } catch (error) {
      toast.error("Erro ao remover produto")
      console.error("Error: " + error)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <CiTrash size={24} color="#FF0000" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tens a certeza que queres eliminar este produto?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isto vai eliminar permanentemente
            este produto da loja.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="secondary">Cancelar</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild onClick={handleDeleteProduct}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteProduct
