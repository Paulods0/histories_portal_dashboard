import { ClipLoader } from "react-spinners"
import { deleteImageFromFirebase } from "../utils/helpers"
import { useState } from "react"
import { toast } from "react-toastify"
import { deleteProduct } from "../api"

type IProdutcCard = {
  product: {
    _id?: string
    image?: string
    name?: string
    price?: string
    category?: {
      _id?: string
      name?: string
    }
    createdAt: string
  }
  // deleteProduct: (id: string, image: string) => void
  // isLoading: boolean
}

const StoreProductCard = ({
  product: { _id, category, image, name, price },
}: IProdutcCard) => {
  const [isDeletingProduct, setIsDeletingProduct] = useState(false)
  const handleDeleteProduct = async (id: string, image: string) => {
    const IMAGE_FOLDER = "products"
    setIsDeletingProduct(true)
    await deleteImageFromFirebase(image, IMAGE_FOLDER)
    await deleteProduct(id)
    toast.success("Produto apagado com sucesso", {
      autoClose: 1000,
      hideProgressBar: true,
    })
    setIsDeletingProduct(false)
    window.location.reload()
  }

  return (
    <tr className="h-[90px] w-full bg-white items-center border-b border-GRAY-LIGHTER flex justify-between px-6">
      <td className="w-[150px]">
        <div className="relative w-full h-[70px]">
          <img
            src={image}
            alt="Imagem do produto"
            className="absolute w-full h-full object-contain"
          />
        </div>
      </td>

      <td className="w-[150px]">{name}</td>
      <td className="w-[150px]">{category?.name}</td>
      <td className="w-[150px]">{price} Kz</td>
      <div className="w-[150px] text-[13px]">
        <button className="px-2 mr-2 py-[2px] rounded-[4px] border border-GRAY-DARKER">
          Editar
        </button>
        <button
          onClick={() => handleDeleteProduct(_id!!, image!!)}
          className="px-2 py-[2px] text-white rounded-[4px] bg-RED-DARK"
        >
          {isDeletingProduct ? <ClipLoader size={14} color="#FFF" /> : "Apagar"}
        </button>
      </div>
    </tr>
  )
}

export default StoreProductCard
