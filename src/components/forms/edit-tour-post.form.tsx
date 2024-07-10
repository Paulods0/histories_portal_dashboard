import {
  deleteImageFromFirebase,
  uploadImageToFirebaseStorage,
} from "@/utils/helpers"
import { Post } from "@/types/data"
import { toast } from "react-toastify"
import { UpdatePost } from "@/types/update"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import InputField from "./form-ui/input-field"
import FormButton from "./form-ui/form-button"
import InputCheckbox from "./form-ui/input-checkbox"
import TextAreaField from "./form-ui/text-area-field"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, UseFormReturn, useForm } from "react-hook-form"
import { useUpdatePost } from "@/lib/react-query/mutations/post-mutation"
import { EditTourFormSchemaType, editTourFormSchema } from "@/types/form-schema"

type Props = {
  post: Post | undefined
  category: string
  author: string
  content: string
}

const EditTourPostForm = ({ post, author, category, content }: Props) => {
  const navigate = useNavigate()
  const { mutate } = useUpdatePost()

  const [imageToShow, setImageToShow] = useState<string | null>(null)

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const url = URL.createObjectURL(file)
      setImageToShow(url)
    }
  }

  const handleRemoveImageToShow = () => setImageToShow(null)

  const methods: UseFormReturn<EditTourFormSchemaType> =
    useForm<EditTourFormSchemaType>({
      resolver: zodResolver(editTourFormSchema),
      defaultValues: {
        tag: post?.tag,
        title: post?.title,
        image: post?.mainImage,
        author: post?.author._id,
        highlighted: post?.highlighted,
        author_notes: post?.author_notes,
        date: post?.date.split("/").reverse().join("-"),
        coordinates: `${post?.latitude},${post?.longitude}`,
      },
    })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = methods

  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setValue("date", e.target.value)
  }

  const handleSubmitForm = async (data: EditTourFormSchemaType) => {
    try {
      let updatedPost: UpdatePost
      const newCoords = data.coordinates?.split(",")
      if (imageToShow) {
        await deleteImageFromFirebase(post!!.mainImage!!, "posts")
        const imageURL = await uploadImageToFirebaseStorage(
          data.image as File,
          "posts"
        )
        updatedPost = {
          tag: data?.tag,
          date: data.date,
          content: content,
          title: data.title,
          category: category,
          mainImage: imageURL,
          highlighted: data?.highlighted,
          author_notes: data?.author_notes,
          latitude: newCoords && newCoords[0],
          longitude: newCoords && newCoords[1],
          author: author ? author : post!!.author._id,
        }
      } else {
        updatedPost = {
          tag: data?.tag,
          date: data.date,
          content: content,
          title: data.title,
          category: category,
          mainImage: post?.mainImage,
          highlighted: data?.highlighted,
          author_notes: data?.author_notes,
          latitude: newCoords && newCoords[0],
          longitude: newCoords && newCoords[1],
          author: author ? author : post!!.author._id,
        }
      }
      mutate({ id: post!!._id!!, data: updatedPost })
      toast.success("Post Atualizado")
      navigate("/posts")
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
        <FormButton isSubmitting={isSubmitting} text="Atualizar" />
        <>
          {imageToShow ? (
            <div className="flex items-center flex-col w-full">
              <img
                src={imageToShow}
                alt="post-image"
                className="md:size-36 size-24 object-contain aspect-square"
              />

              <button
                type="button"
                onClick={handleRemoveImageToShow}
                className="text-red-800 hover:text-red-900 transition-all duration-200 ease-in-out"
              >
                Remover imagem
              </button>
            </div>
          ) : (
            <img
              src={post?.mainImage}
              alt="post-image"
              className="md:size-36 size-24 object-contain aspect-square"
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
        <input
          type="date"
          {...register("date")}
          onChange={handleDate}
          className="border bg-transparent calendar-input rounded-md p-2 w-full"
        />
      </form>
    </FormProvider>
  )
}

export default EditTourPostForm
