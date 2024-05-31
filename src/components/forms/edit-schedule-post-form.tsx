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
import { ChangeEvent, useState } from "react"
import { useUpdateSchedulePost } from "@/lib/react-query/mutations"
import {
  deleteImageFromFirebase,
  uploadImageToFirebaseStorage,
} from "@/utils/helpers"
import { UpdateSchedulePost } from "@/types/update"
import { toast } from "react-toastify"
import { Input } from "../ui/input"

type Props = {
  post: SchedulePost
}

function EditSchedulePostForm({ post }: Props) {
  const { data: users } = useGetAllUsers()
  const [newFile, setnewFile] = useState<string | null>(null)
  const { mutate } = useUpdateSchedulePost()

  const methods: UseFormReturn<EditScheduleFormSchemaType> =
    useForm<EditScheduleFormSchemaType>({
      resolver: zodResolver(editScheduleFormSchema),
      defaultValues: {
        title: post.title,
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

  function handleChangeFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0]
      const fileURL = URL.createObjectURL(file)
      setnewFile(fileURL)
      setValue("file", file)
    }
  }

  async function handleSubmitForm(data: EditScheduleFormSchemaType) {
    try {
      let updatedSchedulePost: UpdateSchedulePost

      if (newFile) {
        await deleteImageFromFirebase(post.file, "schedule-posts")
        const fileURL = await uploadImageToFirebaseStorage(
          data.file!!,
          "schedule-posts"
        )
        updatedSchedulePost = {
          id: post._id,
          file: fileURL,
          title: data.title,
          author: data.author ?? post.author._id,
        }
        mutate(updatedSchedulePost)
        toast.success("Post atualizado")
      } else {
        updatedSchedulePost = {
          id: post._id,
          file: post.file,
          title: data.title,
          author: data.author ?? post.author._id,
        }

        mutate(updatedSchedulePost)
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
        <InputField label="Título" {...register("title")} />

        <div className="w-full flex flex-col items-end gap-2">
          <div className="w-full flex items-end justify-between">
            {newFile && (
              <a href={newFile} target="_blank">
                <img
                  src="/pdf-image.png"
                  alt="pdf-icon"
                  className="w-14 h-20 object-cover"
                />
              </a>
            )}
            <button
              type="button"
              disabled={newFile === null}
              onClick={() => setnewFile(null)}
              className="bg-red-700 disabled:bg-zinc-400 text-white py-2 px-3 rounded-lg capitalize"
            >
              remover ficheiro
            </button>
          </div>
          <Input
            type="file"
            accept=".pdf"
            onChange={handleChangeFile}
            className="text-foreground"
          />
        </div>

        <Select
          defaultValue={post?.author._id}
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
          <FormButton
            text="Atualizar"
            className="text-black"
            isSubmitting={isSubmitting}
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
