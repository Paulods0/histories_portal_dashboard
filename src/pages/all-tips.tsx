import LoaderSpinner from "@/components/global/loader-spinner"
import Pagination from "@/components/global/pagination"
import TipCard from "@/components/tip-components/tip-card"
import { Button } from "@/components/ui/button"
import { useGetTips } from "@/lib/react-query/queries"

import { LuPlus } from "react-icons/lu"
import { Link, useSearchParams } from "react-router-dom"

const AllTips = () => {
  const [page, setPage] = useSearchParams({ page: "1" })
  const currentPage = Number(page)

  const { data: tips, isLoading } = useGetTips(currentPage)

  function paginate(newPage: number) {
    setPage((prev) => {
      prev.set("page", String(newPage))
      return prev
    })
  }

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <LoaderSpinner />
      </div>
    )
  }

  return (
    <main className="flex flex-col w-full h-full">
      <div className="w-full flex justify-end mb-4">
        <Button variant={"default"} asChild>
          <Link to="/dicas/adicionar" className="flex items-center gap-1">
            <LuPlus />
            Adicionar dica
          </Link>
        </Button>
      </div>
      <section className="h-[70vh] py-4 scroll-bar px-3 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tips?.posts.map((tip) => (
          <TipCard key={tip._id} tip={tip} />
        ))}
      </section>

      <div className="border-t w-full flex items-center justify-center gap-2 text-center">
        <Pagination
          currentPage={currentPage}
          onPageChange={paginate}
          totalPages={tips!!.pages}
        />
      </div>
    </main>
  )
}

export default AllTips
