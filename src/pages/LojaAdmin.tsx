import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import StoreProductCard from "../components/StoreProductCard"
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
          // const [err1, err2] = errors
          // console.log({ err1: err1, err2: err2 })
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
    <main className="flex-1 p-2 rounded-[10px] h-full grid grid-cols-4 gap-2">
      {products.length === 0 || !products || products === null ? (
        <div className="w-full h-full flex items-center justify-center col-span-3">
          <h1>Não há nenhum produto ainda</h1>
        </div>
      ) : (
        <>
          <table className="flex flex-col h-full text-center items-center col-span-3 p-2 gap-4 ">
            <thead className="w-full flex text-center">
              <tr className="w-full items-center text-center justify-between shadow-md rounded-sm flex bg-[#111111] text-white px-6">
                {STORE_PRODUCT_HEADERS.map((label, index) => (
                  <th className="w-[150px]" key={index}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="w-full gap-1 flex flex-col h-[520px] overflow-auto scroll-bar">
              {products.map((product, index) => (
                <StoreProductCard
                  key={index}
                  // isLoading={isDeletingProduct}
                  // deleteProduct={handleDeleteProduct}
                  product={product}
                />
              ))}
            </tbody>
          </table>
        </>
      )}

      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="flex items-center p-2 w-full h-full flex-col"
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
