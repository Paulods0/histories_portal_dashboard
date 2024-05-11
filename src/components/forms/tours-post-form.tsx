import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TourFormSchemaType, tourFormSchema } from "@/types/form-schema"
import { useAuthContext } from "@/context/auth-context"
import InputImage from "../add-post-components/input-image"
import { ChangeEvent, useState } from "react"
import { toast } from "react-toastify"
import { NewExcursionPost } from "@/types/create"
import { uploadImageToFirebaseStorage } from "@/utils/helpers"
import { useCreatePost } from "@/lib/react-query/mutations"
import { ClipLoader } from "react-spinners"
import { useNavigate } from "react-router-dom"

type Props = {
  authorId: string
  category: string
  content: string
}

const ToursPostForm = ({ content, category, authorId }: Props) => {
  const navigate = useNavigate()
  const { mutate } = useCreatePost()
  const { userId } = useAuthContext()

  const [image, setImage] = useState("")
  const [file, setFile] = useState<File | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit } = useForm<TourFormSchemaType>({
    mode: "all",
    resolver: zodResolver(tourFormSchema),
  })

  const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const img = e.target.files[0]
      const imageURL = URL.createObjectURL(img)
      setFile(img)
      setImage(imageURL)
    }
  }

  const handleRemoveImage = () => {
    setFile(undefined)
  }

  const handleSubmitForm = async (data: TourFormSchemaType) => {
    setIsLoading(true)
    try {
      if (!data.title || !category || !file || !content || !data.coordinates) {
        toast.error("Preencha todos os dados obrigatórios.")
        setIsLoading(false)
        return
      }

      const imageURL = await uploadImageToFirebaseStorage(file, "posts")

      const post: NewExcursionPost = {
        tag: data.tags,
        content: content,
        mainImage: imageURL,
        title: data.title,
        category: category,
        highlighted: data.highlighted,
        author_notes: data.author_notes,
        latitude: data.coordinates.latitude,
        longitude: data.coordinates.longitude,
        author_id: authorId ? authorId : userId!!,
      }

      mutate(post)
      setIsLoading(false)
      toast.success("Publicado com sucesso.")
      navigate("/posts")
      console.log(post)
    } catch (error) {
      toast.error("Erro ao publicar o post")
      setIsLoading(false)
      console.log("Erro: " + error)
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex flex-col h-auto gap-3"
    >
      <Button disabled={isLoading} type="submit" className="sticky z-20 top-0">
        {isLoading ? <ClipLoader size={14} /> : "Publicar"}
      </Button>

      <>
        {file ? (
          <img
            src={image}
            className="w-40 h-36 object-cover aspect-square mx-auto"
          />
        ) : null}
      </>

      <InputImage
        file={file}
        handleSetImage={handleSetImage}
        handleRemoveImage={handleRemoveImage}
      />

      <Input placeholder="Título" type="text" {...register("title")} />

      <div className="border flex py-2 h-10 px-2 gap-2 items-center w-fit rounded-md">
        <Label htmlFor="checkbox" className="text-xs">
          Destacar
        </Label>
        <Input id="checkbox" type="checkbox" {...register("highlighted")} />
      </div>

      <Input
        type="text"
        placeholder="Latitude & longitude"
        {...register("coordinates")}
      />

      <Input placeholder="Tags(opcional)" type="text" {...register("tags")} />

      <Textarea
        placeholder="Notas do autor(opcional)"
        className="resize-none"
        rows={8}
        {...register("author_notes")}
      />
    </form>
  )
}

export default ToursPostForm
