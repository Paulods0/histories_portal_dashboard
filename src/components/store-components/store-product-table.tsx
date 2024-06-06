import { FC } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Product } from "@/types/data"
import { formatPrice } from "@/utils/helpers"
import EditProduct from "@/components/store-components/edit-product"
import DeleteProduct from "@/components/store-components/delete-product"

type Props = {
  products?: Product[]
  isUserAuthorized: boolean
}

const StoreProductTable: FC<Props> = ({ products, isUserAuthorized }) => {
  return (
    <div className="border h-[60vh] overflow-y-auto scroll-bar relative rounded-lg p-6 w-full">
      <Table>
        <TableHeader>
          <TableHead>Imagem</TableHead>
          <TableHead>Produto</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Preço</TableHead>
        </TableHeader>

        <TableBody>
          {products?.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                <img src={product.image} className="size-16 object-cover" />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{formatPrice(product.price)}</TableCell>

              {isUserAuthorized && (
                <TableCell className="space-x-4">
                  <EditProduct product={product} />
                  <DeleteProduct product={product} />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default StoreProductTable
