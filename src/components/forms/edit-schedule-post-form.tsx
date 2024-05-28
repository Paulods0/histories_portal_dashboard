import {
  EditScheduleFormSchemaType,
  editScheduleFormSchema,
} from "@/types/form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, UseFormReturn, useForm } from "react-hook-form"
import InputField from "./form-ui/input-field"
import FormButton from "./form-ui/form-button"
import { SchedulePost } from "@/types/data"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
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
import { useGetAllUsers } from "@/lib/react-query/queries"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useState } from "react"
import { useUpdateSchedulePost } from "@/lib/react-query/mutations"
import {
  deleteImageFromFirebase,
  uploadImageToFirebaseStorage,
} from "@/utils/helpers"
import { UpdateSchedulePost } from "@/types/update"
import { toast } from "react-toastify"

type Props = {
  post: SchedulePost
}

function EditSchedulePostForm({ post }: Props) {
  const { data: users } = useGetAllUsers()
  const [hasFile, setHasFile] = useState(false)
  const { mutate } = useUpdateSchedulePost()

  const methods: UseFormReturn<EditScheduleFormSchemaType> =
    useForm<EditScheduleFormSchemaType>({
      resolver: zodResolver(editScheduleFormSchema),
      defaultValues: {
        title: post.title,
        file: post.file,
        author: post.author._id!!,
      },
    })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = methods

  const handleSelectAuthor = (value: string) => {
    setValue("author", value)
  }

  async function handleSubmitForm(data: EditScheduleFormSchemaType) {
    try {
      if (data.file) {
        await deleteImageFromFirebase(post.file, "schedule-posts")

        const downloadURL = await uploadImageToFirebaseStorage(
          data.file!! as File,
          "schedule-posts"
        )
        const dataPost: UpdateSchedulePost = {
          author: data.author,
          file: downloadURL,
        }

        mutate({ id: post._id, data: dataPost })
        toast.success("Post atualizado")
      } else {
        mutate({ id: post._id, data: { ...data, file: post.file } })
        toast.success("Post atualizado")
      }
    } catch (error) {
      console.log(error)
      toast.error("Erro ao atualizar o post")
    }
  }

  function handleDeletePost() {
    console.log("Removido")
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
        <img src="" alt="" />
        <InputField label="Título" {...register("title")} />
        <InputField
          label="Documento PDF"
          type="file"
          accept=".pdf"
          {...register("file")}
        />

        {hasFile && (
          <button
            onClick={() => setHasFile(false)}
            type="button"
            className="text-red-700 transition-all duration-200 ease-in-out hover:text-red-900"
          >
            remover ficheiro
          </button>
        )}

        <Select
          defaultValue={post.author._id}
          onValueChange={handleSelectAuthor}
        >
          <SelectTrigger>
            <SelectValue placeholder="Autor" />
          </SelectTrigger>
          <SelectContent>
            {users?.map((user) => (
              <SelectItem key={user._id} value={user._id}>
                <div className="flex items-center gap-1">
                  <Avatar className="size-8">
                    <AvatarFallback>{user.firstname.charAt(0)}</AvatarFallback>
                    <AvatarImage src={user.image} />
                  </Avatar>
                  <span>{user.firstname}</span>
                  <span>{user.lastname}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="mt-4 space-x-2">
          <FormButton text="Atualizar" isSubmitting={isSubmitting} />

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
