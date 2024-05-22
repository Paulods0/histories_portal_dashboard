import { ChangeEvent, useState } from "react"

import { EditPostFormSchemaType, editPostFormSchema } from "@/types/form-schema"
import { FormProvider, UseFormReturn, useForm } from "react-hook-form"
import InputCheckbox from "./form-ui/input-checkbox"
import { zodResolver } from "@hookform/resolvers/zod"
import TextAreaField from "./form-ui/text-area-field"
import InputField from "./form-ui/input-field"
import FormButton from "./form-ui/form-button"
import { Post } from "@/types/data"
import LoaderSpinner from "../global/loader-spinner"
import { toast } from "react-toastify"
import {
  deleteImageFromFirebase,
  uploadImageToFirebaseStorage,
} from "@/utils/helpers"
import { Button } from "../ui/button"
import { UpdatePost } from "@/types/update"
import { useUpdatePost } from "@/lib/react-query/mutations"

type Props = {
  authorId: string
  post: Post | undefined
  category: string
  content: string
}

const EditPostForm = ({ authorId, post, content, category }: Props) => {
  const { mutate } = useUpdatePost()
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

  function handleRemoveImage() {
    setImageToShow(null)
    setValue("image", post!!.mainImage)
  }

  const handleSubmitForm = async (data: EditPostFormSchemaType) => {
    try {
      const payload = {
        id: post!!._id,
        data: {
          title: data.title,
          author_id: authorId,
          author_notes: data.author_notes,
          category: data.category,
          content: content,
          tag: data.tags,
          highlighted: data.highlighted,
          mainImage: "imageURL" ? "imageURL" : post!.mainImage,
        } as UpdatePost,
      }

      console.log(payload)
      toast.success("Atualizado com sucesso")
    } catch (error) {
      toast.error("Erro ao publicar o post")
      console.log(error)
    }
  }
  // const handleSubmitForm = async (data: EditPostFormSchemaType) => {
  //   try {
  //     let imageURL: Promise<string> | string | null = null
  //     if (imageToShow !== null) {
  //       await deleteImageFromFirebase(post!!.mainImage, "posts")
  //       imageURL = uploadImageToFirebaseStorage(data.image!! as File, "posts")
  //       console.log("Deletado do firebase")
  //       imageURL = imageURL
  //     }

  //     const payload = {
  //       id: post!!._id,
  //       data: {
  //         title: data.title,
  //         author_id: authorId,
  //         author_notes: data.author_notes,
  //         category: data.category,
  //         content: content,
  //         tag: data.tags,
  //         highlighted: data.highlighted,
  //         mainImage: imageURL ? imageURL : post!.mainImage,
  //       } as UpdatePost,
  //     }

  //     mutate(payload)
  //     console.log(payload)
  //     toast.success("Atualizado com sucesso")
  //   } catch (error) {
  //     toast.error("Erro ao publicar o post")
  //     console.log(error)
  //   }
  // }

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-3 w-full"
        >
          {imageToShow ? (
            <>
              <img
                src={imageToShow}
                className="w-full h-32 object-contain"
                loading="lazy"
              />
              <Button
                type="button"
                onClick={handleRemoveImage}
                variant={"destructive"}
                className="capitalize w-fit text-xs self-center"
              >
                remover imagem
              </Button>
            </>
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
