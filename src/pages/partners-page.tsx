import { BiPlus } from "react-icons/bi"
import { Link, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Pagination from "@/components/global/pagination"
import PartnerCard from "@/components/partners-component/partner-card"

const PartnersPage = () => {
  const [page, setPage] = useSearchParams({ page: "1" })
  const currentPage = Number(page.get("page")) || 1
  const pages = 12

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
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <PartnerCard />
          ))}
        </div>
      </section>

      <Pagination
        currentPage={currentPage}
        onPageChange={handlePagination}
        totalPages={pages}
      />
    </main>
  )
}

export default PartnersPage
