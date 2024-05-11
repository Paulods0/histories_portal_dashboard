import { useCreatePostCategory } from "@/lib/react-query/mutations"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthContext } from "@/context/auth-context"
import { toast } from "react-toastify"

const formSchema = z.object({
  name: z.string().min(2, "Por favor preencha este campo"),
})
type FormType = z.infer<typeof formSchema>

const PostCategoryForm = () => {
  const { userId } = useAuthContext()
  if (!userId) return

  const { mutateAsync, isPending } = useCreatePostCategory()
  const { register, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  })

  const handleSaveData = (data: FormType) => {
    try {
      const dataValues = {
        name: data.name,
        user_id: userId,
      }

      mutateAsync(dataValues)
      toast.success("Criado com sucesso")
    } catch (error) {
      toast.error("Erro ao criar uma nova categoria, por favor tente novamente")
    }
  }
  return (
    <form onSubmit={handleSubmit(handleSaveData)} className="w-full space-y-2">
      <Input
        placeholder="Nome"
        {...register("name")}
        className="w-full bg-transparent"
      />
      <Button disabled={isPending} type="submit" variant={"secondary"}>
        {isPending ? "Salvando..." : "Salvar"}
      </Button>
    </form>
  )
}

export default PostCategoryForm
