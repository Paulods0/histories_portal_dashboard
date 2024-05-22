import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "../ui/label"
import { SetStateAction } from "react"
import { CATEGORIES } from "@/utils/constants"

type Props = {
  category: string
  setCategory: React.Dispatch<SetStateAction<string>>
}

const SelectInputCategory = ({ category, setCategory }: Props) => {
  const CLASSIFICADOS = "Classificados"
  const OVERLAND_EXPERIENCE = "Overland Experience"

  const handleChangeCategory = (value: string) => {
    const category = CATEGORIES.find((category) => category === value)!!
    setCategory(category)
  }

  return (
    <div className="flex gap-2 w-full flex-col">
      <Label htmlFor="category">Categoria</Label>
      <Select defaultValue={category} onValueChange={handleChangeCategory}>
        <SelectTrigger>
          <SelectValue placeholder={category} className="capitalize" />
        </SelectTrigger>

        <SelectContent>
          {CATEGORIES?.filter(
            (category) =>
              category !== CLASSIFICADOS && category !== OVERLAND_EXPERIENCE
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

export default SelectInputCategory
