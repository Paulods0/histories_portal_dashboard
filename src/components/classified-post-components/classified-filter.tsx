import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { CLASSIFIED_FILTERS } from "@/utils/constants"
import { SetURLSearchParams } from "react-router-dom"

type Props = {
  setFilter: SetURLSearchParams
}

const ClassifiedFilter = ({ setFilter }: Props) => {
  const handleFilter = (value: string) => {
    setFilter((prev) => {
      prev.set("category", value)
      return prev
    })
  }

  return (
    <Select onValueChange={handleFilter} defaultValue="all">
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Filtrar" />
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          {CLASSIFIED_FILTERS.map((filterValue) => (
            <SelectItem key={filterValue.id} value={filterValue.value}>
              {filterValue.name}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectTrigger>
    </Select>
  )
}

export default ClassifiedFilter
