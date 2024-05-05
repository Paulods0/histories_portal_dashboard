import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { EyeIcon, EyeOff } from "lucide-react"
import { useState } from "react"

const formSchema = z.object({
  image: z.custom<File>().optional(),
  firstname: z.string().min(2, "Por favor preencha este campo."),
  lastname: z.string().min(2, "Por favor preencha este campo."),
  email: z.string().email().min(2, "Por favor insira um email válido."),
  password: z.string().min(6, "Deve conter no mínimo 6 caracteres."),
})

type FormType = z.infer<typeof formSchema>

const UserForm = () => {
  const [showPass, setShowPass] = useState(false)

  const show = () => {
    setShowPass(true)
  }
  const hide = () => {
    setShowPass(false)
  }

  const { handleSubmit, register } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  })

  const handleSaveUser = (data: FormType) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(handleSaveUser)} className="space-y-4">
      <Input {...register("image")} placeholder="Imagem" type="file" />
      <Input {...register("firstname")} type="text" placeholder="Nome" />
      <Input {...register("lastname")} type="text" placeholder="Sobrenome" />
      <Input {...register("email")} type="email" placeholder="Email" />
      <div className="relative flex items-center w-full">
        <Input
          {...register("password")}
          type={showPass ? "text" : "password"}
          placeholder="Password"
          className="w-full"
        />
        {showPass ? (
          <button onClick={hide} className="absolute right-2">
            <EyeOff />
          </button>
        ) : (
          <button onClick={show} className="absolute right-2">
            <EyeIcon />
          </button>
        )}
      </div>
      <Button type="submit" variant={"secondary"}>
        Salvar
      </Button>
    </form>
  )
}

export default UserForm
