import { useEffect, useState } from "react"
import { ProductData } from "../../types/data"
import { getAllProducts } from "../../api"
import { ClipLoader } from "react-spinners"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

const StoreTableData = () => {
  const [products, setProducts] = useState<ProductData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts()
        setProducts(data)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="w-full lg:h-[300px] flex items-center justify-center">
        <ClipLoader color="#111111" size={28} />
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      {products.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="font-semibold text-base">
            Não há nenhum produto na loja.
          </h1>
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full scroll-bar overflow-y-auto">
          <Table className="bg-background min-h-[100px] text-foreground">
            <TableHeader>
              <TableRow className="flex items-center w-full">
                <TableHead className="w-full h-[20px] bg-BLACK p-3 flex items-center justify-center text-center text-WHITE">
                  Nome
                </TableHead>
                <TableHead className="w-full h-[20px] bg-BLACK p-3 flex items-center justify-center text-center text-WHITE">
                  Quantidade
                </TableHead>
                <TableHead className="w-full h-[20px] bg-BLACK p-3 flex items-center justify-center text-center text-WHITE">
                  Preço
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="flex flex-col overflow-auto scroll-bar">
              {products.map((product) => (
                <TableRow
                  key={product._id}
                  className="flex text-center w-full items-center"
                >
                  <TableCell className="relative w-full">
                    {product?.name}
                  </TableCell>
                  <TableCell className="relative w-full">
                    {product?.quantity}
                  </TableCell>

                  <TableCell className="relative w-full">
                    {product?.price} kz
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

export default StoreTableData
