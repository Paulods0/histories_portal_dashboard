import { User } from "@/types/data"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { z } from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChangeEvent, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import {
  deleteImageFromFirebase,
  uploadImageToFirebaseStorage,
} from "@/utils/helpers"
import { toast } from "react-toastify"
import { useUpdateUser } from "@/lib/react-query/mutations"

type Props = {
  user: User
}

const userFormSchema = z.object({
  image: z.custom<File>().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
})

type UserFormType = z.infer<typeof userFormSchema>

const EditUserDialog = ({ user }: Props) => {
  const { mutate, isPending } = useUpdateUser()
  const [imageToShow, setImageToShow] = useState("")

  const { register, handleSubmit, control } = useForm<UserFormType>({
    resolver: zodResolver(userFormSchema),
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

  const handleUpdateUser = async (data: UserFormType) => {
    try {
      let downloadURL
      if (data.image) {
        if (user.image) {
          deleteImageFromFirebase(user.image, "products")
        }
        downloadURL = await uploadImageToFirebaseStorage(data.image, "profile")
      }
      const formData = {
        id: user._id,
        user: { ...data, image: downloadURL },
      }

      mutate(formData)
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

              <div className="flex my-4 self-start gap-4">
                <Button disabled={isPending} type="submit" variant={"default"}>
                  {isPending ? "Salvando..." : "Salvar alterações"}
                </Button>
                <DialogClose asChild>
                  <Button variant={"destructive"}>Cancelar</Button>
                </DialogClose>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

export default EditUserDialog
