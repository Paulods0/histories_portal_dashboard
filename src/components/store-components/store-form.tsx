import { useForm } from "react-hook-form"
import { StoreFormSchema, storeFormSchema } from "@/types/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { toast } from "react-toastify"

const StoreForm = () => {
  // const { mutate, isPending } = useCreateProductCategory()
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<StoreFormSchema>({
    resolver: zodResolver(storeFormSchema),
  })

  const handleSubmitForm = async (data: StoreFormSchema) => {
    try {
      if (!data.image) {
        toast.error("Insira uma imagem")
        return
      }

      // const downloadURL = await uploadImageToFirebaseStorage(
      //   data.image,
      //   "products"
      // )
      // const product = {
      //   title: data.title,
      //   price: data.price,
      //   image: "",
      //   cateogory: "",
      // }
      // mutate(product)
      console.log(data)
      toast.error("Funcionalidade removida temporariamente")
    } catch (error) {}
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      encType="multipart/form-data"
      className="flex p-2 flex-1 gap-2 h-full flex-col w-full"
    >
      <img src="" alt="" />

      <div className="flex flex-col w-full gap-2">
        <Label htmlFor="image">Imagem</Label>
        <Input type="file" id="image" {...register("image")} />
        {errors.image && (
          <span className="text-red-600 text-xs">{errors.image.message}</span>
        )}
      </div>
      <div className="flex flex-col w-full gap-2">
        <Label htmlFor="title">Título</Label>
        <Input type="text" id="title" {...register("title")} />
        {errors.title && (
          <span className="text-red-600 text-xs">{errors.title.message}</span>
        )}
      </div>

      <div className="flex flex-col w-full gap-2">
        <Label htmlFor="price">Preço</Label>
        <Input type="text" id="price" {...register("price")} />
        {errors.price && (
          <span className="text-red-600 text-xs">{errors.price.message}</span>
        )}
      </div>

      <Button type="submit" className="w-fit">
        Publicar produto
      </Button>
    </form>
  )
}

export default StoreForm
