import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TourFormSchemaType, tourFormSchema } from "@/types/schema"
import { useAuthContext } from "@/context/AuthContext"

type Props = {
  image: File | undefined
  authorId: string
  category: string
  content: string
}

const ToursPostForm = ({ image, content, category, authorId }: Props) => {
  const { userId } = useAuthContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TourFormSchemaType>({
    mode: "all",
    resolver: zodResolver(tourFormSchema),
  })

  const handleSubmitForm = (data: TourFormSchemaType) => {
    console.log({
      ...data,
      mainImage: image,
      content,
      category,
      author_id: authorId ? authorId : userId!!,
    })
  }
  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex flex-col gap-3"
    >
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
