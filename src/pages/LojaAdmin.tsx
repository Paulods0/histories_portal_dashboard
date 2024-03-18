import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import StoreProductCard from "../components/StoreProductCard"
import { IoIosAddCircleOutline } from "react-icons/io"
import { toast } from "react-toastify"

import { BeatLoader, ClipLoader } from "react-spinners"
import { STORE_PRODUCT_HEADERS } from "../constants"
import { uploadImageToFirebaseStorage } from "../utils/helpers"
import { getAllProducts, url } from "../api/apiCalls"
import { API_URL } from "../utils/enums"
import { IProductData } from "../types"

const LojaAdmin = () => {
  const [products, setProducts] = useState<IProductData[]>([])
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts()
        setProducts(data)
        setIsLoading(false)
      } catch (error) {
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <main className="relative w-full h-[80vh] flex items-center justify-center">
        <BeatLoader color="#382A3F" />
      </main>
    )
  }

  return (
    <main className="flex-1 h-full grid grid-cols-3 gap-4 ">
      {products.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center col-span-2">
          <h1>Não há nenhum post ainda</h1>
        </div>
      ) : (
        <>
          <table className="flex flex-col h-full text-center items-center col-span-2 p-2 gap-4 overflow-auto scroll-bar">
            <thead className="w-full flex text-center">
              <tr className="w-full items-center text-center justify-between shadow-md rounded-lg flex bg-[#1F101A] text-white px-6">
                {STORE_PRODUCT_HEADERS.map((label, index) => (
                  <th className="w-[150px]" key={index}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="w-full gap-2 flex flex-col">
              {products.map((product, index) => (
                <StoreProductCard key={index} product={product} />
              ))}
            </tbody>
          </table>
        </>
      )}

      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="flex items-center w-full h-full flex-col gap-4"
      >
        <div className="w-full flex flex-col items-center justify-center rounded-xl h-[300px] border border-dashed border-zinc-800">
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
            <>
              <label htmlFor="file" className="cursor-pointer">
                <IoIosAddCircleOutline size={50} color="#9D9D9D" />
              </label>
              <label htmlFor="file" className="cursor-pointer">
                Adicionar imagem
              </label>
              <input
                id="file"
                onChange={handleInputFileChange}
                type="file"
                className="opacity-0"
              />
            </>
          )}
        </div>

        <div className="rounded-lg bg-white shadow-md w-full h-full flex flex-col gap-8 items-center justify-center px-8">
          <div className="border border-zinc-300 p-2 rounded-lg w-full">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-[#1A1F10] placeholder:text-zinc-600 w-full text-center outline-none"
              placeholder="Insira o nome do produto"
            />
          </div>
          <div className="border border-zinc-300 p-2 rounded-lg w-full ">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="text-[#1A1F10] placeholder:text-zinc-600 w-full text-center outline-none"
              placeholder="Insira o preço do produto"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-zinc-300 p-2 text-center outline-none rounded-lg w-full"
          >
            <option disabled value="other">
              Escolha uma categoria
            </option>

            <option value="65f47ace2853088042e9e45e">T-shirt</option>
            <option value="65f4754886ddcfa4b6790584">Ténis</option>
            <option value="65f47ae32853088042e9e460">Calça</option>
            <option value="65f47aec2853088042e9e462">Calção</option>
            <option value="65f47c8465c4e5470fe8ac16">Óculos</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={isUploadingProduct}
          className={` ${
            isUploadingProduct ? "bg-[#2E212F]" : "bg-[#1A101F] "
          } px-4 py-2 text-white w-full rounded-lg hover:bg-[#2E212F] duration-150 uppercase transition-all ease-in-out`}
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
