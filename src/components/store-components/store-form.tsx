import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProductFormSchema, productFormSchema } from "@/types/form-schema"

import { Label } from "../ui/label"
import { Input } from "../ui/input"
import InputField from "../forms/form-ui/input-field"
import FormButton from "../forms/form-ui/form-button"
import { ChangeEvent, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { NewProduct } from "@/types/create"
import { uploadImageToFirebaseStorage } from "@/utils/helpers"
import { toast } from "react-toastify"
import { useCreateProduct } from "@/lib/react-query/mutations"
import { PRODUCT_CATEGORIES } from "@/utils/constants"

const StoreForm = () => {
  const { mutate } = useCreateProduct()

  const [image, setImage] = useState<string | null>(null)

  const methods = useForm<ProductFormSchema>({
    resolver: zodResolver(productFormSchema),
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = methods

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      const file = e.target.files[0]
      const imageURL = URL.createObjectURL(file)
      setImage(imageURL)
    }
  }

  const handleCategory = (value: ProductFormSchema["category"]) => {
    setValue("category", value)
  }

  async function handleSubmitForm(data: ProductFormSchema) {
    try {
      const downloadURL = await uploadImageToFirebaseStorage(
        data.image!!,
        "products"
      )
      const newProduct: NewProduct = {
        name: data.title,
        image: downloadURL,
        price: data.price,
        category: data.category,
      }

      mutate(newProduct)
      toast.success("Produto adicionado")
      console.log(data)
      reset()
    } catch (error) {
      console.log(error)
      toast.error("Erro ao adicionar o produto")
      reset()
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        encType="multipart/form-data"
        className="flex p-2 flex-1 gap-2 h-full flex-col w-full"
      >
        {image ? <img src={image} className="size-24 object-contain" /> : null}

        <>
          <Label htmlFor="image">
            <Input
              type="file"
              accept=".jpg, .png, .jpeg"
              {...register("image")}
              onChange={handleImage}
            />
          </Label>
          {errors.image && (
            <span className="text-red-600 text-xs">{errors.image.message}</span>
          )}
        </>

        <InputField label="Nome" {...register("title")} error={errors.title} />
        <InputField
          type="number"
          label="Preço"
          {...register("price")}
          error={errors.price}
        />

        <>
          <Select onValueChange={handleCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>

            <SelectContent>
              {PRODUCT_CATEGORIES.map((category, index) => (
                <SelectItem
                  key={index}
                  value={category.label}
                  className="capitalize"
                >
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {errors.category && (
            <span className="text-xs text-red-600">
              {errors.category.message}
            </span>
          )}
        </>

        <FormButton text="Salvar produto" isSubmitting={isSubmitting} />
      </form>
    </FormProvider>
  )
}

export default StoreForm
