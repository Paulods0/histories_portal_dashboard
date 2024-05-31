import { FC } from "react"

type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: FC<Props> = ({ totalPages, onPageChange }) => {
  let pages = []
  for (let i = 0; i < totalPages; i++) {
    pages.push(i)
  }

  return (
    <div className="flex pb-6 items-center gap-2 col-span-4 mt-6 max-w-96 mx-auto">
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => onPageChange(page + 1)}
          className={`${
            page === index + 1 ? "bg-red-700" : "bg-background"
          } px-4 py-2 border-2 rounded-lg text-foreground text-base`}
        >
          {page + 1}
        </button>
      ))}
    </div>
  )
}

export default Pagination
