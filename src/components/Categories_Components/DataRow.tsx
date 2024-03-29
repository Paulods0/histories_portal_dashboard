import { useState } from "react"
import { ICategoryData } from "../../types"
import { ClipLoader } from "react-spinners"
import { deleteCategory } from "../../api/apiCalls"
import { toast } from "react-toastify"

type RowDataType = {
  data: ICategoryData
  index: number
  hasCreator: boolean
  handleDelete: (id: string) => Promise<void>
}

const DataRow = ({ data, index, hasCreator, handleDelete }: RowDataType) => {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)

  const handleDeleteTopic = async (id: string) => {
    try {
      setIsLoadingDelete(true)
      await handleDelete(id)
      setIsLoadingDelete(false)
      toast.success("Apagago com sucesso", {
        autoClose: 1000,
        hideProgressBar: true,
      })
    } catch (error) {
      console.log(error)
      toast.error("Erro ao apagar", {
        autoClose: 1000,
        hideProgressBar: true,
      })
    }
    window.location.reload()
  }
  return (
    <tr
      key={data._id}
      className="w-full text-center border-b border-b-GRAY-LIGHTER py-2 flex "
    >
      <td className="w-full text-[14px]">{index + 1}</td>
      <td className="w-full text-[14px]">{data.name}</td>
      {hasCreator && (
        <td className="w-full text-[14px]">{`${data.creator?.firstname} ${data.creator?.lastname}`}</td>
      )}
      <td className="w-full text-[14px]">
        {data.createdAt.split("T")[0].split("-").reverse().join("-")}
      </td>

      <td className="w-full justify-center flex gap-2">
        <button className="rounded-md px-2 border border-GRAY-LIGHTER py-[2px] text-BLACK text-[14px]">
          Editar
        </button>

        <button
          onClick={() => handleDeleteTopic(data._id)}
          className="bg-RED-DARK rounded-md px-2  py-[2px] text-white text-[14px]"
        >
          {isLoadingDelete ? <ClipLoader color="#FFF" size={10} /> : "Apagar"}
        </button>
      </td>
    </tr>
  )
}

export default DataRow
