import { useEffect, useState } from "react"
import { ICategoryData } from "../../interfaces"
import { deleteCategory, getAllCategories } from "../../api"
import { ClipLoader } from "react-spinners"
import DataRow from "./DataRow"

const TopicsTable = () => {
  const [topics, setTopics] = useState<ICategoryData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCategories()
      setTopics(data)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return (
    <table className="w-full flex p-2 flex-col rounded-lg h-full border gap-4 border-GRAY-LIGHTER">
      <tr className="w-full justify-between flex border-b border-GRAY-LIGHTER">
        <th className="w-full text-[14px]">Nº</th>
        <th className="w-full text-[14px]">Nome</th>
        <th className="w-full text-[14px]">Criado por</th>
        <th className="w-full text-[14px]">Data de criação</th>
        <th className="w-full text-[14px]">Ações</th>
      </tr>

      {isLoading ? (
        <td className="w-full h-full flex items-center justify-center">
          <ClipLoader color="#111111" size={40} />
        </td>
      ) : (
        topics.map((topic, index) => (
          <DataRow
            handleDelete={deleteCategory}
            key={index}
            hasCreator
            data={topic}
            index={index}
          />
        ))
      )}
    </table>
  )
}

export default TopicsTable
