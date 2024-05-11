import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetCategories } from "@/lib/react-query/queries"
import { PostFormSchemaType } from "@/types/form-schema"
import { SetStateAction } from "react"
import { useFormContext } from "react-hook-form"
import { ClipLoader } from "react-spinners"

type Props = {
  setCategory: React.Dispatch<SetStateAction<string>>
  setCategoryName: React.Dispatch<SetStateAction<string>>
}

const SelectCategoryInput = ({ setCategory, setCategoryName }: Props) => {
  const CLASSIFICADOS = "Classificados"
  const OVERLAND_EXPERIENCE = "Overland Experience"

  const { data: categories, isLoading } = useGetCategories()

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center p-3">
        <ClipLoader size={20} color="#FFF" />
      </div>
    )
  }

  const handleChangeCategory = (value: string) => {
    const category = categories?.find((category) => category._id === value)
    setCategory(category!!._id)
    setCategoryName(category!!.name)
  }

  return (
    <div className="w-full">
      <Select onValueChange={(value) => handleChangeCategory(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>

        <SelectContent>
          {categories
            ?.filter(
              (category) =>
                category.name !== CLASSIFICADOS &&
                category.name !== OVERLAND_EXPERIENCE
            )
            .map((category) => (
              <SelectItem
                data-name={category.name}
                key={category._id}
                value={category._id}
              >
                {category.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectCategoryInput
