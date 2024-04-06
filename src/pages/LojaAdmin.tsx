import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { ClipLoader } from "react-spinners"
import { STORE_PRODUCT_HEADERS } from "../constants"
import {
  deleteImageFromFirebase,
  uploadImageToFirebaseStorage,
} from "../utils/helpers"
import {
  deleteProduct,
  getAllProducts,
  getAllProdutCategories,
  url,
} from "../api"
import { ICategoryData, IProductData } from "../interfaces"
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
import { CiEdit, CiTrash } from "react-icons/ci"
import {
  Dialog,
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

const LojaAdmin = () => {
  const [products, setProducts] = useState<IProductData[]>([])
  const [categories, setCategories] = useState<ICategoryData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("other")
  const [file, setFile] = useState<File | undefined>()
  const [imageToShow, setImageToShow] = useState<any>()
  const [isUploadingProduct, setIsUploadingProduct] = useState(false)

  const resetInputFields = () => {
    setName("")
    setPrice("")
    setCategory("other")
    setImageToShow(null)
  }
  const handleInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader()
      const image = e.target.files[0]
      setFile(image)
      reader.onload = (e) => {
        setImageToShow(e.target!!.result)
      }
      reader.readAsDataURL(image)
    }
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsUploadingProduct(true)
    if (!name || !price || !category || !file) {
      toast.error("Por favor, preencha todos os campos obrigatórios.", {
        autoClose: 1000,
        position: "top-right",
      })
      setIsUploadingProduct(false)
      return
    }
    try {
      const IMAGE_FOLDER = "products/"
      const downloadurl = await uploadImageToFirebaseStorage(file, IMAGE_FOLDER)

      const response = await fetch(`${url}product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          category: category,
          price: price,
          image: downloadurl,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Erro ao adicionar produto.")
      }

      toast.success(data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
      })
    } catch (error) {
      toast.error("Erro ao adicionar produto.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
      })
      console.log(error)
    }
    resetInputFields()
    setIsUploadingProduct(false)
    window.location.reload()
  }
  const handleDeleteProduct = (product_id: string) => {}

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
    <main className="w-full p-2 h-full items-start flex gap-2">
      {products.length === 0 || !products || products === null ? (
        <div className="w-full h-full flex items-center justify-center col-span-3">
          <h1>Não há nenhum produto ainda</h1>
        </div>
      ) : (
        <Table className="flex-[3] flex flex-col mt-2">
          <TableHeader>
            <TableRow className="flex items-center w-full">
              {STORE_PRODUCT_HEADERS.map((label, index) => (
                <TableHead
                  className="w-full h-[20px] bg-BLACK p-3 flex items-center justify-center text-center text-WHITE"
                  key={index}
                >
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="flex flex-col h-[480px] overflow-auto scroll-bar">
            {products.map((product, index) => (
              <TableRow
                key={index}
                className="flex text-center w-full items-center"
              >
                <TableCell className="relative w-full">
                  <img
                    src={product.image}
                    className="w-full h-[60px] object-contain"
                    alt="Imagem do produto"
                  />
                </TableCell>

                <TableCell className="w-full">{product.name}</TableCell>
                <TableCell className="w-full">
                  {product.category.name}
                </TableCell>
                <TableCell className="w-full text-center">
                  {product.price}
                </TableCell>
                <TableCell className="w-full">{product.quantity}</TableCell>

                <TableCell className="w-full gap-x-3 text-center items-center justify-center flex">
                  <Dialog>
                    <DialogTrigger asChild className="cursor-pointer">
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
                          value={product.name}
                          placeholder="Nome do produto"
                          className="w-full h-fullbg-transparent border-none outline-none"
                        />
                      </div>
                      <select
                        defaultValue={product.category._id}
                        className="w-full p-2 border border-zinc-300 rounded-lg"
                      >
                        {categories.map((category) => (
                          <option
                            value={""}
                            className="w-full h-fullbg-transparent border-none outline-none"
                          >
                            {category.name}
                          </option>
                        ))}
                      </select>
                      <div className="w-full p-2 border border-zinc-300 rounded-lg">
                        <input
                          type="number"
                          value={product.price}
                          placeholder="Preço"
                          className="w-full h-fullbg-transparent border-none outline-none"
                        />
                      </div>
                      <div className="w-full p-2 border border-zinc-300 rounded-lg">
                        <input
                          type="number"
                          value={product.quantity}
                          placeholder="Quantidade"
                          className="w-full h-fullbg-transparent border-none outline-none"
                        />
                      </div>
                      <Button>Atualizar alterações</Button>
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
                          Esta ação não pode ser desfeita. Isto vai eliminar
                          permanentemente este produto da loja.
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteProduct(product._id)}
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
      )}

      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="flex items-center p-2 flex-1 h-full flex-col"
      >
        <div className="w-full flex items-center justify-center rounded-xl h-[200px] border border-dashed border-zinc-800">
          {imageToShow ? (
            <div className="w-full h-full flex flex-col">
              <label htmlFor="file" className="cursor-pointer w-full h-full">
                <img
                  src={imageToShow}
                  alt="imagem do produto"
                  className="inset-0 w-full h-full object-contain"
                />
              </label>

              <input
                id="file"
                onChange={handleInputFileChange}
                type="file"
                className="opacity-0"
              />
            </div>
          ) : (
            <div className="w-full flex flex-col ">
              <div className="flex flex-col mt-6">
                <label htmlFor="file" className="text-center cursor-pointer">
                  Adicionar imagem
                </label>
                <input
                  id="file"
                  onChange={handleInputFileChange}
                  type="file"
                  className="opacity-0"
                />
              </div>
            </div>
          )}
        </div>

        <div className="w-full my-12 flex flex-col gap-3 items-center justify-center px-2">
          <div className="border border-zinc-300 p-2 rounded-lg w-full">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-[#1A1F10] bg-transparent placeholder:text-zinc-600 w-full text-center outline-none"
              placeholder="Insira o nome do produto"
            />
          </div>
          <div className="border border-zinc-300 p-2 rounded-lg w-full ">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="text-[#1A1F10] bg-transparent placeholder:text-zinc-600 w-full text-center outline-none"
              placeholder="Insira o preço do produto"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-zinc-300 bg-transparent p-2 text-center outline-none rounded-lg w-full"
          >
            <option disabled value="other">
              Escolha uma categoria
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isUploadingProduct}
          className={` ${
            isUploadingProduct ? "bg-BLACK/85" : "bg-BLACK "
          } px-4 py-2 text-white w-full rounded-lg hover:bg-BLACK/85 duration-150 uppercase transition-all ease-in-out`}
        >
          {isUploadingProduct ? (
            <div className="flex items-center flex-1 justify-center gap-4">
              <span className="uppercase">Loading</span>
              <ClipLoader size={20} color="#FFF" />
            </div>
          ) : (
            "Adicionar"
          )}
        </button>
      </form>
    </main>
  )
}

export default LojaAdmin
