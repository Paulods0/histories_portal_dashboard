import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { ChangeEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { FormSchemaType, formSchema } from "./post-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PostData } from "@/types/data"

type Props = {
  post: PostData
}

const EditPostForm = ({ post }: Props) => {
  const { register } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      tags: post.tag ?? undefined,
      author_notes: post.author_notes,
      coordinates: {
        latitude: Number(post.latitude),
        longitude: Number(post.longitude),
      },
    },
  })

  return (
    <form className="flex flex-col gap-3 w-full">
      <div className="relative">
        <img
          src={post.mainImage}
          className="h-32 w-full object-contain aspect-square mx-auto"
        />
      </div>

      <Label
        className="p-3 cursor-pointer text-center border rounded-lg"
        htmlFor="image"
      >
        Adicionar imagem
        <Input id="image" type="file" className="hidden w-full" />
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

export default EditPostForm
