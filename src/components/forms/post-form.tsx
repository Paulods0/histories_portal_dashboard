import { FormProvider, UseFormReturn, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PostFormSchemaType, postFormSchema } from "@/types/form-schema"
import { Button } from "../ui/button"
import InputField from "./form-ui/input-field"
import InputCheckbox from "./form-ui/input-checkbox"

import TextAreaField from "./form-ui/text-area-field"
import { useAuthContext } from "@/context/auth-context"

import { NewPost } from "@/types/create"
import { uploadImageToFirebaseStorage } from "@/utils/helpers"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useCreatePost } from "@/lib/react-query/mutations"
import { ChangeEvent, useState } from "react"
import FormButton from "./form-ui/form-button"

type Props = {
  content: string
  category: string
  authorId: string
}

const PostForm = ({ content, category, authorId }: Props) => {
  const navigate = useNavigate()
  const { mutate } = useCreatePost()

  const { userId } = useAuthContext()
  const [imageToShow, setImageToShow] = useState<string | null>(null)

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const imageURL = URL.createObjectURL(file)
      setImageToShow(imageURL)
    }
  }

  const postFormProvider: UseFormReturn<PostFormSchemaType> =
    useForm<PostFormSchemaType>({
      resolver: zodResolver(postFormSchema),
      mode: "all",
    })

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = postFormProvider

  setValue("content", content)
  setValue("category", category)

  const handleSubmitForm = async (data: PostFormSchemaType) => {
    try {
      const imageURL = await uploadImageToFirebaseStorage(
        data.image as File,
        "posts"
      )
      const post: NewPost = {
        tag: data.tags,
        content: content,
        mainImage: imageURL,
        title: data.title,
        category: category,
        highlighted: data.hightlight,
        author_notes: data.author_notes,
        author_id: authorId ? authorId : userId!!,
        longitude: "",
        latitude: "",
      }
      toast.success("Publicado com sucesso")
      mutate(post)
      navigate("/posts")
    } catch (error) {
      toast.error("Erro ao publicar o post")
      console.log("Erro: " + error)
    }
  }

  return (
    <FormProvider {...postFormProvider}>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-3 w-full h-auto"
      >
        <FormButton isSubmitting={isSubmitting} text="Publicar" />

        {errors.content && (
          <span className="text-xs text-red-600 self-end ">
            {errors.content.message}
          </span>
        )}

        {errors.category && (
          <span className="text-xs text-red-600 self-end ">
            {errors.category.message}
          </span>
        )}

        {imageToShow && (
          <img
            loading="lazy"
            src={imageToShow}
            alt="post-image"
            className="size-24 object-contain aspect-square"
          />
        )}

        <InputField
          type="file"
          className="file:text-zinc-400"
          error={errors.image}
          label="Adicionar imagem"
          {...register("image")}
          onChange={handleChangeImage}
        />

        <InputField
          error={errors.title}
          label="Título"
          {...register("title")}
        />

        <InputField label="Tags (opcional)" {...register("tags")} />

        <InputCheckbox
          label="Destacar"
          {...register("hightlight")}
          type="checkbox"
        />

        <TextAreaField
          {...register("author_notes")}
          label="Notas do autor (opcional)"
        />
      </form>
    </FormProvider>
  )
}
export default PostForm
