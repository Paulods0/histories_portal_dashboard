import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

import { getAllCategories, url } from "../api/apiCalls"
import { ICategoryData } from "../types"
import { ClipLoader } from "react-spinners"
import { toast } from "react-toastify"
import { IoIosAddCircleOutline } from "react-icons/io"
import { uploadImageToFirebaseStorage } from "../utils/helpers"
import { useNavigate } from "react-router-dom"
import { API_URL } from "../utils/enums"

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
}

const NovoPost = () => {
  const navigate = useNavigate()

  //STATES
  const [categories, setCategories] = useState<ICategoryData[]>([])
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [content, setContent] = useState("")
  console.log(content)
  const [isHighlighted, setIsHighlighted] = useState(false)
  const [category, setCategory] = useState("")
  const [image, setImage] = useState<File | undefined>()
  const [imageToShow, setImageToShow] = useState<any>()
  const [isCreatingPost, setIsCreatingPost] = useState(false)

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
    setSubtitle("")
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
    if (!subtitle) {
      toast.error("O subtítulo é obrigatório", {
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

      const response = await fetch(`${url}${API_URL.CREATE_POST}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          subtitle: subtitle,
          content: content,
          isHighlighted: isHighlighted,
          category: category,
          mainImage: downloadURL,
        }),
      })

      const { message } = await response.json()
      if (!response.ok) {
        console.log(message)
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

  return (
    <main className="w-full  flex p-3 gap-8">
      {/** QUILL EDITOR */}

      <ReactQuill
        modules={modules}
        className="h-[450px] w-full "
        value={content}
        theme="snow"
        onChange={(value) => setContent(value)}
      />

      {/** FORM */}
      <form
        encType="multipart/form-data"
        onSubmit={(e: FormEvent) => createPost(e)}
        className=" flex flex-col items-center justify-center"
      >
        <div className="w-full flex flex-col items-center justify-center rounded-xl h-[150px] ">
          {imageToShow ? (
            <>
              <div className="w-full h-[150px] flex flex-col">
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
              <div className="border h-[150px] border-dashed border-zinc-800 w-full flex flex-col items-center justify-center rounded-xl ">
                <label
                  htmlFor="image"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <IoIosAddCircleOutline size={50} color="#9D9D9D" />
                  <span>Adicionar imagem</span>
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

        <div className="p-12 bg-white rounded-lg flex-col flex h-full gap-4 mt-6 justify-center w-full shadow-md">
          <div className="border-[#9D9D9D] border py-2 px-4 rounded-lg">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Adicione o título principal"
              className="text-[14px] bg-transparent border-none w-full text-center outline-none"
            />
          </div>
          <div className="border-[#9D9D9D] border py-2 px-4 rounded-lg">
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Adicione o subtítulo"
              className="text-[14px] bg-transparent border-none w-full text-center outline-none"
            />
          </div>

          <div className="flex gap-2 items-center ">
            <div className="py-2 px-4 border border-[#9D9D9D] rounded-lg ">
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

            <div className="flex gap-2 items-center justify-center text-[#9D9D9D]">
              <label htmlFor="destaque" className="cursor-pointer">
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
        </div>

        <button
          disabled={isCreatingPost}
          className={`w-full hover:bg-[#382A3F]/80 duration-200 transition-all ease-in p-2 rounded-lg mt-8  text-white uppercase font-semibold mx-6 ${
            isCreatingPost ? "bg-[#382A3F]/80" : "bg-[#382A3F]"
          }`}
        >
          {isCreatingPost ? <ClipLoader size={18} color="#FFF" /> : " publicar"}
        </button>
      </form>
    </main>
  )
}

export default NovoPost
