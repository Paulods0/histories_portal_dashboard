import { User } from "@/types/data"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChangeEvent, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
// import {
//   deleteImageFromFirebase,
//   uploadImageToFirebaseStorage,
// } from "@/utils/helpers"
import { toast } from "react-toastify"
import { useUpdateUser } from "@/lib/react-query/mutations"
import { EditUserFormType, editUserFormSchema } from "@/types/form-schema"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { UpdateUser } from "@/types/update"
import FormButton from "../forms/form-ui/form-button"

type Props = {
  user: User
}

const EditUserDialog = ({ user }: Props) => {
  const { mutate } = useUpdateUser()
  const [imageToShow, setImageToShow] = useState("")

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = useForm<EditUserFormType>({
    resolver: zodResolver(editUserFormSchema),
    defaultValues: {
      role: user.role,
    },
  })

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const imgURL = URL.createObjectURL(file)
      setImageToShow(imgURL)
    }
  }
  const handleRemoveImage = () => {
    setImageToShow("")
  }

  const handleSelectRole = (value: EditUserFormType["role"]) => {
    setValue("role", value)
  }

  const handleUpdateUser = async (data: EditUserFormType) => {
    try {
      let newUser: UpdateUser = {
        id: user._id,
        firstname: data.firstname,
        image: data.image,
        lastname: data.lastname,
        role: data.role,
      }
      mutate(newUser)
      toast.success("Atualizado com sucesso")
    } catch (error) {
      toast.error("Erro ao atualizar usuário")
    }
  }

  // const handleUpdateUser = async (data: EditUserFormType) => {
  //   console.log(data)
  // }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Editar</Button>
      </DialogTrigger>
      <DialogContent className="border-white/15 bg-foreground">
        <Card className="border-none bg-foreground shadow-none">
          <CardHeader>
            <CardTitle className="text-white">Editar usuário</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(handleUpdateUser)}
              className="space-y-4 flex flex-col items-center"
            >
              <div className="relative">
                <label htmlFor="image" className="flex w-auto flex-col">
                  <Controller
                    control={control}
                    name="image"
                    render={({ field: { onChange } }) => (
                      <Input
                        onChange={(e) => {
                          onChange(e.target!!.files!![0]!!)
                          handleChangeImage(e)
                        }}
                        id="image"
                        type="file"
                        className="opacity-0 w-0 h-0"
                      />
                    )}
                  />
                  <div className="p-2 w-fit ">
                    <Avatar className="size-32">
                      <AvatarFallback>
                        {user.firstname[0]}
                        {user.lastname[0]}
                      </AvatarFallback>

                      <AvatarImage
                        src={imageToShow ? imageToShow : user.image}
                      />
                    </Avatar>
                  </div>
                </label>

                {imageToShow && (
                  <div
                    onClick={handleRemoveImage}
                    className="bg-black/50 p-2 rounded-full cursor-pointer size-8 absolute z-50 hover:bg-black/30 transition-all duration-200 -top-0 text-lg -right-2"
                  >
                    <AiOutlineClose color="#FFF" />
                  </div>
                )}
              </div>
              <Input {...register("firstname")} defaultValue={user.firstname} />
              <Input {...register("lastname")} defaultValue={user.lastname} />

              <Select defaultValue={user.role} onValueChange={handleSelectRole}>
                <SelectTrigger className="bg-foreground text-background">
                  <SelectValue placeholder={user.role} />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="store-manager">Gestor de loja</SelectItem>
                  <SelectItem value="publicator">Publicador</SelectItem>
                </SelectContent>
              </Select>

              <FormButton
                isSubmitting={isSubmitting}
                text="Atualizar"
                buttonColor="#FFF"
              />
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

export default EditUserDialog
