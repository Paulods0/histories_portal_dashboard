import { ChangeEvent, useState } from "react"

import z from "zod"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { FaArrowLeft } from "react-icons/fa"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthContext } from "@/context/auth-context"
import FormButton from "@/components/forms/form-ui/form-button"

const userFormSchema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  image: z.string().optional(),
})

type UserFormType = z.infer<typeof userFormSchema>

const EditProfileDataPage = () => {
  const { user, userId } = useAuthContext()
  const [newImage, setNewImage] = useState<string | null>(null)

  function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const image = e.target.files[0]
      const imageURL = URL.createObjectURL(image)
      setNewImage(imageURL)
    }
  }

  function removeImage() {
    setNewImage(null)
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserFormType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      image: user?.image,
    },
  })

  type UpdateUserProfile = {
    id: string
    image?: string
    firstname?: string
    lastname?: string
  }

  const handleUpdateUser = async (data: UserFormType) => {
    try {
      let payload: UpdateUserProfile

      if (newImage) {
        payload = {
          id: userId!!,
          image: "newImage",
          lastname: data.lastname,
          firstname: data.firstname,
        }
        console.log("Há uma nova imagem para atualizar")
      } else {
        payload = {
          id: userId!!,
          image: user!!.image!!,
          lastname: data.lastname,
          firstname: data.firstname,
        }
        console.log("Não há imagem para atualizar")
      }
      console.log(payload)
      toast.success("Os seus dados forama atulizados com sucesso")
    } catch (error) {
      toast.error("Erro ao atualzar os dados")
    }
  }

  return (
    <section className="mt-0 w-full">
      <div className="flex items-center justify-between w-full p-3">
        <h1 className="font-bold text-sm md:text-base lg:text-xl text-center">
          Editar os dados pessoais
        </h1>
        <Button variant={"outline"} asChild>
          <div className="flex gap-x-2">
            <FaArrowLeft size={12} className="hidden md:inline-block" />
            <Link to={`/profile/${userId!!}`}>Voltar ao perfil</Link>
          </div>
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(handleUpdateUser)}
        className="w-ful flex flex-col space-y-3 p-3"
      >
        {newImage ? (
          <img
            src={newImage}
            className="size-24 object-cover rounded-full"
            alt="user profile image"
          />
        ) : (
          <img
            src={user?.image}
            className="size-24 object-cover rounded-full"
            alt="user profile image"
          />
        )}
        <div className="w-full flex gap-2 flex-col items-end">
          <button
            type="button"
            onClick={removeImage}
            disabled={newImage === null}
            className="bg-red-700 disabled:bg-zinc-400 text-white px-3 py-2 rounded-lg"
          >
            Remover imagem
          </button>
          <Input type="file" className="" onChange={handleChangeImage} />
        </div>

        <Input
          type="text"
          {...register("firstname")}
          className="w-full p-2 rounded-md  border"
          placeholder="Nome"
        />
        <Input
          type="text"
          {...register("lastname")}
          className="w-full p-2 rounded-md border"
          placeholder="Sobrenome"
        />
        <FormButton text="Atualizar perfil" isSubmitting={isSubmitting} />
      </form>
    </section>
  )
}

export default EditProfileDataPage
