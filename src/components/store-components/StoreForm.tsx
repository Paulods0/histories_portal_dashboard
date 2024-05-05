import { CategoryData } from "@/types/data"
import {
  // deleteImageFromFirebase,
  uploadImageToFirebaseStorage,
} from "@/utils/helpers"
import { ChangeEvent, FormEvent, useState } from "react"
import { ClipLoader } from "react-spinners"
import { toast } from "react-toastify"
import { Button } from "../ui/button"
import { DialogClose } from "../ui/dialog"
import axios from "../../api/axiosConfig"

type StoreFormProps = {
  handleSubmit?: () => void
  categories: CategoryData[]
}

const StoreForm = ({ categories }: StoreFormProps) => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [file, setFile] = useState<File | undefined>()
  const [imageToShow, setImageToShow] = useState<any>()
  const [isUploadingProduct, setIsUploadingProduct] = useState(false)
  const [downloadURL, setDownloadURL] = useState("")

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
  const resetInputFields = () => {
    setName("")
    setPrice("")
    setCategory("other")
    setImageToShow(null)
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
      const downloadurl = await uploadImageToFirebaseStorage(file, "products")
      setDownloadURL(downloadurl)

      const response = await axios.post(`/product`, {
        name: name,
        category: category,
        price: price,
        image: downloadurl,
      })

      const data = await response.data

      if (!response.status) {
        throw new Error("Erro ao adicionar produto.")
      }

      toast.success(data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
      })
    } catch (error) {
      console.log("Erro ao adicionar produto")

      toast.error("Erro ao adicionar produto.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
      })
    }
    resetInputFields()
    setIsUploadingProduct(false)
    window.location.reload()
  }

  return (
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
      <div className="flex items-center gap-x-3 self-end">
        <DialogClose asChild>
          <Button variant={"outline"}>Cancelar</Button>
        </DialogClose>
        <Button type="submit" disabled={isUploadingProduct}>
          {isUploadingProduct ? (
            <div className="flex items-center flex-1 justify-center gap-4">
              Loading
              <ClipLoader size={20} color="#FFF" />
            </div>
          ) : (
            "Salvar"
          )}
        </Button>
      </div>
    </form>
  )
}

export default StoreForm
