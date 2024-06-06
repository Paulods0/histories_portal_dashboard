import { FC } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  category: string
  onChange: (value: string) => void
  filteredCategories: { label: string; slug: string }[]
}

const FilterPostCategory: FC<Props> = ({
  category,
  onChange,
  filteredCategories,
}) => {
  return (
    <Select defaultValue={category} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={category ? category : "Todos"} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="##">Todos</SelectItem>
        {filteredCategories?.map((category, index) => (
          <SelectItem key={index} value={category.slug}>
            {category.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default FilterPostCategory
