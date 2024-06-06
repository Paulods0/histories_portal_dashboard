import { Tip, UpdateTip } from "@/api/tips"
import { ChangeEvent, FC, useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import SelectAuthorInput from "../add-post-components/select-author-input"
import { Button } from "../ui/button"
import LoaderSpinner from "../global/loader-spinner"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUpdateTip } from "@/lib/react-query/mutations"
import {
  deleteImageFromFirebase,
  uploadImageToFirebaseStorage,
} from "@/utils/helpers"

const editTipSchema = z.object({
  title: z.string(),
  author: z.string(),
  content: z.string(),
  image: z.union([z.custom<File>(), z.string()]),
})

type EditTipType = z.infer<typeof editTipSchema>

type Props = { tip: Tip }

const EditTipForm: FC<Props> = ({ tip }) => {
  const [authorId, setAuthorId] = useState("")
  const [imageToShow, setImageToShow] = useState<string | null>(null)
  const { mutate } = useUpdateTip()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<EditTipType>({
    resolver: zodResolver(editTipSchema),
    defaultValues: {
      image: tip.image,
      title: tip.title,
      content: tip.content,
      author: tip.author._id,
    },
  })

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0]
      const imageURL = URL.createObjectURL(file)
      setImageToShow(imageURL)
    }
  }

  function removeSelectedImage() {
    setImageToShow(null)
  }

  async function handleSubmitForm(data: EditTipType) {
    try {
      let payload: UpdateTip

      if (imageToShow) {
        await deleteImageFromFirebase(tip.image, "tips")
        const imgDownloadURL = await uploadImageToFirebaseStorage(
          data.image!! as File,
          "tips"
        )
        payload = {
          id: tip._id,
          title: data.title,
          author: data.author,
          content: data.content,
          image: imgDownloadURL,
        }
      } else {
        payload = {
          id: tip._id,
          title: data.title,
          author: data.author,
          content: data.content,
          image: tip.image,
        }
      }

      mutate(payload)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
      <img
        src={imageToShow ?? tip.image}
        className="size-28 object-cover"
        alt="dica-imagem"
      />
      {imageToShow && (
        <div className="w-full flex items-center justify-end my-2">
          <button
            className="text-red-600 text-sm"
            onClick={removeSelectedImage}
          >
            Remover
          </button>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <Label>Imagem</Label>
        <Input
          type="file"
          className="file:text-foreground"
          onChange={handleImageChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Titulo</Label>
        <Input type="text" {...register("title")} className="text-foreground" />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Author</Label>
        <SelectAuthorInput authorId={authorId} setAuthorId={setAuthorId} />
      </div>

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? <LoaderSpinner /> : "Atualizar"}
      </Button>
    </form>
  )
}

export default EditTipForm
