import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

import { useFormContext } from "react-hook-form"
import { Product } from "@/types/data"
import { EditProductFormSchemaType } from "@/types/form-schema"
import { PRODUCT_CATEGORIES } from "@/utils/constants"

type Props = {
  product: Product
}

const SelectCategory = ({ product }: Props) => {
  const { setValue } = useFormContext()
  return (
    <Select
      defaultValue={product.category}
      onValueChange={(value: EditProductFormSchemaType["category"]) =>
        setValue("category", value, { shouldValidate: true })
      }
    >
      <SelectTrigger className="text-background bg-foreground">
        <SelectValue placeholder={product.category} />
      </SelectTrigger>

      <SelectContent>
        {PRODUCT_CATEGORIES.map((category, index) => (
          <SelectItem key={index} value={category.label} className="capitalize">
            {category.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SelectCategory
