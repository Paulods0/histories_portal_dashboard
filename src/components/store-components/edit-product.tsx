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
import InputField from "../forms/form-inputs/input-field"

type Props = {
  product: Product
}

const EditProduct = ({ product }: Props) => {
  const { mutate } = useUpdateProduct()
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
    reset,
    formState: { isSubmitting, errors },
  } = editProductForm

  const handleSubmitForm = (data: EditProductFormSchemaType) => {
    try {
      const updatedProduct: UpdateProduct = {
        ...data,
        id: product._id,
      }
      mutate(updatedProduct)
      console.log(updatedProduct)
      toast.success("Atualizado com sucesso")
      reset()
    } catch (error) {
      console.log("Erro: " + error)
      toast.error("Erro ao atualizar post")
      reset()
    }
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
            <Label htmlFor="image" className="cursor-pointer">
              <Input
                className="placeholder:text-white text-white"
                type="file"
                {...register("image")}
                accept=".jpg, .png, .jpeg"
                id="image"
              />
              {errors.image && (
                <span className="text-xs text-red-600">
                  {errors.image.message}
                </span>
              )}
            </Label>

            <InputField label="Título" {...register("name")} />
            <InputField label="Preço" {...register("price")} type="number" />

            <SelectCategory product={product} />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"default"}>Cancelar</Button>
              </DialogClose>

              <Button
                disabled={isSubmitting}
                type="submit"
                variant={"secondary"}
              >
                {isSubmitting ? (
                  <ClipLoader size={14} />
                ) : (
                  "Atualizar alterações"
                )}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}

export default EditProduct
