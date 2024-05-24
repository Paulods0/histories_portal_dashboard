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
import { useUpdatePost } from "@/lib/react-query/mutations"
import {
  deleteImageFromFirebase,
  uploadImageToFirebaseStorage,
} from "@/utils/helpers"

type Props = {
  post: Post | undefined
  category: string
  author: string
  content: string
}

const EditTourPostForm = ({ post, author, category, content }: Props) => {
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
          author_id: author ? author : post!!.author._id,
          category: category,
          content: content,
          highlighted: data?.highlighted,
          mainImage: imageURL,
          title: data.title,
          author_notes: data?.author_notes,
          latitude: newCoords && newCoords[0],
          longitude: newCoords && newCoords[1],
          tag: data?.tag,
        }
      } else {
        updatedPost = {
          author_id: author ? author : post!!.author._id,
          category: category,
          content: content,
          highlighted: data?.highlighted,
          mainImage: post?.mainImage,
          title: data.title,
          author_notes: data?.author_notes,
          latitude: newCoords && newCoords[0],
          longitude: newCoords && newCoords[1],
          tag: data?.tag,
        }
      }
      mutate({ id: post!!._id!!, data: updatedPost })
      toast.success("Post Atualizado")
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
      </form>
    </FormProvider>
  )
}

export default EditTourPostForm
