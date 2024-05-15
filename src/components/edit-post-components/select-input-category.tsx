import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "../ui/label"
import { SetStateAction } from "react"
import { useGetCategories } from "@/lib/react-query/queries"
import { ClipLoader } from "react-spinners"

type Props = {
  category: string
  categoryName: string
  setCategoryName: React.Dispatch<SetStateAction<string>>
  setCategory: React.Dispatch<SetStateAction<string>>
}

const SelectInputCategory = ({
  category,
  setCategory,
  categoryName,
  setCategoryName,
}: Props) => {
  const { data: categories, isLoading } = useGetCategories()

  const CLASSIFICADOS = "Classificados"
  const OVERLAND_EXPERIENCE = "Overland Experience"

  if (isLoading) {
    return (
      <main className="w-full items-center justify-center h-full">
        <ClipLoader size={24} color="#FFF" />
      </main>
    )
  }

  const handleChangeCategory = (value: string) => {
    const category = categories?.find((category) => category._id === value)
    setCategory(category!!._id)
    setCategoryName(category!!.name)
  }

  return (
    <div className="flex gap-2 w-full flex-col">
      <Label htmlFor="category">Categoria</Label>
      <Select defaultValue={category} onValueChange={handleChangeCategory}>
        <SelectTrigger>
          <SelectValue placeholder={categoryName} />
        </SelectTrigger>

        <SelectContent>
          {categories
            ?.filter(
              (category) =>
                category.name !== CLASSIFICADOS &&
                category.name !== OVERLAND_EXPERIENCE
            )
            .map((category) => (
              <SelectItem key={category._id} value={category._id}>
                {category.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectInputCategory
