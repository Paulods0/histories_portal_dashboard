import { User } from "@/types/data"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { ChangeEvent, useState } from "react"
import { useCreatePost } from "@/lib/react-query/queries-and-mutations"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

type Props = {
  author: string
  category: string
}

export const formSchema = z.object({
  title: z.string().min(6, "*O título deve conter no mínimo 6 caracteres."),
  coordinates: z.string().transform((coordinates) => {
    const currentCoordinates = coordinates.split(",")
    return {
      latitude: Number(currentCoordinates[0]),
      longitude: Number(currentCoordinates[1]),
    }
  }),
  tags: z
    .string()
    .transform((text) => text.split(","))
    .optional(),
  author_notes: z.string().optional(),
  category: z.string().optional(),
})

export type FormSchemaType = z.infer<typeof formSchema>

const PostForm = ({ category, author }: Props) => {
  // const { mutation, isPending } = useCreatePost()
  const [file, setFile] = useState("")

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const urlImage = URL.createObjectURL(file)
      setFile(urlImage)
    }
  }

  const handleCloseImage = () => {
    setFile("")
  }

  const { register, handleSubmit, formState } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  })

  const handleSubmitForm = (data: FormSchemaType) => {
    console.log({ ...data, category, author })
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
            onClick={handleCloseImage}
            className="absolute text-xs top-3 hover:text-white/20 transition-all right-10"
          >
            Fechar
          </button>
        </div>
      )}

      <Label
        className="p-3 cursor-pointer text-center border rounded-lg"
        htmlFor="image"
      >
        Adicionar imagem
        <Input
          onChange={(e) => handleFile(e)}
          id="image"
          type="file"
          className="hidden w-full"
        />
      </Label>

      <div>
        <Label htmlFor="title" className="text-xs">
          Título
        </Label>
        <Input type="text" {...register("title")} />
      </div>

      <div className="border flex py-2 h-10 px-2 gap-2 items-center w-fit rounded-md">
        <Label htmlFor="checkbox" className="text-xs">
          Destacar
        </Label>
        <Input id="checkbox" type="checkbox" />
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
