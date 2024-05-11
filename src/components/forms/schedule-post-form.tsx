import { useCreateSchedulePost } from "@/lib/react-query/mutations"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { ClipLoader } from "react-spinners"
import { uploadImageToFirebaseStorage } from "@/utils/helpers"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ScheduleFormSchemaType, scheduleFormSchema } from "@/types/form-schema"
import { useAuthContext } from "@/context/auth-context"
import { toast } from "react-toastify"
import { NewSchedulePost } from "@/types/create"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

type Props = {
  category: string
  authorId: string
}

const SchedulePostForm = ({ authorId, category }: Props) => {
  const navigate = useNavigate()
  const { userId } = useAuthContext()
  const { mutate } = useCreateSchedulePost()

  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit } = useForm<ScheduleFormSchemaType>({
    mode: "all",
    resolver: zodResolver(scheduleFormSchema),
  })

  const handleSubmitForm = async (data: ScheduleFormSchemaType) => {
    setIsLoading(true)
    try {
      if (!data.file || !data.title) {
        toast.error("Preencha todos os campos obrigatórios.")
        setIsLoading(false)
        return
      }
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
      setIsLoading(false)
      navigate("/posts")
      toast.success("Publicado com sucesso")
    } catch (error) {
      setIsLoading(false)
      console.log("Erro ao publicar")
      toast.error("Erro ao publicar")
    }
    console.log({ ...data, category, author_id: authorId ? authorId : userId })
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="h-auto space-y-3"
    >
      <div className="sticky top-0 w-full">
        <Button disabled={isLoading} type="submit" className="w-full z-20">
          {isLoading ? <ClipLoader size={14} /> : "Publicar"}
        </Button>
      </div>

      <Input
        className="file:text-white "
        placeholder="Título"
        type="text"
        {...register("title")}
      />

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
      </div>
    </form>
  )
}

export default SchedulePostForm
