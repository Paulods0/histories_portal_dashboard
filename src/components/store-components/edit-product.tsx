import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Product } from "@/types/data"
import { CiEdit } from "react-icons/ci"
import { Button } from "../ui/button"
import { FormProvider, UseFormReturn, useForm } from "react-hook-form"
import {
  EditProductFormSchemaType,
  editProductFormSchema,
} from "@/types/form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"

import { ClipLoader } from "react-spinners"

import SelectCategory from "./select-category"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useUpdateProduct } from "@/lib/react-query/mutations"
import { UpdateProduct } from "@/types/update"
import InputField from "../forms/form-ui/input-field"
import FormButton from "../forms/form-ui/form-button"
import { ChangeEvent, useState } from "react"

type Props = {
  product: Product
}

const EditProduct = ({ product }: Props) => {
  // const { mutate } = useUpdateProduct()
  const [imageToShow, setImageToShow] = useState("")

  const editProductForm: UseFormReturn<EditProductFormSchemaType> =
    useForm<EditProductFormSchemaType>({
      resolver: zodResolver(editProductFormSchema),
      defaultValues: {
        image: product.image,
        name: product.name,
        price: product.price,
        category: product.category._id,
      },
    })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = editProductForm

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      const file = e.target.files[0]
      const imageURL = URL.createObjectURL(file)
      setImageToShow(imageURL)
    }
  }

  const handleSubmitForm = (data: EditProductFormSchemaType) => {
    console.log(data)
    // try {
    //   const updatedProduct: UpdateProduct = {
    //     ...data,
    //     id: product._id,
    //   }
    //   mutate(updatedProduct)
    //   console.log(updatedProduct)
    //   toast.success("Atualizado com sucesso")
    //   reset()
    // } catch (error) {
    //   console.log("Erro: " + error)
    //   toast.error("Erro ao atualizar post")
    //   reset()
    // }
  }

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer" onClick={() => {}}>
        <CiEdit size={24} />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar produto</DialogTitle>
        </DialogHeader>

        <FormProvider {...editProductForm}>
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-2">
            <>
              <img
                src={imageToShow ? imageToShow : product.image}
                className="size-24 object-contain mb-2"
              />

              <Label htmlFor="image" className="cursor-pointer">
                <Input
                  className="placeholder:text-white text-white"
                  type="file"
                  {...register("image")}
                  accept=".jpg, .png, .jpeg"
                  onChange={handleImage}
                  id="image"
                />
                {errors.image && (
                  <span className="text-xs text-red-600">
                    {errors.image.message}
                  </span>
                )}
              </Label>
            </>

            <InputField
              className="bg-foreground text-background"
              label="Título"
              {...register("name")}
            />
            <InputField
              className="bg-foreground text-background"
              label="Preço"
              {...register("price")}
              type="number"
            />

            <SelectCategory product={product} />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"default"}>Cancelar</Button>
              </DialogClose>

              <FormButton
                variant="secondary"
                isSubmitting={isSubmitting}
                buttonColor="#111"
                text="Atualizar alterações"
              />
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}

export default EditProduct
