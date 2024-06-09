import { Button } from "@/components/ui/button"
import Pagination from "@/components/global/pagination"
import TipCard from "@/components/tip-components/tip-card"
import LoaderSpinner from "@/components/global/loader-spinner"
import { useGetTips } from "@/lib/react-query/queries/tip-queries"

import { LuPlus } from "react-icons/lu"
import { Link, useSearchParams } from "react-router-dom"
import { memo, useMemo } from "react"

const MemoizedTipCard = memo(TipCard)

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

  const memoizedTips = useMemo(() => {
    return tips?.posts.map((tip) => <MemoizedTipCard tip={tip} key={tip._id} />)
  }, [tips?.posts])

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
      {memoizedTips?.length === 0 ? (
        <h1 className="text-center my-6">Não há nada para mostrar ainda.</h1>
      ) : (
        <section className="h-[70vh] py-4 scroll-bar px-3 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {memoizedTips}
        </section>
      )}

      {memoizedTips?.length !== 0 && (
        <div className="border-t w-full flex items-center justify-center gap-2 text-center">
          <Pagination
            currentPage={currentPage}
            onPageChange={paginate}
            totalPages={tips!!.pages}
          />
        </div>
      )}
    </main>
  )
}

export default AllTips
