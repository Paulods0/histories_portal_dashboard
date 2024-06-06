import { z } from "zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, FC, useState } from "react"
import { handleImageUpload } from "@/utils/helpers"
import FormButton from "../forms/form-ui/form-button"
import { zodResolver } from "@hookform/resolvers/zod"
import SelectAuthorInput from "@/components/add-post-components/select-author-input"

type Props = {
  content: string
}

const addPartnerSchema = z.object({
  author: z.string().min(1, "Escolha autor"),
  title: z.string().min(1, "Insira um título"),
  content: z.string().min(1, "Escreva algum conteúdo"),
  image: z
    .custom<File>()
    .refine((file) => file !== null, "Insira uma image")
    .transform((file) => {
      if (file) {
        return handleImageUpload(file)
      }
    }),
})

type AddPartnerType = z.infer<typeof addPartnerSchema>

const AddPartnerForm: FC<Props> = ({ content }) => {
  const [authorId, setAuthorId] = useState("")
  const [imageToShow, setImageToShow] = useState<string | null>(null)

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm<AddPartnerType>({
    resolver: zodResolver(addPartnerSchema),
  })

  setValue("content", content)
  setValue("author", authorId)

  function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0]
      const imageURL = URL.createObjectURL(file)
      setImageToShow(imageURL)
      setValue("image", file!!)
    }
  }

  async function handleSubmitForm(data: AddPartnerType) {
    try {
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="w-full border p-4 rounded-lg flex flex-col h-fit gap-4"
    >
      {imageToShow && (
        <img
          src={imageToShow as string}
          alt="imagem"
          className="size-24 object-cover"
        />
      )}

      <div className="flex flex-col gap-2">
        <Label>Imagem</Label>
        <Input
          type="file"
          className="file:text-foreground"
          onChange={handleChangeImage}
        />
        {errors.image && (
          <span className="text-sm text-red-600">{errors.image.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Título</Label>
        <Input type="text" {...register("title")} />
        {errors.title && (
          <span className="text-sm text-red-600">{errors.title.message}</span>
        )}
      </div>

      <div className="w-full flex flex-col gap-2">
        <SelectAuthorInput authorId="" setAuthorId={setAuthorId} />

        {errors.author && (
          <span className="text-sm text-red-600">{errors.author.message}</span>
        )}
      </div>

      <FormButton
        isSubmitting={isSubmitting}
        text="Adicionar"
        className="w-fit"
      />
    </form>
  )
}

export default AddPartnerForm
