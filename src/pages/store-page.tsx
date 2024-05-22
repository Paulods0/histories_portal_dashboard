import { ClipLoader } from "react-spinners"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import AddProductButton from "@/components/store-components/add-product-button"
import EditProduct from "@/components/store-components/edit-product"
import DeleteProduct from "@/components/store-components/delete-product"
import { useGetAllProducts } from "@/lib/react-query/queries"
import { useAuthContext } from "@/context/auth-context"

const StorePage = () => {
  const { user } = useAuthContext()
  const { data: products, isLoading } = useGetAllProducts()

  if (isLoading) {
    return (
      <main className="relative w-full h-[80vh] flex items-center justify-center">
        <ClipLoader color="#111111" size={40} />
      </main>
    )
  }

  return (
    <main className="w-full p-2 flex-col items-center flex">
      {products?.products.length === 0 || !products || products === null ? (
        <div className="w-full h-full flex items-center justify-center col-span-3">
          <h1>Não há nenhum produto ainda</h1>
        </div>
      ) : (
        <section className="w-full flex flex-col h-full items-center justify-start gap-y-2">
          <div className="flex flex-col gap-y-2 mx-auto w-full lg:w-[800px]">
            <h1 className="font-bold text-3xl">Produtos</h1>
            {user?.role !== "publicator" && (
              <div className="w-full flex items-center justify-end">
                <AddProductButton />
              </div>
            )}

            <div className="border h-[60vh] overflow-y-auto scroll-bar relative rounded-lg p-6 w-full">
              <Table>
                <TableHeader>
                  <TableHead>Imagem</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Preço</TableHead>
                </TableHeader>

                <TableBody>
                  {products?.products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <img
                          src={product.image}
                          className="size-16 object-cover"
                        />
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.price}</TableCell>

                      {user?.role !== "publicator" && (
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
          </div>
        </section>
      )}
    </main>
  )
}

export default StorePage
