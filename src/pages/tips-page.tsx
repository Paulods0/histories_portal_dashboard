import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { LuPlus } from "react-icons/lu"

const TipsPage = () => {
  return (
    <main className="h-full w-full gap-12 flex flex-col items-center justify-center">
      <img
        src="logotipo-tradicional.png"
        className="size-64 mt-28 object-cover"
        alt=""
      />

      <div className="w-96 mx-auto px-4 gap-8 justify-center flex items-center">
        <Button variant={"outline"} asChild className="p-6">
          <Link to={"/dicas/todas"}>Ver todas as dicas</Link>
        </Button>

        <Button variant={"default"} asChild className="p-6">
          <Link to={"/dicas/adicionar"} className="flex items-center gap-1">
            <LuPlus />
            Adicionar dica
          </Link>
        </Button>
      </div>
    </main>
  )
}

export default TipsPage
