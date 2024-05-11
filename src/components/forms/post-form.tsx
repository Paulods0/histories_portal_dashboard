import { ChangeEvent, useState } from "react"

import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthContext } from "@/context/auth-context"
import { PostFormSchemaType, postFormSchema } from "@/types/form-schema"
import InputImage from "../add-post-components/input-image"
import { NewPost } from "@/types/create"
import { toast } from "react-toastify"
import { ClipLoader } from "react-spinners"
import { useCreatePost } from "@/lib/react-query/mutations"
import { uploadImageToFirebaseStorage } from "@/utils/helpers"
import { useNavigate } from "react-router-dom"

type Props = {
  content: string
  category: string
  authorId: string
}

const PostForm = ({ content, authorId, category }: Props) => {
  const navigate = useNavigate()
  const { mutate } = useCreatePost()
  const { userId } = useAuthContext()

  const [image, setImage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File | undefined>(undefined)

  const { register, handleSubmit } = useForm<PostFormSchemaType>({
    resolver: zodResolver(postFormSchema),
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

  const handleSubmitForm = async (data: PostFormSchemaType) => {
    setIsLoading(true)
    try {
      if (!data.title || !category || !file || !content) {
        toast.error("Preencha todos os dados obrigatórios.")
        setIsLoading(false)
        return
      }

      const imageURL = await uploadImageToFirebaseStorage(file, "posts")

      const post: NewPost = {
        tag: data.tags,
        content: content,
        mainImage: imageURL,
        title: data.title,
        category: category,
        highlighted: data.hightlight,
        author_notes: data.author_notes,
        author_id: authorId ? authorId : userId!!,
      }

      mutate(post)
      setIsLoading(false)
      toast.success("Publicado com sucesso")
      navigate("/posts")
      console.log(post)
    } catch (error) {
      setIsLoading(false)
      toast.error("Erro ao publicar o post")
      console.log("Erro: " + error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex flex-col gap-3 w-full h-auto"
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

      <Input placeholder="*Título" type="text" {...register("title")} />

      <div className="border flex py-2 h-10 px-2 gap-2 items-center w-fit rounded-md">
        <Label htmlFor="checkbox" className="text-xs">
          Destacar
        </Label>
        <Input id="checkbox" type="checkbox" {...register("hightlight")} />
      </div>

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

export default PostForm
