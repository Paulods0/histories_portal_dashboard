import {
  EditScheduleFormSchemaType,
  editScheduleFormSchema,
} from "@/types/form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, UseFormReturn, useForm } from "react-hook-form"
import InputField from "./form-ui/input-field"
import FormButton from "./form-ui/form-button"
import { SchedulePost } from "@/types/data"
import SelectAuthorInput from "../add-post-components/select-author-input"
import { useState } from "react"
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
  post: SchedulePost
}

function EditSchedulePostForm({ post }: Props) {
  const [authorId, setAuthorId] = useState("")
  console.log(authorId)

  const methods: UseFormReturn<EditScheduleFormSchemaType> =
    useForm<EditScheduleFormSchemaType>({
      resolver: zodResolver(editScheduleFormSchema),
      defaultValues: {
        title: post.title,
        file: post.file,
      },
    })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  function handleSubmitForm(data: EditScheduleFormSchemaType) {
    console.log(data)
  }

  function handleDeletePost() {
    console.log("Removido")
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
        <img src="" alt="" />
        <InputField
          className="bg-foreground text-background"
          label="Título"
          {...register("title")}
        />
        <InputField
          className="bg-foreground file:text-background"
          label="Documento PDF"
          type="file"
          accept=".pdf"
          {...register("file")}
        />

        <SelectAuthorInput setAuthorId={setAuthorId} />

        <div className="mt-4 space-x-2">
          <FormButton
            text="Atualizar"
            isSubmitting={isSubmitting}
            buttonColor="#111111"
          />

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
        </div>
      </form>
    </FormProvider>
  )
}

export default EditSchedulePostForm
