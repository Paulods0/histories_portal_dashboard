import { useGetAllProductCategories } from "@/utils/react-query/queries-and-mutations"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { ClipLoader } from "react-spinners"
import EditCategoryDialog from "./edit-category-dialog"
import DeleteCategoryDialog from "./delete-category-dialog"
import { formatDate } from "@/utils/helpers"

const ProductCategoryTable = () => {
  const { data: productCategories, isLoading } = useGetAllProductCategories()

  if (productCategories?.length === 0) {
    return (
      <main className="w-full flex items-center justify-center">
        <h1 className="text-background text-2xl font-semibold">
          Não há nada ainda.
        </h1>
      </main>
    )
  }
  return (
    <div className="w-[700px] mx-auto overflow-y-auto scroll-bar rounded-lg border p-2 h-[75vh]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead className="w-[200px]">Data de criação</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="scroll-bar">
          {isLoading ? (
            <main className="w-full flex items-center justify-center">
              <ClipLoader />
            </main>
          ) : (
            productCategories?.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product._id.substring(0, 10)}...</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{formatDate(product.createdAt)}</TableCell>
                <TableCell className="flex items-center gap-x-3">
                  <EditCategoryDialog />
                  <DeleteCategoryDialog
                    type="product-category"
                    id={product._id}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default ProductCategoryTable
