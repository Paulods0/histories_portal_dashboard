import { Post } from "@/types/data"
import { EditPostFormSchemaType, editPostFormSchema } from "@/types/form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, UseFormReturn, useForm } from "react-hook-form"
import InputField from "./form-inputs/input-field"
import InputCheckbox from "./form-inputs/input-checkbox"
import TextAreaField from "./form-inputs/text-area-field"

type Props = {
  author: string
  post: Post | undefined
  category: string
}

const EditPostForm = ({ author, category, post }: Props) => {
  const methods: UseFormReturn<EditPostFormSchemaType> =
    useForm<EditPostFormSchemaType>({
      resolver: zodResolver(editPostFormSchema),
      defaultValues: {
        title: post?.title,
        image: post?.mainImage,
        tags: post?.tag.toString(),
        category: post?.category._id,
        highlighted: post?.highlighted,
        author_notes: post?.author_notes,
      },
    })
  const { register, getValues } = methods
  const image = getValues("image")

  return (
    <>
      <FormProvider {...methods}>
        <form className="flex flex-col gap-3 w-full">
          {/* <img src={image!} className="size-24" /> */}

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
