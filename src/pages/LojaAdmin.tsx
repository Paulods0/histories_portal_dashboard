import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import StoreProductCard from "../components/StoreProductCard"
import { IoIosAddCircleOutline } from "react-icons/io"
import { toast } from "react-toastify"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../config/firebase"

import { ClipLoader } from "react-spinners"
import { STORE_PRODUCT_HEADERS } from "../constants"

const LojaAdmin = () => {
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
    if (!name) {
      toast.error("O nome é obrigatório", {
        autoClose: 1000,
      })
      setIsUploadingProduct(false)
      return
    }
    if (!price) {
      toast.error("O preço é obrigatório", {
        autoClose: 1000,
      })
      setIsUploadingProduct(false)
      return
    }
    if (!category) {
      toast.error("A categoria é obrigatória", {
        autoClose: 1000,
      })
      setIsUploadingProduct(false)
      return
    }
    if (!file) {
      toast.error("A imagem é obrigatória", {
        autoClose: 1000,
        position: "top-right",
      })
      setIsUploadingProduct(false)
      return
    }
    try {
      const filename = new Date().getTime() + "-" + file.name
      const imageRef = ref(storage, filename)
      const uploadTask = uploadBytesResumable(imageRef, file)

      await new Promise((resolve: (value?: unknown) => void, reject) => {
        uploadTask.on(
          "state_changed",
          () => {},
          (error) => {
            toast.error(error.message, {
              autoClose: 1000,
              hideProgressBar: true,
            })
            reject(error)
          },
          () => {
            resolve()
          }
        )
      })

      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

      const response = await fetch("http://localhost:8080/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          category: category,
          price: price,
          image: downloadURL,
        }),
      })

      const { message } = await response.json()
      if (!response.ok) {
        toast.error(message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
        })
      } else {
        toast.success(message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
        })
      }
    } catch (error) {
      console.log(error)
    }
    resetInputFields()
    setIsUploadingProduct(false)
  }

  return (
    <main className="flex-1 h-full grid grid-cols-3 gap-4">
      <div className="flex flex-col h-full items-center col-span-2 p-2 gap-4 overflow-auto scroll-bar">
        <div className="bg-[#1A101F] rounded-lg text-white w-full p-2 ">
          <ul className="flex justify-around px-2 text-sm">
            {STORE_PRODUCT_HEADERS.map((label, index) => (
              <li key={index}>
                <h1>{label}</h1>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full flex flex-col gap-4 ">
          <StoreProductCard image="/102.jpg" />
          <StoreProductCard image="/103.jpg" />
          <StoreProductCard image="/104.jpg" />
          <StoreProductCard image="/105.jpg" />
          <StoreProductCard image="/106.jpg" />
          <StoreProductCard image="/107.jpg" />
          <StoreProductCard image="/108.jpg" />
          <StoreProductCard image="/109.jpg" />
          <StoreProductCard image="/110.jpg" />

          <StoreProductCard image="/112.jpg" />
          <StoreProductCard image="/113.jpg" />
          <StoreProductCard image="/114.jpg" />
        </div>
      </div>

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
