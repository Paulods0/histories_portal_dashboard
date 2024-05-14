import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SetURLSearchParams } from "react-router-dom"

const CLASSIFIED_FILTERS = [
  {
    id: 1,
    name: "À venda",
    value: "sell",
  },
  {
    id: 2,
    name: "Comprar",
    value: "buy",
  },
  {
    id: 3,
    name: "Activo",
    value: "active",
  },
  {
    id: 4,
    name: "Suspenso",
    value: "suspended",
  },
  {
    id: 5,
    name: "Inativo",
    value: "inactive",
  },
]

type Props = {
  setFilter: SetURLSearchParams
}

const ClassifiedFilter = ({ setFilter }: Props) => {
  const handleFilter = (value: string) => {
    setFilter((prev) => {
      prev.set("filter", value)
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
