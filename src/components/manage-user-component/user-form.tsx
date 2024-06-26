import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Input } from "../ui/input"
import { toast } from "react-toastify"
import { NewUser } from "@/types/create"
import { ChangeEvent, useState } from "react"
import { EyeIcon, EyeOff } from "lucide-react"
import InputField from "../forms/form-ui/input-field"
import FormButton from "../forms/form-ui/form-button"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { uploadImageToFirebaseStorage } from "@/utils/helpers"
import { UserFormType, userFormSchema } from "@/types/form-schema"
import { useCreateUser } from "@/lib/react-query/mutations/user-mutation"

const UserForm = () => {
  const { mutate } = useCreateUser()

  const [showPass, setShowPass] = useState(false)
  const [image, setImage] = useState<string | null>(null)

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const imageURL = URL.createObjectURL(file)
      setImage(imageURL)
    }
  }

  const togglePassword = () => {
    setShowPass((prev) => !prev)
  }

  const methods = useForm<UserFormType>({
    resolver: zodResolver(userFormSchema),
  })
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = methods

  const handleSelectRole = (value: UserFormType["role"]) => {
    setValue("role", value)
  }

  const handleSaveUser = async (data: UserFormType) => {
    console.log(data)
    try {
      let useData: NewUser
      if (image) {
        const url = await uploadImageToFirebaseStorage(data.image!!, "profile")
        useData = {
          firstname: data.firstname,
          lastname: data.lastname,
          password: data.password,
          email: data.email,
          image: url,
          role: data.role,
        }
        console.log(data)
      } else {
        useData = {
          firstname: data.firstname,
          lastname: data.lastname,
          password: data.password,
          email: data.email,
          role: data.role,
          image: undefined,
        }
      }
      mutate(useData)
      toast.success("Usuário adicionado com sucesso")
      console.log(useData)
      reset()
    } catch (error) {
      toast.error("Erro ao criar usuário, tente novamente")
      console.log("Erro ao criar usuário :" + error)
      reset()
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSaveUser)} className="space-y-4">
        {image && (
          <img src={image} className="size-32 object-contain aspect-ratio" />
        )}

        <Input
          type="file"
          accept=".jpg, .png, .jpeg"
          {...register("image")}
          onChange={handleImage}
          className="file:text-white"
        />

        <InputField
          className="bg-foreground text-background"
          label="Nome"
          {...register("firstname")}
          error={errors.firstname}
        />

        <InputField
          className="bg-foreground text-background"
          label="Sobrenome"
          {...register("lastname")}
          error={errors.lastname}
        />

        <InputField
          className="bg-foreground text-background"
          label="Email"
          {...register("email")}
          error={errors.email}
        />

        <div className="relative">
          <InputField
            type={showPass ? "text" : "password"}
            className="bg-foreground text-background"
            label="Password"
            {...register("password")}
            error={errors.password}
          />
          <div onClick={togglePassword} className="absolute right-2 top-1/2 ">
            {showPass ? <EyeOff /> : <EyeIcon />}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Select onValueChange={handleSelectRole}>
            <SelectTrigger className="bg-foreground text-background">
              <SelectValue placeholder="Role" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="store-manager">Gestor de loja</SelectItem>
              <SelectItem value="publicator">Publicador</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && (
            <span className="text-xs text-red-600">{errors.role.message}</span>
          )}
        </div>

        <FormButton
          variant="secondary"
          isSubmitting={isSubmitting}
          text="Salvar"
        />
      </form>
    </FormProvider>
  )
}

export default UserForm
