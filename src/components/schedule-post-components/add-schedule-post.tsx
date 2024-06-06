import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { FaPlusCircle } from "react-icons/fa"
import { zodResolver } from "@hookform/resolvers/zod"
import InputField from "../forms/form-ui/input-field"
import FormButton from "../forms/form-ui/form-button"
import { toast } from "react-toastify"
import { useAuthContext } from "@/context/auth-context"
import { uploadImageToFirebaseStorage } from "@/utils/helpers"
import { UseFormReturn, useForm, FormProvider } from "react-hook-form"
import { useGetAllUsers } from "@/lib/react-query/queries/user-queries"
import { ScheduleFormSchemaType, scheduleFormSchema } from "@/types/form-schema"
import { useCreateSchedulePost } from "@/lib/react-query/mutations/post-mutation"
import SelectAuthor from "./select-author"

function AddSchedulePost() {
  const { userId } = useAuthContext()
  const { data: users } = useGetAllUsers()
  const { mutate } = useCreateSchedulePost()

  const methods: UseFormReturn<ScheduleFormSchemaType> =
    useForm<ScheduleFormSchemaType>({
      resolver: zodResolver(scheduleFormSchema),
      defaultValues: { author: userId!! },
    })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = methods

  const handleSelectAuthor = (value: string) => {
    setValue("author", value ?? userId!!)
  }

  const handleSubmitForm = async (data: ScheduleFormSchemaType) => {
    try {
      const CATEGORY = "agenda ao"
      const pdfFile = await uploadImageToFirebaseStorage(
        data.file!!,
        "schedule-posts"
      )
      mutate({
        ...data,
        category: CATEGORY,
        file: pdfFile,
      })
      toast.success("Agenda adicionada")
    } catch (error) {
      console.log(error)
      toast.error("Falha ao adicionar agenda")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <FaPlusCircle />
          Adicionar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Agenda AO</DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="flex flex-col gap-4"
          >
            <InputField
              label="Título"
              {...register("title")}
              error={errors.title}
            />
            <InputField
              type="file"
              accept=".pdf"
              label="Documento PDF"
              {...register("file")}
              error={errors.file}
            />

            <SelectAuthor
              users={users}
              userId={userId}
              handleChange={handleSelectAuthor}
            />
            <FormButton text="Salvar" isSubmitting={isSubmitting} />
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}

export default AddSchedulePost
