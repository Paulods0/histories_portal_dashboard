import { FC } from "react"
import { useLocation } from "react-router-dom"

type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: FC<Props> = ({ totalPages, onPageChange }) => {
  const { search } = useLocation()
  const queryParams = search.split("&")[0].split("=")[1]

  let pages = []
  for (let i = 0; i < totalPages; i++) {
    pages.push(i)
  }

  return (
    <div className="flex items-center gap-2 col-span-4 mt-6 min-w-28 mx-auto">
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => onPageChange(page + 1)}
          className={`${
            Number(queryParams) === index + 1 ? "bg-zinc-800" : "bg-background"
          } size-10 border rounded-lg text-foreground text-base`}
        >
          {page + 1}
        </button>
      ))}
    </div>
  )
}

export default Pagination
