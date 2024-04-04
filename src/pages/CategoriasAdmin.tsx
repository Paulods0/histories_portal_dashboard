import { FormEvent, useState } from "react"
import CategoriesFilterContainer from "../components/Categories_Components/CategoriesFilterContainer"
import { createCategory, createProductCategory } from "../api"
import { ClipLoader } from "react-spinners"
import { useAuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"

const CategoriasAdmin = () => {
  const { user } = useAuthContext()
  const [container, setContainer] = useState<"topic" | "category">("topic")
  const [topicName, setTopicName] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCreateCategory, setIsLoadingCreateCategory] = useState(false)

  const handleAddTopic = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await createCategory(topicName, user!!.id)
    setIsLoading(false)
    toast.success("Tópico criado com sucesso", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
    })
    setTopicName("")
    window.location.reload()
  }
  const handleAddCategory = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoadingCreateCategory(true)
    await createProductCategory(categoryName)
    setIsLoadingCreateCategory(false)
    toast.success("Tópico criado com sucesso", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
    })
    setCategoryName("")
  }

  const setTopic = () => {
    setContainer("topic")
  }
  const setCategory = () => {
    setContainer("category")
  }

  return (
    <main className="w-full grid grid-cols-3 place-items-center gap-2 h-full">
      {/** LEFT SIDE */}
      <div className="w-full h-full flex flex-col col-span-2 gap-4">
        <CategoriesFilterContainer />
      </div>

      {/** RIGHT SIDE */}
      <div className="w-full h-full p-2 flex flex-col items-center justify-center gap-6">
        <div className="w-full flex gap-3 items-center">
          <button
            onClick={setTopic}
            className={`px-3 py-1 rounded-md border ${
              container === "topic"
                ? "bg-BLACK text-white"
                : " border-GRAY-LIGHTER text-BLACK"
            }`}
          >
            Adicionar tópico
          </button>
          <button
            onClick={setCategory}
            className={`px-3 py-1 rounded-md border ${
              container === "category"
                ? "bg-BLACK text-white"
                : " border-GRAY-LIGHTER text-BLACK"
            }`}
          >
            Adicionar categoria
          </button>
        </div>

        {container === "topic" ? (
          <form className="p-2 w-full items-center gap-2 flex flex-col">
            <h1 className="text-xl font-bold text-BLACK uppercase">
              Adicionar um tópico
            </h1>
            <div className="w-full p-2 border  border-GRAY-LIGHTER rounded-lg">
              <input
                type="text"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                placeholder="Nome do tópico"
                className="bg-transparent w-full  outline-none border-none"
              />
            </div>

            <button
              onClick={handleAddTopic}
              className="bg-BLACK px-3 py-1 rounded-md uppercase text-white w-full"
            >
              {isLoading ? (
                <span className="w-full items-center justify-center flex">
                  <ClipLoader size={24} color="#FFF" />
                </span>
              ) : (
                "adicionar tópico"
              )}
            </button>
          </form>
        ) : (
          <form className="p-2 w-full items-center gap-2 flex flex-col">
            <h1 className="text-xl font-bold text-BLACK uppercase">
              Adicionar uma categoria
            </h1>
            <div className="w-full p-2 border  border-GRAY-LIGHTER rounded-lg">
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Nome da categoria"
                className="bg-transparent w-full  outline-none border-none"
              />
            </div>

            <button
              disabled={isLoadingCreateCategory}
              onClick={handleAddCategory}
              className="bg-BLACK px-3 py-1 rounded-md uppercase text-white w-full"
            >
              {isLoadingCreateCategory ? (
                <span className="w-full items-center justify-center flex">
                  <ClipLoader size={24} color="#FFF" />
                </span>
              ) : (
                "adicionar categoria"
              )}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}

export default CategoriasAdmin
