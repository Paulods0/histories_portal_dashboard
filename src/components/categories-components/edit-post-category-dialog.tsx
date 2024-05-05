import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { useUpdatePostCategory } from "@/lib/react-query/mutations"
import { toast } from "react-toastify"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

type Props = {
  name: string
  id: string
}

const formSchema = z.object({
  name: z.string().min(3, "*O nome deve ter pelo menos 3 caracteres"),
})
type FormSchemaType = z.infer<typeof formSchema>

const EditPostCategoryDialog = ({ name, id }: Props) => {
  const { mutateAsync, isPending } = useUpdatePostCategory()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
    },
  })

  const handleUpdatePostCategory = (data: FormSchemaType) => {
    try {
      const sendData = {
        id: id,
        name: data.name,
      }
      mutateAsync(sendData)
      toast.success("Atualizado com sucesso")
    } catch (error) {
      toast.error("Erro ao atualizar, por favor tente novamente.")
      console.log(error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"} className="text-xs">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-foreground">
        <DialogHeader>
          <DialogTitle className="text-background">
            Editar o categoria
          </DialogTitle>
        </DialogHeader>

        <form
          className="mt-2 flex flex-col gap-3"
          onSubmit={handleSubmit(handleUpdatePostCategory)}
        >
          <div className="w-full flex flex-col">
            <input
              type="text"
              className="bg-transparent w-full text-background border rounded-md outline-none p-2 "
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-600 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button variant={"default"}>Cancelar</Button>
            </DialogClose>

            <Button disabled={isPending} type="submit" variant={"outline"}>
              {isPending ? "Atualizando..." : "Atualizar alterações"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditPostCategoryDialog
