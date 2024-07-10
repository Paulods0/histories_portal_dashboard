import { toast } from "react-toastify"
import { NewPost } from "@/types/create"
import { useNavigate } from "react-router-dom"
import FormButton from "./form-ui/form-button"
import InputField from "./form-ui/input-field"
import InputCheckbox from "./form-ui/input-checkbox"
import { zodResolver } from "@hookform/resolvers/zod"
import TextAreaField from "./form-ui/text-area-field"
import { useAuthContext } from "@/context/auth-context"
import { uploadImageToFirebaseStorage } from "@/utils/helpers"
import { FormProvider, UseFormReturn, useForm } from "react-hook-form"
import { TourFormSchemaType, tourFormSchema } from "@/types/form-schema"
import { useCreatePost } from "@/lib/react-query/mutations/post-mutation"

import { ChangeEvent, useState } from "react"

type Props = {
  authorId: string
  category: string
  content: string
}

const ToursPostForm = ({ content, authorId, category }: Props) => {
  const navigate = useNavigate()
  const { mutate } = useCreatePost()
  const { userId } = useAuthContext()

  const [image, setImage] = useState("")

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const img = e.target.files[0]
      const imageURL = URL.createObjectURL(img)
      setImage(imageURL)
    }
  }

  const methods: UseFormReturn<TourFormSchemaType> =
    useForm<TourFormSchemaType>({
      mode: "all",
      resolver: zodResolver(tourFormSchema),
    })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = methods

  setValue("content", content)

  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setValue("date", e.target.value)
  }

  const handleSubmitForm = async (data: TourFormSchemaType) => {
    try {
      const geocoord = data.coordinates.split(",")
      const imageURL = await uploadImageToFirebaseStorage(data.image!!, "posts")
      const post: NewPost = {
        tag: data.tags,
        date: data.date,
        content: content,
        title: data.title,
        category: category,
        mainImage: imageURL,
        latitude: geocoord[0],
        longitude: geocoord[1],
        highlighted: data.highlighted,
        author_notes: data.author_notes,
        author_id: authorId ? authorId : userId!!,
      }
      mutate(post)
      toast.success("Publicado com sucesso.")
      console.log(post)
      navigate("/posts")
    } catch (error) {
      toast.error("Erro ao publicar o post")
      console.log("Erro: " + error)
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col h-auto gap-3"
      >
        <>
          <FormButton isSubmitting={isSubmitting} text="Publicar" />
          {errors.content && (
            <span className="text-xs text-red-600">
              {errors.content.message}
            </span>
          )}
        </>

        {image && (
          <img
            src={image}
            alt="post-image"
            className="size-24 object-contain aspect-square"
          />
        )}

        <InputField
          {...register("image")}
          onChange={handleImageChange}
          label="Imagem"
          type="file"
          accept="image/*"
          error={errors.image}
        />

        <InputField
          label="Título"
          type="text"
          {...register("title")}
          error={errors.title}
        />

        <InputCheckbox label="Destacar" {...register("highlighted")} />

        <InputField
          label="Latitude e longitude"
          error={errors.coordinates}
          {...register("coordinates")}
        />

        <InputField label="Tags (opcional)" type="text" {...register("tags")} />

        <TextAreaField
          label="Notas do autor(opcional)"
          {...register("author_notes")}
        />

        <input
          type="date"
          onChange={handleDate}
          className="border rounded-md bg-transparent p-2 calendar-input"
        />
      </form>
    </FormProvider>
  )
}

export default ToursPostForm
