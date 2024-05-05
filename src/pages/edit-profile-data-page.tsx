import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuthContext } from "@/context/AuthContext"
import { useState } from "react"
import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { ClipLoader } from "react-spinners"
import { toast } from "react-toastify"

const EditProfileDataPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { user, userId, setUser } = useAuthContext()

  const userFormSchema = z.object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    image: z.string().optional(),
  })

  type UserFormType = z.infer<typeof userFormSchema>

  const { register, handleSubmit } = useForm<UserFormType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      image: user?.image,
    },
  })

  const handleUpdateUser = async (data: UserFormType) => {}

  return (
    <section className="mt-0 w-full">
      <div className="flex items-center justify-between w-full p-3">
        <h1 className="font-bold text-[20px] text-center">
          Editar os dados pessoais
        </h1>
        <Button variant={"outline"} className="flex gap-x-2">
          <FaArrowLeft size={12} />
          <Link to={`/profile/${userId!!}`}>Voltar ao perfil</Link>
        </Button>
      </div>
      <form
        onSubmit={handleSubmit(handleUpdateUser)}
        className="w-ful flex flex-col space-y-3 p-3"
      >
        <div className="w-[100px] h-[100px]">
          <label htmlFor="file" className="cursor-pointer">
            <img
              src={user?.image}
              className="w-full h-full rounded-full"
              alt="user profile image"
            />
          </label>
          <Input id="file" type="file" className="opacity-0" />
        </div>
        <Input
          type="text"
          // onChange={()=> setFirstname(e.target.value)}
          {...register("firstname")}
          className="w-full p-2 rounded-md  border"
          placeholder="Nome"
        />
        <Input
          type="text"
          // onChange={()=> setFirstname(e.target.value)}
          {...register("lastname")}
          className="w-full p-2 rounded-md border"
          placeholder="Sobrenome"
        />
        <Button
          disabled={isLoading}
          className="self-start flex items-center justify-center w-[200px]"
        >
          {isLoading ? (
            <ClipLoader size={22} color="#FFF" />
          ) : (
            "Atualizar alterações"
          )}
        </Button>
      </form>
    </section>
  )
}

export default EditProfileDataPage
