import { ChangeEvent, useState } from "react"

import { EditPostFormSchemaType, editPostFormSchema } from "@/types/form-schema"
import { FormProvider, UseFormReturn, useForm } from "react-hook-form"
import InputCheckbox from "./form-ui/input-checkbox"
import { zodResolver } from "@hookform/resolvers/zod"
import TextAreaField from "./form-ui/text-area-field"
import InputField from "./form-ui/input-field"
import FormButton from "./form-ui/form-button"
import { Post } from "@/types/data"

import { Label } from "../ui/label"
import { Input } from "../ui/input"
import LoaderSpinner from "../global/loader-spinner"

type Props = {
  author: string
  post: Post | undefined
  category: string
}

const EditPostForm = ({ post, category, author }: Props) => {
  const [imageToShow, setImageToShow] = useState("")

  if (!post) {
    return <LoaderSpinner color="#111" />
  }

  const methods: UseFormReturn<EditPostFormSchemaType> =
    useForm<EditPostFormSchemaType>({
      resolver: zodResolver(editPostFormSchema),
      defaultValues: {
        title: post?.title,
        image: post?.mainImage,
        category: post?.category._id,
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

  function handleSubmitForm(data: EditPostFormSchemaType) {
    console.log({
      ...data,
      category: category,
      author_id: author ? author : post!!.author._id,
    })
  }

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0]
      const imageURL = URL.createObjectURL(file)
      setImageToShow(imageURL)
      setValue("image", file)
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-3 w-full"
        >
          <Label htmlFor="image">
            <img
              src={imageToShow ? imageToShow : post!!.mainImage}
              className="size-24 object-contain"
            />
            <Input
              id="image"
              type="file"
              accept=".jpg,.png,.jpeg"
              {...register("image")}
              onChange={handleImage}
              className="hidden"
            />
          </Label>

          <FormButton
            isSubmitting={isSubmitting}
            buttonColor="#111"
            text="Atualizar"
          />

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
