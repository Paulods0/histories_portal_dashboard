import { User } from "@/types/data"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { ChangeEvent, useState } from "react"
import { useCreatePost } from "@/lib/react-query/queries-and-mutations"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TourFormSchemaType, tourFormSchema } from "@/types/schema"

type Props = {
  author: string
  category: string
}

const ToursPostForm = ({ category, author }: Props) => {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TourFormSchemaType>({
    mode: "all",
    resolver: zodResolver(tourFormSchema),
  })

  const handleSubmitForm = (data: TourFormSchemaType) => {
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

        {errors.title && (
          <span className="text-xs text-red-600">{errors.title.message}</span>
        )}
      </div>

      <div className="border flex py-2 h-10 px-2 gap-2 items-center w-fit rounded-md">
        <Label htmlFor="checkbox" className="text-xs">
          Destacar
        </Label>
        <Input id="checkbox" type="checkbox" {...register("highlighted")} />
      </div>

      <div>
        <Label htmlFor="coordinates" className="text-xs">
          Latitude e longitude (seguir a ordem)
        </Label>
        <Input
          id="coordinates"
          type="text"
          {...register("coordinates")}
          placeholder="latitude, longitude"
        />

        {errors.coordinates && (
          <span className="text-xs text-red-600">
            {errors.coordinates.message}
          </span>
        )}
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

export default ToursPostForm