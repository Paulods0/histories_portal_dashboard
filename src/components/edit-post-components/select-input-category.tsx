import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PostData } from "@/types/data"
import { Label } from "../ui/label"
import { SetStateAction } from "react"
import { useGetCategories } from "@/lib/react-query/queries"
import { ClipLoader } from "react-spinners"

type Props = {
  post: PostData
  setCategoryName: React.Dispatch<SetStateAction<string>>
}

const SelectInputCategory = ({ post, setCategoryName }: Props) => {
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