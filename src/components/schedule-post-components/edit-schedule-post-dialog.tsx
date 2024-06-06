import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { SchedulePost } from "@/types/data"
import EditSchedulePostForm from "../forms/edit-schedule-post-form"

type Props = {
  post: SchedulePost
}

const EditSchedulePostDialog = ({ post }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Editar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar o post da Agenda AO</DialogTitle>
        </DialogHeader>
        <EditSchedulePostForm post={post} />
      </DialogContent>
    </Dialog>
  )
}

export default EditSchedulePostDialog
