import { useEffect, useState } from "react"
import { ICategoryData } from "../../interfaces"
import { deleteProductCategory, getAllProdutCategories } from "../../api"
import { ClipLoader } from "react-spinners"
import DataRow from "./DataRow"

const CategoriesTable = () => {
  const [productCategories, setProductCategories] = useState<ICategoryData[]>(
    []
  )
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProdutCategories()
      setProductCategories(data)
      setIsLoading(false)
    }
    fetchData()
  }, [])
  return (
    <table className="w-full flex p-2 flex-col rounded-lg h-full border gap-4 border-GRAY-LIGHTER">
      <tr className="w-full justify-end flex border-b border-GRAY-LIGHTER">
        <th className="w-full font-bold text-[14px]">Nº</th>
        <th className="w-full font-bold text-[14px]">Nome</th>
        <th className="w-full font-bold text-[14px]">Data de criação</th>
        <th className="w-full font-bold text-[14px]">Ações</th>
      </tr>

      {isLoading ? (
        <th className="w-full h-full flex items-center justify-center">
          <ClipLoader color="#111111" size={40} />
        </th>
      ) : (
        productCategories.map((category, index) => (
          <DataRow
            handleDelete={deleteProductCategory}
            key={index}
            hasCreator={false}
            data={category}
            index={index}
          />
        ))
      )}
    </table>
  )
}

export default CategoriesTable
