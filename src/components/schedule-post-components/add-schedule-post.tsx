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

type Props = {}

function AddSchedulePost({}: Props) {
  const methods: UseFormReturn<ScheduleFormSchemaType> =
    useForm<ScheduleFormSchemaType>({
      resolver: zodResolver(scheduleFormSchema),
    })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods

  const handleSubmitForm = (data: ScheduleFormSchemaType) => {
    console.log(data)
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
              className="bg-foreground text-background"
              label="Título"
              {...register("title")}
              error={errors.title}
            />
            <InputField
              className="bg-foreground file:text-background"
              type="file"
              accept=".pdf"
              label="Documento PDF"
              {...register("file")}
              error={errors.file}
            />

            <FormButton text="Salvar" isSubmitting={isSubmitting} />
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}

export default AddSchedulePost
