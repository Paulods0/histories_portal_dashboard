import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { EyeIcon, EyeOff } from "lucide-react"
import { useState } from "react"
import { UserFormType, userFormSchema } from "@/types/form-schema"
import { useCreateUser } from "@/lib/react-query/mutations"
import { toast } from "react-toastify"
import { NewUser } from "@/types/create"
import { uploadImageToFirebaseStorage } from "@/utils/helpers"
import { ClipLoader } from "react-spinners"

const UserForm = () => {
  const { mutate } = useCreateUser()

  const [image, setImage] = useState<any>()
  const [showPass, setShowPass] = useState(false)
  const [isLoading, setisLoading] = useState(false)

  const show = () => {
    setShowPass(true)
  }
  const hide = () => {
    setShowPass(false)
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserFormType>({
    resolver: zodResolver(userFormSchema),
  })

  const handleSaveUser = async (data: UserFormType) => {
    setisLoading(true)
    try {
      let useData: NewUser

      if (image) {
        const url = await uploadImageToFirebaseStorage(image, "profile")
        useData = {
          firstname: data.firstname,
          lastname: data.lastname,
          password: data.password,
          email: data.email,
          image: url,
        }
      } else {
        useData = {
          firstname: data.firstname,
          lastname: data.lastname,
          password: data.password,
          email: data.email,
          image: undefined,
        }
      }

      mutate(useData)
      setisLoading(false)
      toast.success("Usuário adicionado com sucesso")
      console.log(useData)
    } catch (error) {
      console.log("Erro ao criar usuário :" + error)
      toast.error("Erro ao criar usuário, tente novamente")
      setisLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSaveUser)} className="space-y-4">
      <Input
        onChange={(e) => setImage(e.target.files ? e.target.files[0] : "")}
        placeholder="Imagem"
        type="file"
      />

      <div className="w-full flex flex-col">
        <Input {...register("firstname")} type="text" placeholder="Nome" />
        {errors.firstname && (
          <span className="text-xs text-red-600">
            {errors.firstname.message}
          </span>
        )}
      </div>

      <div className="w-full flex flex-col">
        <Input {...register("lastname")} type="text" placeholder="Sobrenome" />
        {errors.lastname && (
          <span className="text-xs text-red-600">
            {errors.lastname.message}
          </span>
        )}
      </div>

      <div className="w-full flex flex-col">
        <Input {...register("email")} placeholder="Email" />
        {errors.email && (
          <span className="text-xs text-red-600">{errors.email.message}</span>
        )}
      </div>
      
      <div className="w-full flex flex-col">
        <div className="relative flex items-center w-full">
          <Input
            {...register("password")}
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="w-full"
          />
          {showPass ? (
            <button type="button" onClick={hide} className="absolute right-2">
              <EyeOff />
            </button>
          ) : (
            <button type="button" onClick={show} className="absolute right-2">
              <EyeIcon />
            </button>
          )}
        </div>

        {errors.password && (
          <span className="text-xs text-red-600">
            {errors.password.message}
          </span>
        )}
      </div>

      <Button disabled={isLoading} type="submit" variant={"secondary"}>
        {isLoading ? <ClipLoader size={16} /> : "Criar"}
      </Button>
    </form>
  )
}

export default UserForm
