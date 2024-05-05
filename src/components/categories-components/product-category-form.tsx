import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useCreateProductCategory } from "@/lib/react-query/mutations"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "react-toastify"

const formSchema = z.object({
  name: z.string().min(2, "Por favor preencha este campo"),
})
type FormType = z.infer<typeof formSchema>

const ProductCategoryForm = () => {
  const { mutateAsync, isPending } = useCreateProductCategory()
  const { register, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  })

  const handleSaveData = (data: FormType) => {
    try {
      mutateAsync(data.name)
      toast.success("Criado com sucesso")
    } catch (error) {
      toast.error("Erro ao criar uma nova categoria, por favor tente novamente")
    }
  }
  return (
    <form onSubmit={handleSubmit(handleSaveData)} className="w-full space-y-2">
      <Input
        {...register("name")}
        placeholder="Nome"
        className="w-full bg-transparent"
      />
      <Button disabled={isPending} type="submit" variant={"secondary"}>
        {isPending ? "Salvando..." : "Salvar"}
      </Button>
    </form>
  )
}

export default ProductCategoryForm
