import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

import { getAllCategories, getSinglePost, url } from "../api/apiCalls"
import { ICategoryData, IPostData } from "../types"
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { storage } from "../config/firebase"
import { ClipLoader } from "react-spinners"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import { getImagePathFromFirebaseURL } from "../utils"

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image", "formula"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
]
const modules = {
  toolbar: toolbarOptions,
}

const PostDetail = () => {
  const { id } = useParams()

  //POST OBJECT VARIABLES
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [image, setImage] = useState<File | undefined>()
  const [imageToShow, setImageToShow] = useState<any>("")
  const [content, setContent] = useState("")
  const [isHighlighted, setIsHighlighted] = useState(false)
  const [category, setCategory] = useState("")
  const [downloadURLImage, setDownloadURLImage] = useState("")
  const [data, setData] = useState<IPostData>()

  //HELPER VARIABLES
  const [categories, setCategories] = useState<ICategoryData[]>([])
  const [isCreatingPost, setIsCreatingPost] = useState(false)

  //FUNCTIONS
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        if (file) {
          setImageToShow(e.target?.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const updatePost = async (e: FormEvent) => {
    const IMAGE_FOLDER = "images/"
    e.preventDefault()
    setIsCreatingPost(true)
    if (!image) {
      setDownloadURLImage(data!!.mainImage)
    } else {
      const imageName = getImagePathFromFirebaseURL(downloadURLImage)
      const imageToDeleteRef = ref(storage, `${IMAGE_FOLDER}/${imageName}`)

      deleteObject(imageToDeleteRef)
        .then(() => {
          console.log("Imagem deletada")
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const filename = new Date().getTime() + "-" + image!!.name
    const imageRef = ref(storage, IMAGE_FOLDER + filename)
    const uploadTask = uploadBytesResumable(imageRef, image!!)

    await new Promise((resolve: (value?: unknown) => void, reject) => {
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          reject(error)
          toast.error(error.message)
        },
        () => {
          resolve()
        }
      )
    })
    getDownloadURL(uploadTask.snapshot.ref).then((downloadurl) => {
      setDownloadURLImage(downloadurl)
    })

    try {
      const response = await fetch(url + `post/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          subtitle: subtitle,
          content: content,
          isHighlighted: isHighlighted,
          category: category,
          mainImage: downloadURLImage,
        }),
      })

      const { message } = await response.json()

      if (!response.ok) {
        console.log(message)
        toast.error(message, {
          position: "bottom-right",
          hideProgressBar: true,
          autoClose: 1000,
        })
      } else {
        toast.success(message, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: true,
        })
      }
    } catch (error) {
      console.log(error)
    }
    setIsCreatingPost(false)
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
    const fetchData = async () => {
      const data = await getSinglePost(id)
      setData(data)
      setTitle(data!!.title)
      setSubtitle(data!!.subtitle)
      setIsHighlighted(data!!.isHighlighted)
      setContent(data!!.content)
      setCategory(data!!.category.name)
      setDownloadURLImage(data!!.mainImage)
    }
    fetchData()
  }, [id])

  return (
    <main className="p-4">
      <h1 className="text-[20px] font-semibold uppercase text-[#382A3F] mb-4">
        Atualizar o post
      </h1>
      <div className="w-full flex gap-6">
        {/** QUILL EDITOR */}

        <ReactQuill
          modules={modules}
          className=" flex-[4] h-[360px]"
          value={content}
          onChange={(value) => setContent(value)}
        />

        {/** FORM */}
        <form
          encType="multipart/form-data"
          onSubmit={(e: FormEvent) => updatePost(e)}
          className="w-[250px] gap-4 rounded-lg px-4 flex-col flex-[1.5] flex items-center justify-between "
        >
          <div className="w-full flex-col flex items-center justify-center">
            {imageToShow ? (
              <>
                <label
                  htmlFor="image"
                  className="cursor-pointer w-full h-[150px] text-[#9D9D9D] outline-dotted flex items-center text-center p-2 rounded-lg"
                >
                  <div className="relative w-full h-full">
                    <img
                      src={imageToShow}
                      alt=""
                      className="absolute w-full h-full object-contain"
                    />
                    <input
                      id="image"
                      accept="image/*"
                      name="image"
                      type="file"
                      onChange={(e) => handleFileInputChange(e)}
                      placeholder="Adicione a imagem principal"
                      className="hidden bg-transparent border-none outline-none "
                    />
                  </div>
                </label>
              </>
            ) : (
              <label
                htmlFor="image"
                className="cursor-pointer w-full h-[150px] text-[#9D9D9D] outline-dotted flex items-center text-center p-2 rounded-lg"
              >
                <div className="relative w-full h-full">
                  <img
                    src={downloadURLImage}
                    alt=""
                    className="absolute w-full h-full object-contain"
                  />
                </div>
                <input
                  id="image"
                  accept="image/*"
                  name="image"
                  type="file"
                  onChange={(e) => handleFileInputChange(e)}
                  placeholder="Adicione a imagem principal"
                  className="hidden border-none bg-transparent outline-none "
                />
              </label>
            )}
          </div>

          <div className="rounded-lg mt-2 flex flex-col gap-2 border border-[1px_solid_#382A3F] p-4 shadow-md w-full">
            <div className="border-[#9D9D9D] border py-2 px-4  rounded-lg">
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
                  // value={category.}
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
          <div className="w-full flex justify-between gap-2  mt-4">
            <button
              disabled={isCreatingPost}
              className={`w-full hover:bg-[#382A3F]/80 flex items-center justify-center duration-200 transition-all ease-in p-2 rounded-lg  text-white uppercase font-semibold ${
                isCreatingPost ? "bg-[#382A3F]/80" : "bg-[#1F101A]"
              }`}
            >
              {isCreatingPost ? (
                <ClipLoader size={20} color="#FFF" />
              ) : (
                " Atualizar"
              )}
            </button>
            <button
            onClick={handleDeletePost}
              disabled={isCreatingPost}
              className="bg-red-700 w-full duration-200 transition-all ease-in p-2 rounded-lg  text-white uppercase font-semibold"
            >
              Eliminar
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default PostDetail
