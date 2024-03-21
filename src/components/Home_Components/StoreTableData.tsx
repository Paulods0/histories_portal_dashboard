// import React, { useEffect, useState } from "react"
// import { IProductData } from "../../types"
// import { getAllProducts } from "../../api/apiCalls"

// const StoreTableData = () => {
//   const [products, setProducts] = useState<IProductData[]>([])

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getAllProducts()
//       setProducts(data)
//     }
//     fetchData()
//   }, [])
//   return (
//     <table className="h-[322px] border p-2 border-GRAY-LIGHTER rounded-[10px] flex flex-col w-full">
//       <tr className="text-[14px] px-2 flex font-normal w-full border-b border-b-GRAY-LIGHTER">
//         <th className="w-full text-center">Nome</th>
//         <th className="w-full text-center">Categoria</th>
//         <th className="w-full text-center">Quantidade</th>
//         <th className="w-full text-center">Preço</th>
//       </tr>
//       {/* <tbody className="w-full overflow-y-auto scroll-bar h-[332px] px-1"> */}
//       <tr>
//         {/* {products.map((product) => (
//           <tr
//             key={product._id}
//             className="bg-BLACK rounded-[6px] mt-2 text-white font-light px-2 text-[14px] w-full flex"
//           >
//             <td className="w-full text-start">
//               {product.name.substring(0, 10).concat("...")}
//             </td>
//             <td className="w-full text-center">{product.category.name}</td>
//             <td className="w-full text-center">{3}</td>
//             <td className="w-full text-center">{product.price} kz</td>
//           </tr>
//         ))} */}
//       </tr>
//       {/* </tbody> */}
//     </table>
//   )
// }

// export default StoreTableData
