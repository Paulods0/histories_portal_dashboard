import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"

import { getAllCategories, url } from "../api"
import { ICategoryData } from "../interfaces"
import { ClipLoader } from "react-spinners"
import { toast } from "react-toastify"
import { IoIosAddCircleOutline } from "react-icons/io"
import { uploadImageToFirebaseStorage } from "../utils/helpers"
import { useNavigate } from "react-router-dom"
import { API_URL } from "../utils/enums"
import { useAuthContext } from "../context/AuthContext"

//@ts-ignore
import ImageUploader from "quill-image-uploader"

import "quill-image-uploader/dist/quill.imageUploader.min.css"
import { Button } from "@/components/ui/button"

Quill.register("modules/imageUploader", ImageUploader)

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // to
  ["blockquote"],
  ["link", "image", "video"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  // [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
]
const modules = {
  toolbar: toolbarOptions,
  imageUploader: {
    upload: async (file: File) => {
      const FIREBASEFOLDERPATH = "/content"

      return await uploadImageToFirebaseStorage(file, FIREBASEFOLDERPATH)
    },
  },
}

const NovoPost = () => {
  const navigate = useNavigate()
  const { userId } = useAuthContext()

  //STATES
  const [categories, setCategories] = useState<ICategoryData[]>([])
  const [tags, setTags] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [authorNotes, setAuthorNotes] = useState("")
  const [imageToShow, setImageToShow] = useState<any>()
  const [image, setImage] = useState<File | undefined>()
  const [isHighlighted, setIsHighlighted] = useState(false)
  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const [geoCoordinates, setGeoCoordinates] = useState<string[]>([])
  const [categoryName, setCategoryName] = useState<string | undefined>(
    undefined
  )

  const generateGeoCoordinates = () => {
    if (geoCoordinates.length === 0) {
      return
    }
    const coordinates = {
      latitude: Number(geoCoordinates[0].split(",")[0]),
      longitude: Number(geoCoordinates[0].split(",")[1]),
    }
    return coordinates
  }
  const coordinates = generateGeoCoordinates()
  // console.log(coordinates)

  //FUNCTIONS
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImageToShow(e.target!!.result)
      }
      reader.readAsDataURL(file)
    }
  }
  const resetInputs = () => {
    setTitle("")
    setContent("")
    setCategory("")
    setIsHighlighted(false)
    setIsCreatingPost(false)
  }
  const createPost = async (e: FormEvent) => {
    e.preventDefault()
    setIsCreatingPost(true)
    if (!title) {
      toast.error("O título é obrigatório", {
        autoClose: 1000,
        hideProgressBar: true,
      })
      setIsCreatingPost(false)
      return
    }
    if (!content) {
      toast.error("O contéudo é obrigatório", {
        autoClose: 1000,
        hideProgressBar: true,
      })
      setIsCreatingPost(false)
      return
    }
    if (!category) {
      toast.error("A categoria é obrigatória", {
        autoClose: 1000,
        hideProgressBar: true,
      })
      setIsCreatingPost(false)
      return
    }
    if (!image) {
      toast.error("A imagem é obrigatória", {
        autoClose: 1000,
        hideProgressBar: true,
      })
      setIsCreatingPost(false)
      return
    }
    try {
      const IMAGE_FOLDER = "images/"
      const downloadURL = await uploadImageToFirebaseStorage(
        image,
        IMAGE_FOLDER
      )

      const response = await fetch(`${url}/${API_URL.CREATE_POST}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
          isHighlighted: isHighlighted,
          category: category,
          mainImage: downloadURL,
          author_id: userId!!,
          author_notes: authorNotes,
          tag: tags.split(","),
          latitude: coordinates ? coordinates.latitude : null,
          longitude: coordinates ? coordinates.longitude : null,
        }),
      })

      const { message } = await response.json()
      if (!response.ok) {
        toast.error(message, {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 1000,
        })
      } else {
        toast.success(message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
        })
        navigate("/posts")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsCreatingPost(false)
      resetInputs()
    }
  }

  //USE EFFECTS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: ICategoryData[] = await getAllCategories()
        setCategories(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const catName = categories.filter((cat) => cat._id === category)[0]
    if (catName) {
      setCategoryName(catName.name)
    }
  }, [category])

  return (
    <main className="relative p-2 w-full h-full grid grid-cols-3">
      {/** QUILL EDITOR */}

      <div className="col-span-2 relative h-[460px]">
        <ReactQuill
          modules={modules}
          className="h-full w-full absolute inset-0"
          value={content}
          theme="snow"
          onChange={(value) => setContent(value)}
        />
      </div>

      {/** FORM */}
      <div className="w-full flex gap-4">
        <form
          encType="multipart/form-data"
          onSubmit={(e: FormEvent) => createPost(e)}
          className="w-[250px] rounded-lg px-4 flex-col flex-[1.5] flex items-center justify-between "
        >
          <div className="w-full flex flex-col mb-2 items-center justify-center rounded-xl h-[150px] ">
            {imageToShow ? (
              <>
                <div className="w-full h-[120px] flex flex-col">
                  <label
                    htmlFor="image"
                    className="cursor-pointer relative w-full h-full "
                  >
                    <img
                      src={imageToShow}
                      alt="Imagem do post"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                    <input
                      id="image"
                      accept="image/*"
                      name="image"
                      type="file"
                      onChange={(e) => handleFileInputChange(e)}
                      placeholder="Adicione a imagem principal"
                      className="opacity-0"
                    />
                  </label>
                </div>
              </>
            ) : (
              <>
                <div className="border h-[120px] border-zinc-300 w-full flex flex-col items-center justify-center rounded-xl ">
                  <label
                    htmlFor="image"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <IoIosAddCircleOutline size={40} color="#9D9D9D" />
                    <span className="font-normal text-base text-GRAY-DARKER">
                      Adicionar imagem
                    </span>
                  </label>
                  <input
                    id="image"
                    accept="image/*"
                    name="image"
                    type="file"
                    onChange={(e) => handleFileInputChange(e)}
                    placeholder="Adicione a imagem principal"
                    className="h-0 w-0"
                  />
                </div>
              </>
            )}
          </div>

          <div className="py-3 rounded-md flex-col flex h-full gap-2 justify-center w-full ">
            <div className="border-zinc-300 border py-2 px-4 rounded-md">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Adicione o título"
                className="text-[14px] bg-transparent border-none w-full text-center outline-none"
              />
            </div>

            <div className="flex gap-2 items-center ">
              <div className="py-2 px-4 border border-zinc-300 rounded-md ">
                <select
                  onChange={(e) => {
                    setCategory(e.target.value)
                  }}
                  value={category}
                  className="text-[14px] bg-transparent cursor-pointer border-none outline-none h-full text-[#9D9D9D] text-center "
                >
                  <option disabled value="" className=" text-[#9D9D9D]">
                    Adicione o tópico
                  </option>

                  {categories.map((category) => (
                    <option id="option" value={category._id} key={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex border border-zinc-300 w-full p-2 rounded-md  gap-2 items-center justify-center text-[#9D9D9D]">
                <label
                  htmlFor="destaque"
                  className="text-[14px] cursor-pointer"
                >
                  Destacar
                </label>
                <input
                  id="destaque"
                  type="checkbox"
                  checked={isHighlighted}
                  onChange={(e) => setIsHighlighted(e.target.checked)}
                  className="text-[14px] border-none outline-none"
                />
              </div>
            </div>
            <div className=" border border-zinc-300 w-full p-2 rounded-md  gap-2">
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="text-[14px] bg-transparent border-none outline-none w-full"
                placeholder="Adicione tags (separe-às por vírgulas)"
              />
            </div>

            {categoryName === "Passeios" && (
              <div className="w-full flex flex-col gap-2">
                <div className=" border border-zinc-300 w-full p-2 rounded-md  gap-2">
                  <input
                    type="text"
                    className="text-[14px]  w-full bg-transparent capitalize border-none outline-none"
                    value={geoCoordinates}
                    onChange={(e) => setGeoCoordinates([e.target.value])}
                    placeholder="latitude,longitude"
                  />
                </div>
              </div>
            )}
            <div className="w-full font-normal p-2 rounded-[4px] border border-zinc-300 h-full">
              <textarea
                placeholder="Adicione uma nota para este post (opcional)"
                value={authorNotes}
                onChange={(e) => setAuthorNotes(e.target.value)}
                className="w-full bg-transparent resize-none scroll-bar placeholder:text-[14px] outline-none border-none h-full"
              />
            </div>
          </div>

          <Button
            variant={"default"}
            disabled={isCreatingPost}
            className="w-full duration-200 transition-all ease-in p-2 rounded-md mt-0 text-white uppercase font-semibold mx-6"
          >
            {isCreatingPost ? (
              <ClipLoader size={18} color="#FFF" />
            ) : (
              " publicar"
            )}
          </Button>
        </form>
      </div>
    </main>
  )
}

export default NovoPost
