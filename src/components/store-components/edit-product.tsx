import {
  deleteImageFromFirebase,
  uploadImageToFirebaseStorage,
} from "@/utils/helpers"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  EditProductFormSchemaType,
  editProductFormSchema,
} from "@/types/form-schema"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { toast } from "react-toastify"
import { Product } from "@/types/data"
import { CiEdit } from "react-icons/ci"
import { ChangeEvent, useState } from "react"
import SelectCategory from "./select-category"
import { UpdateProduct } from "@/types/update"
import InputField from "../forms/form-ui/input-field"
import { zodResolver } from "@hookform/resolvers/zod"
import FormButton from "../forms/form-ui/form-button"
import TextAreaField from "../forms/form-ui/text-area-field"
import { FormProvider, UseFormReturn, useForm } from "react-hook-form"
import { useUpdateProduct } from "@/lib/react-query/mutations/product-mutation"

type Props = {
  product: Product
}

const EditProduct = ({ product }: Props) => {
  const { mutate } = useUpdateProduct()
  const [imageToShow, setImageToShow] = useState("")

  const editProductForm: UseFormReturn<EditProductFormSchemaType> =
    useForm<EditProductFormSchemaType>({
      resolver: zodResolver(editProductFormSchema),
      defaultValues: {
        name: product.name,
        image: product.image,
        price: product.price,
        category: product.category,
        description: product.description,
      },
    })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = editProductForm

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      const file = e.target.files[0]
      const imageURL = URL.createObjectURL(file)
      setImageToShow(imageURL)
    }
  }

  const handleSubmitForm = async (data: EditProductFormSchemaType) => {
    try {
      let updatedProduct: UpdateProduct
      if (imageToShow) {
        await deleteImageFromFirebase(product.image, "products")
        const newImageURL = await uploadImageToFirebaseStorage(
          data.image!! as File,
          "products"
        )
        updatedProduct = {
          ...data,
          image: newImageURL,
          id: product._id,
        }
      } else {
        updatedProduct = {
          ...data,
          id: product._id,
        }
      }
      mutate(updatedProduct)
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
            <>
              <img
                src={imageToShow ? imageToShow : product.image}
                className="size-24 object-contain mb-2"
              />

              <Label htmlFor="image" className="cursor-pointer">
                <Input
                  className="bg-foreground file:text-background"
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
            <TextAreaField
              className="bg-foreground text-background outline-none"
              label="Descrição"
              {...register("description")}
            />

            <SelectCategory product={product} />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"destructive"}>Cancelar</Button>
              </DialogClose>

              <FormButton
                isSubmitting={isSubmitting}
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
