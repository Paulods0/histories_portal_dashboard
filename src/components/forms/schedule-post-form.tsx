import { useCreateSchedulePost } from "@/lib/react-query/mutations"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { ClipLoader } from "react-spinners"
import { uploadImageToFirebaseStorage } from "@/utils/helpers"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ScheduleFormSchemaType, scheduleFormSchema } from "@/types/schema"
import { useAuthContext } from "@/context/AuthContext"
import { toast } from "react-toastify"
import { NewSchedulePost } from "@/types/data"

type Props = {
  category: string
  authorId: string
}

const SchedulePostForm = ({ authorId, category }: Props) => {
  const { userId } = useAuthContext()
  const { mutate, isPending } = useCreateSchedulePost()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleFormSchemaType>({
    mode: "all",
    resolver: zodResolver(scheduleFormSchema),
  })

  const handleSubmitForm = async (data: ScheduleFormSchemaType) => {
    try {
      const file = await uploadImageToFirebaseStorage(
        data.file[0],
        "schedule-posts"
      )
      const fileData: NewSchedulePost = {
        title: data.title,
        author: authorId ?? userId!!,
        category: category,
        file: file,
      }
      mutate(fileData)
      toast.success("Publicado com sucesso")
    } catch (error) {
      console.log("Erro ao publicar")
      toast.error("Erro ao publicar")
    }
    console.log({ ...data, category, author_id: authorId ? authorId : userId })
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-3">
      <div>
        <Label htmlFor="doc" className="text-[12px]">
          Título
        </Label>
        <Input
          className="file:text-white "
          id="title"
          type="text"
          {...register("title")}
        />
        {errors.title && (
          <span className="text-xs text-red-600">{errors.title.message}</span>
        )}
      </div>
      <div>
        <Label htmlFor="doc" className="text-[12px]">
          Documento PDF
        </Label>
        <Input
          className="file:text-white "
          id="doc"
          type="file"
          {...register("file")}
          accept="application/pdf"
        />
        {errors.file && (
          <span className="text-xs text-red-600">{errors.file.message}</span>
        )}
      </div>

      <Button disabled={isPending} type="submit">
        {isPending ? <ClipLoader size={14} /> : "Publicar"}
      </Button>
    </form>
  )
}

export default SchedulePostForm
