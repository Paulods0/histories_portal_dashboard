import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"

const EditCategoryDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"} className="text-xs">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-foreground">
        <DialogTitle className="text-background">
          Editar o categoria
        </DialogTitle>
        <div className="w-full">
          <input
            type="text"
            className="bg-transparent w-full border rounded-md outline-none p-2 "
            value={""}
            onChange={() => {}}
          />
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant={"default"}>Cancelar</Button>
          </DialogClose>
          <Button variant={"outline"}>Atualizar alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditCategoryDialog
