import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CategoryData, PostData } from "@/types/data"
import { Label } from "../ui/label"
import { SetStateAction } from "react"

type Props = {
  categories: CategoryData[]
  post: PostData
  setCategoryName: React.Dispatch<SetStateAction<string>>
}

const SelectInputCategory = ({ categories, post, setCategoryName }: Props) => {
  const CLASSIFICADOS = "Classificados"
  const OVERLAND_EXPERIENCE = "Overland Experience"

  const handleChangeCategory = (value: string) => {
    setCategoryName(value)
  }

  return (
    <div className="flex gap-2 w-full flex-col">
      <Label htmlFor="category">Categoria</Label>
      <Select onValueChange={(value) => handleChangeCategory(value)}>
        <SelectTrigger>
          <SelectValue
            defaultChecked={!!post?.category._id}
            className="text-background"
            placeholder={post?.category.name}
          />
        </SelectTrigger>
        <SelectContent>
          {categories
            ?.filter(
              (category) =>
                category.name !== CLASSIFICADOS &&
                category.name !== OVERLAND_EXPERIENCE
            )
            .map((category) => (
              <SelectItem value={category._id} key={category._id}>
                {category.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectInputCategory
