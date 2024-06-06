import { FC } from "react"
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

type Props = {
  handleDeletePost: () => void
}

const AlertDeleteSchedulePost: FC<Props> = ({ handleDeletePost }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>Remover</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-foreground text-background border-white/20">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem a certeza que pretende remover este post?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Esta açção não pode ser desfeita, tem a certeza que pretende
            continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant={"secondary"}>Cancelar</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button type="button" onClick={handleDeletePost}>
              Remover
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertDeleteSchedulePost
