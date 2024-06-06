import { z } from "zod"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import {
  handleImageUpload,
  uploadImageToFirebaseStorage,
} from "@/utils/helpers"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthContext } from "@/context/auth-context"
import { ChangeEvent, FC, SetStateAction, useState } from "react"
import SelectAuthorInput from "../add-post-components/select-author-input"
import LoaderSpinner from "../global/loader-spinner"
import { CreateTip } from "@/api/tips"
import { useCreateTip } from "@/lib/react-query/mutations"

const addTipsSchema = z.object({
  title: z.string().min(1, "Insira um título"),
  content: z.string().min(1, "Escreva alguma dica"),
  author: z.string().min(1, "Adicione um autor para esta dica"),
  mainImage: z
    .custom<File>()
    .refine((image) => image !== undefined, "Insira uma imagem")
    .transform(async (file) => await handleImageUpload(file)),
})

type AddTipsType = z.infer<typeof addTipsSchema>

type Props = {
  content: string
  setContent: React.Dispatch<SetStateAction<string>>
}

const AddTipsForm: FC<Props> = ({ content, setContent }) => {
  const { userId } = useAuthContext()
  const [authorId, setAuthorId] = useState("")
  const [imageToShow, setImageToShow] = useState<string | null>(null)

  const { mutate } = useCreateTip()

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<AddTipsType>({
    resolver: zodResolver(addTipsSchema),
    defaultValues: {
      author: userId!!,
    },
  })

  function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0]
      const imageURL = URL.createObjectURL(file)
      setImageToShow(imageURL)
      setValue("mainImage", file)
    }
  }

  setValue("content", content)
  setValue("author", authorId)

  async function handleSubmitForm(data: AddTipsType) {
    try {
      const downloadImageURL = await uploadImageToFirebaseStorage(
        data.mainImage as File,
        "tips"
      )

      const tipData: CreateTip = {
        category: "tip",
        title: data.title,
        author: data.author,
        content: data.content,
        image: downloadImageURL,
      }

      mutate(tipData)

      toast.success("Adicionado com sucesso")
      reset()
      setContent("")
      setImageToShow(null)
    } catch (error: any) {
      console.log(error)
      toast.error("Erro ao adicionar: " + error.response.data.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
      <div className="space-y-2">
        {imageToShow && (
          <img src={imageToShow} alt="" className="size-32 object-cover" />
        )}

        <Label htmlFor="image">Imagem</Label>
        <Input
          onChange={handleChangeImage}
          id="image"
          type="file"
          accept=".jpg, .png, .jpeg"
          className="file:text-foreground"
        />
        {errors.mainImage && (
          <span className="text-xs text-red-600">
            {errors.mainImage.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input {...register("title")} id="title" type="text" />
        {errors.title && (
          <span className="text-xs text-red-600">{errors.title.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <SelectAuthorInput authorId={authorId} setAuthorId={setAuthorId} />

        {errors.author && (
          <span className="text-xs text-red-600">{errors.author.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Button type="submit" disabled={isSubmitting} className="w-fit p-3">
          {isSubmitting ? <LoaderSpinner /> : "Adicionar"}
        </Button>
        {errors.content && (
          <span className="text-xs text-red-600">{errors.content.message}</span>
        )}
      </div>
    </form>
  )
}

export default AddTipsForm
