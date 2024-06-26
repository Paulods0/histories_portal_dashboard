import {
  EditScheduleFormSchemaType,
  editScheduleFormSchema,
} from "@/types/form-schema"
import { SchedulePost } from "@/types/data"
import { ChangeEvent, useState } from "react"
import FormButton from "./form-ui/form-button"
import InputField from "./form-ui/input-field"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, UseFormReturn, useForm } from "react-hook-form"
import { useGetAllUsers } from "@/lib/react-query/queries/user-queries"
import { useUpdateSchedulePost } from "@/lib/react-query/mutations/post-mutation"

import {
  deleteImageFromFirebase,
  uploadImageToFirebaseStorage,
} from "@/utils/helpers"

import { Input } from "../ui/input"
import { toast } from "react-toastify"
import { UpdateSchedulePost } from "@/types/update"
import AlertDeleteSchedulePost from "../schedule-post-components/alert-delete-schedule-post"
import SelectAuthor from "../schedule-post-components/select-author"

type Props = {
  post: SchedulePost
}

function EditSchedulePostForm({ post }: Props) {
  const { data: users } = useGetAllUsers()

  const { mutate } = useUpdateSchedulePost()
  const [newFile, setnewFile] = useState<string | null>(null)

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

        <SelectAuthor
          handleChange={handleSelectAuthor}
          userId={post?.author._id}
          users={users}
        />
        <div className="mt-4 space-x-2">
          <FormButton
            text="Atualizar"
            className="text-black"
            isSubmitting={isSubmitting}
          />

          <AlertDeleteSchedulePost postFile={post.file} postId={post._id} />
        </div>
      </form>
    </FormProvider>
  )
}

export default EditSchedulePostForm
