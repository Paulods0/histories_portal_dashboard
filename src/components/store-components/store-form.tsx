import { useForm } from "react-hook-form"
import { ProductFormSchema, productFormSchema } from "@/types/form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { toast } from "react-toastify"
import { uploadImageToFirebaseStorage } from "@/utils/helpers"
import { useCreateProduct } from "@/lib/react-query/mutations"
import { useState } from "react"
import { ClipLoader } from "react-spinners"
import { useGetAllProductCategories } from "@/lib/react-query/queries"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { NewProduct } from "@/types/data"

const StoreForm = () => {
  const { mutate } = useCreateProduct()
  const { data, isLoading: loadingCategories } = useGetAllProductCategories()

  const [isLoading, setIsLoading] = useState(false)
  const [category, setCategory] = useState("")

  const handleChangCategory = (value: string) => {
    setCategory(value)
  }

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<ProductFormSchema>({
    resolver: zodResolver(productFormSchema),
  })

  const handleSubmitForm = async (data: ProductFormSchema) => {
    setIsLoading(true)
    try {
      if (!data.image[0] || !category) {
        toast.error("Preencha todos os dados")
        setIsLoading(false)
        return
      }

      const downloadURL = await uploadImageToFirebaseStorage(
        data.image[0],
        "products"
      )

      const product: NewProduct = {
        name: data.title,
        price: data.price,
        image: downloadURL,
        category: category,
      }

      mutate(product)
      setIsLoading(false)
      toast.success("Produto adicionado")
      // console.log(product)
    } catch (error) {
      toast.error("Erro ao adicionar produto")
      console.log("Erro: " + error)
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      encType="multipart/form-data"
      className="flex p-2 flex-1 gap-2 h-full flex-col w-full"
    >
      <img src="" alt="" />

      {loadingCategories ? (
        <ClipLoader size={14} />
      ) : (
        <Select onValueChange={handleChangCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            {data?.map((category) => (
              <SelectItem key={category._id} value={category._id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

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
        <Input type="number" id="price" {...register("price")} />
        {errors.price && (
          <span className="text-red-600 text-xs">{errors.price.message}</span>
        )}
      </div>

      <Button disabled={isLoading} type="submit" className="w-fit">
        {isLoading ? <ClipLoader size={14} /> : "Publicar produto"}
      </Button>
    </form>
  )
}

export default StoreForm
