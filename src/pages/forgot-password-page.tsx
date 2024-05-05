import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ForgotPasswordPage = () => {
  
  return (
    <main className="w-full min-h-svh flex-col flex items-center justify-center">
      <h1 className="mb-4 font-semibold text-[22px] capitalize">
        Crie uma nova password
      </h1>
      <form className="flex flex-col w-[400px] gap-y-3">
        <Input placeholder="Email" />
        <Input placeholder="Nova password" />
        <Button>Atualizar os dados</Button>
      </form>
    </main>
  )
}

export default ForgotPasswordPage
