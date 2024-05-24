import { FaPlusCircle } from "react-icons/fa"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { ScheduleFormSchemaType, scheduleFormSchema } from "@/types/form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { UseFormReturn, useForm, FormProvider } from "react-hook-form"
import InputField from "../forms/form-ui/input-field"
import FormButton from "../forms/form-ui/form-button"
import { useCreateSchedulePost } from "@/lib/react-query/mutations"
import { toast } from "react-toastify"
import { uploadImageToFirebaseStorage } from "@/utils/helpers"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useGetAllUsers } from "@/lib/react-query/queries"
import { useAuthContext } from "@/context/auth-context"

function AddSchedulePost() {
  const { userId } = useAuthContext()
  const { mutate } = useCreateSchedulePost()

  const { data: users } = useGetAllUsers()

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
            <Select defaultValue={userId!!} onValueChange={handleSelectAuthor}>
              <SelectTrigger>
                <SelectValue placeholder="Autor" />
              </SelectTrigger>
              <SelectContent>
                {users?.map((user) => (
                  <SelectItem key={user._id} value={user._id}>
                    <div className="flex items-center gap-1">
                      <Avatar>
                        <AvatarFallback>
                          {user.firstname.charAt(0)}
                        </AvatarFallback>
                        <AvatarImage src={user.image} />
                      </Avatar>
                      <span>{user.firstname}</span>
                      <span>{user.lastname}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormButton text="Salvar" isSubmitting={isSubmitting} />
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}

export default AddSchedulePost
