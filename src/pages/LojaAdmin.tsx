import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import StoreProductCard from "../components/StoreProductCard"
import { IoIosAddCircleOutline } from "react-icons/io"
import { toast } from "react-toastify"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../config/firebase"
import { url } from "../api/apiCalls"
import { BarLoader } from "react-spinners"

const LojaAdmin = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [file, setFile] = useState<File | undefined>()
  const [downloadURL, setDownloadURL] = useState("")
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  const resetInputFields = () => {
    setName("")
    setPrice("")
    setCategory(" ")
  }
  const handleInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0]
      setFile(image)
    }
  }

  const uploadImageToFirebase = async (file: File | undefined) => {
    if (!file) {
      return
    }
    const filename = new Date().getTime() + "-" + file.name
    const imageRef = ref(storage, "products/" + filename)
    const uploadTask = uploadBytesResumable(imageRef, file)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setIsUploadingImage(true)
      },
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsUploadingImage(false)
          setDownloadURL(downloadURL)
        })
      }
    )
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // if (!name) {
    //   toast.error("O nome é obrigatório", {
    //     autoClose: 1000,
    //   })
    //   return
    // }
    // if (!price) {
    //   toast.error("O preço é obrigatório", {
    //     autoClose: 1000,
    //   })
    //   return
    // }
    // if (!category) {
    //   toast.error("A categoria é obrigatória", {
    //     autoClose: 1000,
    //   })
    //   return
    // }

    try {
      const response = await fetch("http://localhost:8080/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          price: price,
          category: category,
          image: downloadURL,
        }),
      })

      const { message } = await response.json()

      if (!response.ok) {
        toast.error(message, {
          position: "top-right",
          autoClose: 1000,
        })
      } else {
        toast.success(message, {
          position: "top-right",
          autoClose: 1000,
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      resetInputFields()
    }
  }

  useEffect(() => {
    const uploadImage = async () => {
      await uploadImageToFirebase(file)
    }
    uploadImage()
  }, [file])

  return (
    <main className="flex-1 h-full grid grid-cols-3 gap-4">
      <div className="flex flex-col h-full items-center col-span-2 p-2 gap-4 overflow-auto scroll-bar">
        <div className="bg-[#1A101F] rounded-lg text-white w-full p-2 ">
          <ul className="flex justify-around px-2 text-sm">
            <li>
              <h1>Imagem</h1>
            </li>
            <li>
              <h1>Nome</h1>
            </li>
            <li>
              <h1>Categoria</h1>
            </li>
            <li>
              <h1>Preço</h1>
            </li>
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
          {isUploadingImage ? (
            <>
              <div className="flex flex-col items-center w-full">
                <BarLoader color="#1A101F" />
              </div>
            </>
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
            <option disabled value="">
              Escolha uma categoria
            </option>

            <option value="65f4754886ddcfa4b6790584">T-shirt</option>
            <option value="65f4754886ddcfa4b6790584">Ténis</option>
            <option value="65f4754886ddcfa4b6790584">Óculos</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-[#1A101F] w-full rounded-lg hover:bg-[#2E212F] duration-150 transition-all ease-in-out"
        >
          Adicionar
        </button>
      </form>
    </main>
  )
}

export default LojaAdmin
