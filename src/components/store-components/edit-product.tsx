import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGetAllProductCategories } from "@/lib/react-query/queries"
import { ProductData } from "@/types/data"
import { CiEdit } from "react-icons/ci"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

type Props = {
  product: ProductData
}

const EditProduct = ({ product }: Props) => {
  const { data: categories } = useGetAllProductCategories()
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer" onClick={() => {}}>
        <CiEdit size={24} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar produto</DialogTitle>
        </DialogHeader>

        <img src={product.image} className="w-14 h-14 object-cover" alt="" />

        <div className="w-full p-2 border border-zinc-300 rounded-lg">
          <input
            type="text"
            onChange={() => {}}
            placeholder="Nome do produto"
            className="w-full h-fullbg-transparent border-none outline-none"
          />
        </div>

        <select
          defaultValue={product.category._id}
          onChange={() => {}}
          className="w-full p-2 border border-zinc-300 rounded-lg"
        >
          <option
            defaultValue={product.category._id}
            disabled
            className="w-full h-fullbg-transparent border-none outline-none"
          >
            {product.category.name}
          </option>

          {categories?.map((category) => (
            <option
              key={category._id}
              value={category._id}
              className="w-full h-fullbg-transparent border-none outline-none"
            >
              {category.name}
            </option>
          ))}
        </select>

        <div className="w-full p-2 border border-zinc-300 rounded-lg">
          <Input
            type="number"
            placeholder="Preço"
            className="w-full h-fullbg-transparent border-none outline-none"
          />
        </div>

        <div className="w-full p-2 border border-zinc-300 rounded-lg">
          <Input
            type="number"
            placeholder="Quantidade"
            className="w-full h-fullbg-transparent border-none outline-none"
          />
        </div>
        <div className="flex items-center gap-x-3">
          <DialogClose asChild>
            <Button variant={"outline"}>Cancelar</Button>
          </DialogClose>
          <Button>Atualizar alterações</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditProduct
