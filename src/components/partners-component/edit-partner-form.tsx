import {
  deleteImageFromFirebase,
  uploadImageToFirebaseStorage,
} from "@/utils/helpers"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { PartnerData } from "@/api/partner"
import { ChangeEvent, FC, useState } from "react"
import LoaderSpinner from "../global/loader-spinner"
import { zodResolver } from "@hookform/resolvers/zod"
import SelectAuthorInput from "../add-post-components/select-author-input"
import { useUpdatePartner } from "@/lib/react-query/mutations/partner-mutation"

import { UpdatePartner } from "@/api/tips"
import { EditPartnerType, editPartnerSchema } from "@/types/form-schema"

type Props = {
  partner: PartnerData
  content: string
}

const EditPartnerForm: FC<Props> = ({ partner, content }) => {
  const [authorId, setAuthorId] = useState(partner.author._id)
  const [imageToShow, setImageToShow] = useState<string | null>(null)
  const { mutate } = useUpdatePartner()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<EditPartnerType>({
    resolver: zodResolver(editPartnerSchema),
    defaultValues: {
      image: partner.image,
      title: partner.title,
      content: content,
      author: partner.author._id,
    },
  })

  setValue("content", content)
  setValue("author", authorId)

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

  async function handleSubmitForm(data: EditPartnerType) {
    try {
      let payload: UpdatePartner

      if (imageToShow) {
        await deleteImageFromFirebase(partner.image, "partners")
        const imgDownloadURL = await uploadImageToFirebaseStorage(
          data.image!! as File,
          "partners"
        )
        payload = {
          id: partner._id,
          content: data.content,
          title: data.title,
          author: data.author,
          image: imgDownloadURL,
        }
      } else {
        payload = {
          id: partner._id,
          content: data.content,
          image: partner.image,
          title: data.title,
          author: data.author,
        }
      }

      mutate(payload)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="space-y-4 p-4 h-fit border rounded-lg"
    >
      <img
        src={imageToShow ?? partner.image}
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

export default EditPartnerForm
