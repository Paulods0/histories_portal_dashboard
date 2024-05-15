import { Post } from "@/types/data"
import { EditTourFormSchemaType, editTourFormSchema } from "@/types/form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, UseFormReturn, useForm } from "react-hook-form"
import FormButton from "./form-ui/form-button"
import InputField from "./form-ui/input-field"
import TextAreaField from "./form-ui/text-area-field"
import InputCheckbox from "./form-ui/input-checkbox"
import { toast } from "react-toastify"
import { UpdatePost } from "@/types/update"
import { ChangeEvent, useState } from "react"

type Props = {
  post: Post | undefined
  category: string
  author: string
  content: string
}

const EditTourPostForm = ({ post, author, category, content }: Props) => {
  const [imageToShow, setImageToShow] = useState<string | null>(null)

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const url = URL.createObjectURL(file)
      setImageToShow(url)
    }
  }

  const methods: UseFormReturn<EditTourFormSchemaType> =
    useForm<EditTourFormSchemaType>({
      resolver: zodResolver(editTourFormSchema),
      defaultValues: {
        image: post?.mainImage,
        author_notes: post?.author_notes,
        coordinates: `${post?.latitude},${post?.longitude}`,
        highlighted: post?.highlighted,
        tag: post?.tag,
        title: post?.title,
      },
    })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const handleSubmitForm = (data: EditTourFormSchemaType) => {
    try {
      const newCoords = data.coordinates?.split(",")
      const updatedPost: UpdatePost = {
        author_id: author ? author : post!!.author._id,
        category: category,
        content: content,
        highlighted: data?.highlighted,
        mainImage: data?.image,
        title: data.title,
        author_notes: data?.author_notes,
        latitude: newCoords && newCoords[0],
        longitude: newCoords && newCoords[1],
        tag: data?.tag,
      }

      console.log(updatedPost)
    } catch (error) {
      console.log(error)
      toast.error("Erro ao atualizar o post")
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col h-auto gap-3"
      >
        <FormButton
          isSubmitting={isSubmitting}
          text="Atualizar"
          buttonColor="#111111"
        />
        <>
          {imageToShow ? (
            <img
              src={imageToShow}
              alt="post-image"
              className="size-24 object-contain aspect-square"
            />
          ) : (
            <img
              src={post?.mainImage}
              alt="post-image"
              className="size-24 object-contain aspect-square"
            />
          )}
        </>
        <InputField
          {...register("image")}
          label="Imagem"
          type="file"
          accept="image/*"
          onChange={handleChangeImage}
        />
        <InputField label="Título" type="text" {...register("title")} />
        <InputCheckbox label="Destacar" {...register("highlighted")} />
        <InputField label="Latitude e longitude" {...register("coordinates")} />
        <InputField label="Tags (opcional)" type="text" {...register("tag")} />
        <TextAreaField
          label="Notas do autor(opcional)"
          {...register("author_notes")}
        />
      </form>
    </FormProvider>
  )
}

export default EditTourPostForm
