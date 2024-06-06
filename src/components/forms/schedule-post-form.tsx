import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import InputField from "./form-ui/input-field"
import FormButton from "./form-ui/form-button"
import { NewSchedulePost } from "@/types/create"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthContext } from "@/context/auth-context"
import { uploadImageToFirebaseStorage } from "@/utils/helpers"
import { FormProvider, UseFormReturn, useForm } from "react-hook-form"
import { ScheduleFormSchemaType, scheduleFormSchema } from "@/types/form-schema"
import { useCreateSchedulePost } from "@/lib/react-query/mutations/post-mutation"

type Props = {
  category: string
  authorId: string
}

const SchedulePostForm = ({ authorId, category }: Props) => {
  const navigate = useNavigate()
  const { userId } = useAuthContext()
  const { mutate } = useCreateSchedulePost()

  const methods: UseFormReturn<ScheduleFormSchemaType> =
    useForm<ScheduleFormSchemaType>({
      mode: "all",
      resolver: zodResolver(scheduleFormSchema),
    })
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods

  const handleSubmitForm = async (data: ScheduleFormSchemaType) => {
    try {
      const file = await uploadImageToFirebaseStorage(
        data.file!!,
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
      navigate("/posts")
    } catch (error) {
      console.log("Erro ao publicar")
      toast.error("Erro ao publicar")
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="h-auto space-y-3"
      >
        <InputField
          label="Título"
          {...register("title")}
          error={errors.title}
        />

        <InputField
          className="file:text-white"
          type="file"
          accept=".pdf"
          label="Documento PDF"
          {...register("file")}
          error={errors.file}
        />

        <FormButton isSubmitting={isSubmitting} text="Publicar" />
      </form>
    </FormProvider>
  )
}

export default SchedulePostForm
