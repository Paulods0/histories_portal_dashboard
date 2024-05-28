import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CATEGORIES } from "@/utils/constants"
import { SetStateAction } from "react"

type Props = {
  setCategory: React.Dispatch<SetStateAction<string>>
}

const SelectCategoryInput = ({ setCategory }: Props) => {
  const AGENDA_AO = "agenda ao"
  const CLASSIFICADOS = "classificados"

  const handleChangeCategory = (value: string) => {
    const category = CATEGORIES.find((category) => category === value)!!
    setCategory(category)
  }

  return (
    <div className="w-full">
      <Select onValueChange={(value) => handleChangeCategory(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Categoria" className="capitalize" />
        </SelectTrigger>

        <SelectContent className="capitalize">
          {CATEGORIES.filter(
            (category) => category !== CLASSIFICADOS && category !== AGENDA_AO
          ).map((category) => (
            <SelectItem key={category} value={category} className="capitalize">
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectCategoryInput
