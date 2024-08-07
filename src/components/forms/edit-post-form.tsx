import { ChangeEvent, useState } from "react"

import {
  deleteImageFromFirebase,
  uploadImageToFirebaseStorage,
} from "@/utils/helpers"
import { Post } from "@/types/data"
import { toast } from "react-toastify"
import { UpdatePost } from "@/types/update"
import FormButton from "./form-ui/form-button"
import InputField from "./form-ui/input-field"
import { useNavigate } from "react-router-dom"
import InputCheckbox from "./form-ui/input-checkbox"
import LoaderSpinner from "../global/loader-spinner"
import { zodResolver } from "@hookform/resolvers/zod"
import TextAreaField from "./form-ui/text-area-field"
import { FormProvider, UseFormReturn, useForm } from "react-hook-form"
import { useUpdatePost } from "@/lib/react-query/mutations/post-mutation"
import { EditPostFormSchemaType, editPostFormSchema } from "@/types/form-schema"

type Props = {
  authorId: string
  post: Post | undefined
  category: string
  content: string
}

const EditPostForm = ({ authorId, post, content, category }: Props) => {
  const { mutate } = useUpdatePost()
  const navigate = useNavigate()
  const [imageToShow, setImageToShow] = useState<string | null>(null)

  if (!post) {
    return <LoaderSpinner />
  }

  const methods: UseFormReturn<EditPostFormSchemaType> =
    useForm<EditPostFormSchemaType>({
      resolver: zodResolver(editPostFormSchema),
      defaultValues: {
        title: post?.title,
        image: post!!.mainImage,
        category: post?.category,
        highlighted: post?.highlighted,
        author_notes: post?.author_notes,
        tags: post?.tag ? post.tag.toString() : "",
        date: post.date.split("/").reverse().join("-"),
      },
    })

  const {
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting },
  } = methods

  setValue("category", category)

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0]
      const imageURL = URL.createObjectURL(file)
      setImageToShow(imageURL)
    }
  }

  function handleDate(e: ChangeEvent<HTMLInputElement>) {
    setValue("date", e.target.value)
  }

  function handleRemoveImage() {
    setImageToShow(null)
    setValue("image", post!!.mainImage)
  }

  const handleSubmitForm = async (data: EditPostFormSchemaType) => {
    try {
      let payload: UpdatePost
      if (imageToShow) {
        await deleteImageFromFirebase(post?.mainImage!!, "posts")

        const imageURL = await uploadImageToFirebaseStorage(
          data.image as File,
          "posts"
        )

        payload = {
          tag: data.tags,
          date: data.date,
          author: authorId,
          content: content,
          title: data.title,
          mainImage: imageURL,
          category: data.category,
          highlighted: data.highlighted,
          author_notes: data.author_notes,
        }
      } else {
        payload = {
          tag: data.tags,
          date: data.date,
          content: content,
          author: authorId,
          title: data.title,
          category: data.category,
          mainImage: post!!.mainImage,
          highlighted: data.highlighted,
          author_notes: data.author_notes,
        }
      }

      mutate({ id: post!!._id, data: payload })
      toast.success("Atualizado com sucesso")
      navigate("/posts")
    } catch (error) {
      toast.error("Erro ao publicar o post")
      console.log(error)
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-3 w-full"
        >
          {imageToShow ? (
            <div className="flex flex-col items-center justify-center">
              <img
                src={imageToShow}
                className="w-full h-32 object-contain"
                loading="lazy"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="text-red-700 hover:text-red-900 ease-in-out transition-all duration-200"
              >
                remover imagem
              </button>
            </div>
          ) : (
            <img
              src={post!!.mainImage}
              className="w-full h-32 object-contain"
              loading="lazy"
            />
          )}

          <InputField
            label="Imagem"
            type="file"
            accept=".jpg,.png,.jpeg"
            {...register("image")}
            onChange={handleImage}
            className="file:text-white"
          />

          <FormButton isSubmitting={isSubmitting} text="Atualizar" />

          <InputField label="Título" {...register("title")} />

          <InputField label="Tags (opcional)" {...register("tags")} />

          <InputCheckbox label="Destacar" {...register("highlighted")} />

          <input
            type="date"
            {...register("date")}
            onChange={handleDate}
            className="bg-transparent border border-white/25 p-2 rounded-md calendar-input"
          />

          <TextAreaField
            label="Notas do autor (opcional)"
            {...register("author_notes")}
          />
        </form>
      </FormProvider>
    </>
  )
}

export default EditPostForm
