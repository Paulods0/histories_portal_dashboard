import { HTMLAttributes } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

import { useGetAllProductCategories } from "@/lib/react-query/queries"
import { useFormContext } from "react-hook-form"
import { ProductData } from "@/types/data"
import { EditProductFormSchemaType } from "@/types/form-schema"

type Props = {
  product: ProductData
}

const SelectCategory = ({ product }: Props) => {
  const { data: categories } = useGetAllProductCategories()
  const { setValue } = useFormContext()
  return (
    <Select
      defaultValue={product.category._id}
      onValueChange={(value: EditProductFormSchemaType["category"]) =>
        setValue("category", value, { shouldValidate: true })
      }
    >
      <SelectTrigger>
        <SelectValue placeholder={product.category.name} />
      </SelectTrigger>

      <SelectContent>
        {categories?.map((category) => (
          <SelectItem key={category._id} value={category._id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SelectCategory
