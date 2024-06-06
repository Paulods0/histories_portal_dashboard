import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import StoreForm from "./store-form"
import { Button } from "../ui/button"
import { FaPlusCircle } from "react-icons/fa"

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

        <StoreForm />
      </DialogContent>
    </Dialog>
  )
}

export default AddProductButton
