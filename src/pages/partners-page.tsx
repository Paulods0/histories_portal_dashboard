import { BiPlus } from "react-icons/bi"
import { Link, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Pagination from "@/components/global/pagination"
import PartnerCard from "@/components/partners-component/partner-card"
import { useGetPartners } from "@/lib/react-query/queries/partner-queries"
import LoaderSpinner from "@/components/global/loader-spinner"
import { memo, useMemo } from "react"

const MemoizedPartnerCard = memo(PartnerCard)

const PartnersPage = () => {
  const [page, setPage] = useSearchParams({ page: "1" })
  const currentPage = Number(page.get("page")) || 1

  const { data, isLoading } = useGetPartners(currentPage)

  const memoizedPartners = useMemo(() => {
    return data?.partners.map((partner) => (
      <MemoizedPartnerCard key={partner._id} partner={partner} />
    ))
  }, [data?.partners, data?.page])

  if (isLoading) {
    return (
      <main className="w-full flex items-center justify-center h-full p-6">
        <LoaderSpinner />
      </main>
    )
  }

  function handlePagination(page: number) {
    setPage((prev) => {
      prev.set("page", String(page))
      return prev
    })
  }

  return (
    <main className="w-full h-full flex flex-col gap-3">
      <section className="w-full flex items-center justify-end border-b pb-2 ">
        <Button variant="default" asChild>
          <Link to={"/parceiros/adicionar"} className="flex items-center gap-2">
            <BiPlus />
            Adicionar
          </Link>
        </Button>
      </section>

      <section className="max-h-[70vh] scroll-bar px-4 overflow-y-scroll">
        {memoizedPartners?.length === 0 ? (
          <h1 className="text-center mt-6">Não há nada para mostrar ainda.</h1>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {memoizedPartners}
          </div>
        )}
      </section>

      <Pagination
        currentPage={currentPage}
        onPageChange={handlePagination}
        totalPages={data!!.page}
      />
    </main>
  )
}

export default PartnersPage
