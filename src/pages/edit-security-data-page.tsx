import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/auth-context"

const EditSecurityDataPage = () => {
  const { user, userId } = useAuthContext()
  return (
    <section className="mt-2">
      <div className="flex items-center justify-between w-full p-3">
        <h1 className="font-bold text-sm md:text-base lg:text-xl">
          Editar os dados de segurança
        </h1>
        <Button variant={"outline"} className="flex gap-x-2">
          <FaArrowLeft size={12} className="hidden lg:inline-block" />
          <Link to={`/profile/${userId!!}`}>Voltar ao perfil</Link>
        </Button>
      </div>

      <form className="w-full p-3 space-y-3">
        <Input
          type="email"
          value={user?.email}
          className="w-full p-2 rounded-md border"
          placeholder="email"
        />

        <Input
          type="password"
          className="w-full p-2 rounded-md border"
          placeholder="Password atual"
        />

        <Input
          type="password"
          className="w-full p-2 rounded-md border"
          placeholder="Password nova"
        />
        <div>
          <Link
            to={"/settings/forgotpassword"}
            className="text-blue-700 text-[12px] underline"
          >
            Esqueceu a sua password?
          </Link>
        </div>
        <Button className="self-start">Atualizar alterações</Button>
      </form>
    </section>
  )
}

export default EditSecurityDataPage
