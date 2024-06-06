import { ChangeEvent, useState } from "react"

import { User } from "@/types/data"
import { toast } from "react-toastify"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { AiOutlineClose } from "react-icons/ai"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useUpdateUser } from "@/lib/react-query/mutations/user-mutation"
import { EditUserFormType, editUserFormSchema } from "@/types/form-schema"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import FormButton from "../forms/form-ui/form-button"
import {
  deleteImageFromFirebase,
  uploadImageToFirebaseStorage,
} from "@/utils/helpers"
import { UpdateUser } from "@/types/update"

type Props = {
  user: User
}

const EditUserDialog = ({ user }: Props) => {
  const { mutate } = useUpdateUser()
  const [imageToShow, setImageToShow] = useState<string | null>(null)

  const {
    control,
    setValue,
    register,
    handleSubmit,
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
      setValue("image", file)
    } else {
      console.log("There's no image to show")
    }
  }
  const handleRemoveImage = () => {
    setImageToShow(null)
  }

  const handleSelectRole = (value: EditUserFormType["role"]) => {
    setValue("role", value)
  }

  const handleUpdateUser = async (data: EditUserFormType) => {
    let newUser: UpdateUser
    try {
      if (imageToShow) {
        if (user.image) {
          await deleteImageFromFirebase(user.image!!, "profile")
        }
        const imageURL = await uploadImageToFirebaseStorage(
          data.image!!,
          "profile"
        )
        newUser = {
          id: user._id,
          image: imageURL,
          role: data.role,
          firstname: data.firstname,
          lastname: data.lastname,
        }
      } else {
        newUser = {
          id: user._id,
          role: data.role,
          image: user.image,
          lastname: data.lastname,
          firstname: data.firstname,
        }
      }

      mutate(newUser)
      toast.success("Atualizado com sucesso")
    } catch (error) {
      toast.error("Erro ao atualizar usuário")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Editar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-background">Editar usuário</DialogTitle>
        </DialogHeader>
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
                  <AvatarFallback className="bg-foreground text-background border-2 border-zinc-200">
                    {user.firstname[0]}
                    {user.lastname[0]}
                  </AvatarFallback>

                  <AvatarImage src={imageToShow ? imageToShow : user.image} />
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
          <Input
            className="bg-foreground"
            {...register("firstname")}
            defaultValue={user.firstname}
          />
          <Input
            className="bg-foreground"
            {...register("lastname")}
            defaultValue={user.lastname}
          />

          <Select defaultValue={user.role} onValueChange={handleSelectRole}>
            <SelectTrigger className="bg-foreground text-background">
              <SelectValue placeholder={user.role} />
            </SelectTrigger>

            <SelectContent className="bg-foreground text-background">
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="store-manager">Gestor de loja</SelectItem>
              <SelectItem value="publicator">Publicador</SelectItem>
            </SelectContent>
          </Select>

          <FormButton
            variant="default"
            text="Atualizar"
            className="self-start"
            isSubmitting={isSubmitting}
          />
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditUserDialog
