import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

import { getAllCategories, url } from "../api/apiCalls"
import { ICategoryData } from "../types"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../config/firebase"
import { BarLoader } from "react-spinners"
import { toast } from "react-toastify"

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

const NovoPost = () => {
  //STATES
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [image, setImage] = useState<File | undefined>()
  const [imgProgress, setImgProgress] = useState(0)
  const [hasImage, setHasImage] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [downloadURLImage, setDownloadURLImage] = useState("")
  const [content, setContent] = useState("")
  const [isHighlighted, setIsHighlighted] = useState(false)
  const [categories, setCategories] = useState<ICategoryData[]>([])
  const [category, setCategory] = useState("")
  const [isCreatingPost, setIsCreatingPost] = useState(false)

  //FUNCTIONS
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setImage(file)
      setHasImage(true)
    }
  }
  const uploadImageToFirestore = async (file: File | undefined) => {
    if (!file) {
      return
    }
    const filename = new Date().getTime() + "-" + file.name
    const imageRef = ref(storage, "images/" + filename)
    const uploadTask = uploadBytesResumable(imageRef, file)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setUploadingImage(true)
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

        switch (snapshot.state) {
          case "paused":
            console.log("upload is paused")
            break
          case "running":
            console.log("upload is running")
            break
          default:
            break
        }
      },
      (error) => {
        console.log(error)
        switch (error.code) {
          case "storage/unauthorized":
            console.log(error)
            break
          case "storage/canceled":
            //user canceled
            break
          case "storage/unknown":
            //unknown error occurred, inspect error,server response
            break
          default:
            break
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("downloadURL: ", downloadURL)
          setUploadingImage(false)
          setDownloadURLImage(downloadURL)
        })
      }
    )
  }
  const createPost = async (e: FormEvent) => {
    e.preventDefault()
    setIsCreatingPost(true)
    try {
      const response = await fetch(url + "post/create-post", {
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
          mainImage: downloadURLImage,
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
      }
    } catch (error) {
      toast.error("", {})
    }
    setTitle("")
    setSubtitle("")
    setContent("")
    setIsHighlighted(false)
    setCategory("")
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
    const uploadImaga = async () => {
      await uploadImageToFirestore(image)
    }
    uploadImaga()
  }, [image])

  return (
    <main className="p-4">
      <h1 className="text-[20px] font-semibold uppercase text-[#382A3F] mb-4">
        Crie um novo post
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
          onSubmit={(e: FormEvent) => createPost(e)}
          className="w-[250px] rounded-lg px-4 h-[430px] flex-col flex-[1.5] border border-[1px_solid_#382A3F] shadow-md flex items-center justify-between py-4"
        >
          <div className="flex-1 flex-col flex h-full justify-around">
            {uploadingImage ? (
              <>
                <label htmlFor="image" className="cursor-pointer">
                  <h1>
                    <div className="flex flex-col items-center w-full">
                      <BarLoader color="#56b5e4" />
                    </div>
                  </h1>
                  <input
                    id="image"
                    accept="image/*"
                    name="image"
                    type="file"
                    onChange={(e) => handleFileInputChange(e)}
                    placeholder="Adicione a imagem principal"
                    className="hidden bg-transparent border-none outline-none "
                  />
                </label>
              </>
            ) : (
              <div className=" text-[#9D9D9D] outline-dotted  text-center p-2 rounded-lg">
                <label htmlFor="image" className="cursor-pointer">
                  Adicionar imagem principal
                </label>
                <input
                  id="image"
                  accept="image/*"
                  name="image"
                  type="file"
                  onChange={(e) => handleFileInputChange(e)}
                  placeholder="Adicione a imagem principal"
                  className="hidden border-none bg-transparent outline-none "
                />
              </div>
            )}

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
            className={`w-full hover:bg-[#382A3F]/80 duration-200 transition-all ease-in p-2 rounded-lg mt-8  text-white uppercase font-semibold mx-6 ${
              isCreatingPost ? "bg-[#382A3F]/80" : "bg-[#382A3F]"
            }`}
          >
            {isCreatingPost ? "Loading." : " publicar"}
          </button>
        </form>
      </div>
    </main>
  )
}

export default NovoPost
