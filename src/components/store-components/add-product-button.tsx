import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaPlusCircle } from "react-icons/fa"
import { Button } from "../ui/button"

const AddProductButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <FaPlusCircle className="w-3 h-3 mr-3" />
          Novo produto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Produto</DialogTitle>
          <DialogDescription>Adicionar um produto no sistema</DialogDescription>
        </DialogHeader>

        {/* <StoreForm categories={categories} /> */}
      </DialogContent>
    </Dialog>
  )
}

export default AddProductButton
