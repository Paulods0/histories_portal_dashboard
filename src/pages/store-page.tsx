import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { ClipLoader } from "react-spinners"
import { STORE_PRODUCT_HEADERS } from "../utils/constants"
import {
  deleteImageFromFirebase,
  uploadImageToFirebaseStorage,
} from "../utils/helpers"
import {
  deleteProduct,
  getAllProducts,
  getAllProdutCategories,
  updateProduct,
  url,
} from "../api"
import { CategoryData, PostData, ProductData } from "../types/data"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CiEdit, CiSearch, CiTrash } from "react-icons/ci"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import StoreForm from "@/components/store-components/StoreForm"
import { FaPlusCircle, FaSearch } from "react-icons/fa"
import { Input } from "@/components/ui/input"
import { DialogDescription } from "@radix-ui/react-dialog"

const StorePage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState<ProductData[]>([])
  const [categories, setCategories] = useState<CategoryData[]>([])

  const [selectedProductPrice, setSelectedProductPrice] = useState("")
  const [selectedProductName, setSetSelectedProductName] = useState("")
  const [selectedProductCategory, setSelectedProductCategory] = useState("")
  const [selectedProductQuantity, setSelectedProductQuantity] = useState("")
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false)
  const [selectedProductCategoryName, setSetSelectedProductCategoryName] =
    useState("")

  const setInputValues = (product: ProductData) => {
    setSelectedProductPrice(product.price)
    setSetSelectedProductName(product.name)
    setSelectedProductQuantity(product.quantity.toString())
    setSelectedProductCategory(product.category._id)
    setSetSelectedProductCategoryName(product.category.name)
  }

  const handleDeleteProduct = async (product: ProductData) => {
    try {
      deleteImageFromFirebase(product.image, "products")
      await deleteProduct(product._id)
      toast.success("Eliminado com suceso", {
        autoClose: 1000,
        hideProgressBar: true,
      })
    } catch (error) {
      toast.error("Erro ao eliminar", {
        autoClose: 1000,
        hideProgressBar: true,
      })
      console.error(error)
    }
  }
  const handleUpdateProduct = async (product_id: string) => {
    setIsUpdatingProduct(true)
    try {
      const data = {
        name: selectedProductName,
        price: selectedProductPrice,
        category: selectedProductCategory,
        quantity: Number(selectedProductQuantity),
      }

      const response = await updateProduct(product_id, data)

      toast.success(response.message, {
        autoClose: 1000,
        hideProgressBar: true,
      })
      setIsUpdatingProduct(false)
    } catch (error) {
      console.error(error)
      toast.success("Atualizado com sucesso", {
        autoClose: 1000,
        hideProgressBar: true,
      })
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getAllProducts(), getAllProdutCategories()])
        .then((responses) => {
          const [products, categories] = responses
          setProducts(products)
          setCategories(categories)

          setIsLoading(false)
        })
        .catch((errors) => {
          console.error({
            err1: errors[0],
            err2: errors[1],
          })
          setIsLoading(false)
        })
      setIsLoading(false)
    }
    fetchData()
  }, [])
  if (isLoading) {
    return (
      <main className="relative w-full h-[80vh] flex items-center justify-center">
        <ClipLoader color="#111111" size={40} />
      </main>
    )
  }

  return (
    <main className="w-full p-2 h-full flex-col items-center flex">
      {products.length === 0 || !products || products === null ? (
        <div className="w-full h-full flex items-center justify-center col-span-3">
          <h1>Não há nenhum produto ainda</h1>
        </div>
      ) : (
        <section className="w-full flex flex-col h-full items-center justify-center gap-y-3">
          <div className="flex flex-col gap-y-6 mx-auto max-w-7xl">
            <h1 className="font-bold text-3xl">Produtos</h1>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-x-3">
                <span className="font-bold text-[14px]">Filtros:</span>
                <form className="flex items-center gap-x-3">
                  <Input
                    className="w-32 ring-0 ring-offset-0"
                    placeholder="Nome"
                  />
                  <Input
                    className="w-32 ring-0 ring-offset-0"
                    placeholder="Categoria"
                  />
                  <Input
                    className="w-32 ring-0 ring-offset-0"
                    placeholder="Preço"
                  />
                  <Button type="submit" variant={"link"}>
                    <CiSearch className="w-4 h-4 mr-3" />
                    Filtrar
                  </Button>
                </form>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <FaPlusCircle className="w-3 h-3 mr-3" />
                    Novo produto
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Novo Produto</DialogTitle>
                    <DialogDescription>
                      Adicionar um produto no sistema
                    </DialogDescription>
                  </DialogHeader>

                  <StoreForm categories={categories} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="border h-[450px] overflow-y-auto scroll-bar relative rounded-lg p-6 w-full">
              <Table>
                <TableHeader>
                  <TableHead>ID</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Ações</TableHead>
                </TableHeader>

                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>{product._id.substring(0, 10)}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category.name}</TableCell>
                      <TableCell>{product.quantity} unidades</TableCell>
                      <TableCell>{product.price} kz</TableCell>

                      <TableCell className="space-x-4">
                        <Dialog>
                          <DialogTrigger
                            className="cursor-pointer"
                            onClick={() => setInputValues(product)}
                          >
                            <CiEdit size={24} />
                          </DialogTrigger>

                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Editar produto</DialogTitle>
                            </DialogHeader>

                            <img
                              src={product.image}
                              className="w-14 h-14 object-cover"
                              alt=""
                            />

                            <div className="w-full p-2 border border-zinc-300 rounded-lg">
                              <input
                                type="text"
                                value={selectedProductName}
                                onChange={(e) =>
                                  setSetSelectedProductName(e.target.value)
                                }
                                placeholder="Nome do produto"
                                className="w-full h-fullbg-transparent border-none outline-none"
                              />
                            </div>

                            <select
                              defaultValue={product.category._id}
                              onChange={(e) =>
                                setSelectedProductCategory(e.target.value)
                              }
                              className="w-full p-2 border border-zinc-300 rounded-lg"
                            >
                              <option
                                defaultValue={product.category._id}
                                disabled
                                className="w-full h-fullbg-transparent border-none outline-none"
                              >
                                {product.category.name}
                              </option>

                              {categories.map((category) => (
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
                              <input
                                type="number"
                                // defaultValue={product.price}
                                value={selectedProductPrice}
                                onChange={(e) =>
                                  setSelectedProductPrice(e.target.value)
                                }
                                placeholder="Preço"
                                className="w-full h-fullbg-transparent border-none outline-none"
                              />
                            </div>

                            <div className="w-full p-2 border border-zinc-300 rounded-lg">
                              <input
                                type="number"
                                placeholder="Quantidade"
                                value={selectedProductQuantity}
                                onChange={(e) =>
                                  setSelectedProductQuantity(e.target.value)
                                }
                                className="w-full h-fullbg-transparent border-none outline-none"
                              />
                            </div>
                            <div className="flex items-center gap-x-3">
                              <DialogClose asChild>
                                <Button variant={"outline"}>Cancelar</Button>
                              </DialogClose>
                              <Button
                                disabled={isUpdatingProduct}
                                onClick={() => handleUpdateProduct(product._id)}
                              >
                                Atualizar alterações
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger>
                            <CiTrash size={24} color="#FF0000" />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Tens a certeza que queres eliminar este produto?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação não pode ser desfeita. Isto vai
                                eliminar permanentemente este produto da loja.
                              </AlertDialogDescription>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteProduct(product)}
                                >
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogHeader>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

export default StorePage
