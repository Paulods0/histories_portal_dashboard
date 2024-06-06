import { useSearchParams } from "react-router-dom"
import { useAuthContext } from "@/context/auth-context"
import Pagination from "@/components/global/pagination"
import LoaderSpinner from "@/components/global/loader-spinner"
import { useGetAllProducts } from "@/lib/react-query/queries/product-queries"
import AddProductButton from "@/components/store-components/add-product-button"
import StoreProductTable from "@/components/store-components/store-product-table"

const StorePage = () => {
  const { user } = useAuthContext()

  const [currentPage, setCurrentPage] = useSearchParams({ page: "" })
  const page = Number(currentPage.get("page")) || 1

  const { data, isLoading } = useGetAllProducts(page)

  function handlePagination(newPage: number) {
    setCurrentPage((prev) => {
      prev.set("page", String(newPage))
      return prev
    })
  }

  if (isLoading) {
    return (
      <main className="relative w-full h-[80vh] flex items-center justify-center">
        <LoaderSpinner />
      </main>
    )
  }

  const isUserAuthorized = user?.role !== "publicator"

  return (
    <main className="w-full p-2 flex-col items-center flex">
      {data?.products.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center col-span-3">
          <h1>Não há nenhum produto ainda</h1>
        </div>
      ) : (
        <section className="w-full flex flex-col h-full items-center justify-start gap-y-2">
          <div className="flex flex-col gap-y-2 mx-auto w-full lg:w-[800px]">
            <h1 className="font-bold text-3xl">Produtos</h1>
            
            {isUserAuthorized && (
              <div className="w-full flex items-center justify-end">
                <AddProductButton />
              </div>
            )}

            <StoreProductTable
              isUserAuthorized={isUserAuthorized}
              products={data?.products}
            />

            <Pagination
              totalPages={data!!.pages}
              currentPage={Number(page)}
              onPageChange={handlePagination}
            />
          </div>
        </section>
      )}
    </main>
  )
}

export default StorePage