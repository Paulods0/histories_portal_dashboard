import { useState } from "react"

import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthContext } from "@/context/AuthContext"
import { useCreatePost } from "@/lib/react-query/mutations"
import { PostFormSchemaType, postFormSchema } from "@/types/schema"

import { toast } from "react-toastify"
import { NewPost } from "@/types/data"
import { uploadImageToFirebaseStorage } from "@/utils/helpers"

type Props = {
  image: File | undefined
  authorId: string
  category: string
  content: string
}

const PostForm = ({ image, category, authorId, content }: Props) => {
  const { userId } = useAuthContext()

  const { mutate } = useCreatePost()
  const [file, setFile] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormSchemaType>({
    resolver: zodResolver(postFormSchema),
  })

  const handleSubmitForm = async (data: PostFormSchemaType) => {
    try {
      if (!image) {
        toast.error("Insira uma imagem.")
        return
      }
      const imageURL = await uploadImageToFirebaseStorage(image, "posts")
      const postData: NewPost = {
        mainImage: imageURL,
        tag: data.tags,
        content: content,
        title: data.title,
        category: category,
        author_notes: data.author_notes,
        highlighted: data.hightlight,
        author_id: authorId!! ? authorId!! : userId!!,
      }
      mutate(postData)
      toast.success("O seu post foi publicado com sucesso.🎇")
    } catch (error) {
      toast.error("Erro ao publicar o post, por favor tente novamente")
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex flex-col gap-3"
    >
      {file && (
        <div className="relative">
          <img
            src={file}
            className="h-32 w-full object-contain aspect-square mx-auto"
          />
          <button
            onClick={() => setFile("")}
            className="absolute text-xs top-3 hover:text-white/20 transition-all right-10"
          >
            Fechar
          </button>
        </div>
      )}

      <div className="flex flex-col">
        <Label htmlFor="title" className="text-xs">
          Título
        </Label>
        <Input type="text" {...register("title")} />
        {errors.title && (
          <span className="text-xs text-red-600">{errors.title.message}</span>
        )}
      </div>

      <div className="border flex py-2 h-10 px-2 gap-2 items-center w-fit rounded-md">
        <Label htmlFor="checkbox" className="text-xs">
          Destacar
        </Label>
        <Input id="checkbox" type="checkbox" {...register("hightlight")} />
      </div>

      <div>
        <Label htmlFor="tags" className="text-xs">
          Adicionar tags(separe-ás por vírgulas)
        </Label>
        <Input id="tags" type="text" {...register("tags")} />
      </div>

      <div>
        <Label htmlFor="notes" className="text-xs">
          Notas do autor(opcional)
        </Label>
        <Textarea
          id="notes"
          className="resize-none"
          rows={5}
          {...register("author_notes")}
        />
      </div>

      <Button className="w-fit" type="submit">
        Publicar
      </Button>
    </form>
  )
}

export default PostForm
