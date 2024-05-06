// import { useState } from "react"
// import { toast } from "react-toastify"
// import { deleteImageFromFirebase } from "@/utils/helpers"
// import { useDeleteProduct } from "@/lib/react-query/mutations"
// import { ClipLoader } from "react-spinners"

// type IProdutcCard = {
//   product: {
//     _id: string
//     image: string
//     name: string
//     price: string
//     category: {
//       _id: string
//       name: string
//     }
//     createdAt: string
//   }
// }

// const StoreProductCard = ({ product }: IProdutcCard) => {
//   const { mutate } = useDeleteProduct()
//   const [isDeletingProduct, setIsDeletingProduct] = useState(false)

//   const handleDeleteProduct = async () => {
//     try {
//       deleteImageFromFirebase(product._id, "products")

//       mutate(product._id)
//       toast.success("Produto apagado com sucesso")
//       setIsDeletingProduct(false)
//     } catch (error) {
//       setIsDeletingProduct(true)
//       toast.error("Erro ao remover o produto")
//     }
//   }

//   return (
//     <tr className="h-[90px] w-full bg-white items-center border-b border-GRAY-LIGHTER flex justify-between px-6">
//       <td className="w-[150px]">
//         <div className="relative w-full h-[70px]">
//           <img
//             src={product.image}
//             alt="Imagem do produto"
//             className="absolute w-full h-full object-contain"
//           />
//         </div>
//       </td>

//       <td className="w-[150px]">{product.name}</td>
//       <td className="w-[150px]">{product.category?.name}</td>
//       <td className="w-[150px]">{product.price} Kz</td>
//       <div className="w-[150px] text-[13px]">
//         <button className="px-2 mr-2 py-[2px] rounded-[4px] border border-GRAY-DARKER">
//           Editar
//         </button>
//         <button
//           onClick={handleDeleteProduct}
//           className="px-2 py-[2px] text-white rounded-[4px] bg-RED-DARK"
//         >
//           {isDeletingProduct ? <ClipLoader size={14} color="#FFF" /> : "Apagar"}
//         </button>
//       </div>
//     </tr>
//   )
// }

// export default StoreProductCard
