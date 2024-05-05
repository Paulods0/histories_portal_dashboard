import { CiCirclePlus } from "react-icons/ci"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import UserForm from "./user-form"

const AddUserDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit self-end flex items-center gap-x-2">
          <CiCirclePlus size={20} />
          Adicionar
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-foreground">
        <UserForm />
      </DialogContent>
    </Dialog>
  )
}

export default AddUserDialog
