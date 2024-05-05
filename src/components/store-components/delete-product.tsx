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

type Props = {
  productId: string
}

const DeleteProduct = ({ productId }: Props) => {
  // const {} = useDeleteProduct()
  const handleDeleteProduct = () => {}

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
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => {}}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteProduct
