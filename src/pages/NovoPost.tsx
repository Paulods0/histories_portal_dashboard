import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"

import {
  CategoryData,
  NewExcursionPost,
  NewPost,
  NewSchedulePost,
} from "../types"
import { ClipLoader } from "react-spinners"
import { toast } from "react-toastify"
import {
  uploadImageToFirebaseStorage,
  validateInputFields,
} from "../utils/helpers"
import { useNavigate } from "react-router-dom"

import { useAuthContext } from "../context/AuthContext"

//@ts-ignore
import ImageUploader from "quill-image-uploader"

import "quill-image-uploader/dist/quill.imageUploader.min.css"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  useCreateClassifiedPost,
  useCreatePost,
  useCreateSchedulePost,
  useGetAllUsers,
  useGetCategories,
} from "@/utils/react-query/queries-and-mutations"
import { Textarea } from "@/components/ui/textarea"

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
      return await uploadImageToFirebaseStorage(file, "posts-content")
    },
  },
}

const NovoPost = () => {
  const { data: users } = useGetAllUsers()
  const { data: categories } = useGetCategories()
  const { mutateAsync: createPost } = useCreatePost()
  const { mutateAsync: createSchedulePost } = useCreateSchedulePost()

  const navigate = useNavigate()
  const { userId } = useAuthContext()
  const CLASSIFICADOS = "Classificados"

  const [tags, setTags] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [author, setAuthor] = useState(userId!!)
  const [authorNotes, setAuthorNotes] = useState("")
  const [imageToShow, setImageToShow] = useState<any>()
  const [image, setImage] = useState<File | undefined>()
  const [document, setDocument] = useState<File | null>(null)
  const [geoCoordinates, setGeoCoordinates] = useState("")
  const [isHighlighted, setIsHighlighted] = useState(false)
  const [isSavingPost, setIsSavingPost] = useState(false)
  const [categoryName, setCategoryName] = useState<string | undefined>(
    undefined
  )
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
    setTags("")
    setTitle("")
    setContent("")
    setCategory("")
    setAuthorNotes("")
    setGeoCoordinates("")
    setIsHighlighted(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSavingPost(true)
    validateInputFields(title, content)
    if (categoryName === "Agenda AO") {
      if (!document || !title || !category) {
        toast.error("Por favor preencha todos os campos obrigatórios.", {
          autoClose: 2000,
          hideProgressBar: true,
        })
        setIsSavingPost(false)
        return
      }
      const firebaseFileURL = await uploadImageToFirebaseStorage(
        document,
        "schedule-posts"
      )
      const schedulePost: NewSchedulePost = {
        author: author,
        file: firebaseFileURL,
        category: category,
        title: title,
      }
      createSchedulePost(schedulePost)
      toast.success("Agenda Ao criada com sucesso", {
        autoClose: 2000,
        hideProgressBar: true,
      })
      resetInputs()
      setIsSavingPost(false)
    } else if (categoryName === "Passeios") {
      if (!title || !category || !image || !geoCoordinates || !content) {
        toast.error("Por favor preencha todos os campos obrigatórios.", {
          autoClose: 2000,
          hideProgressBar: true,
        })
        setIsSavingPost(false)
        return
      }
      const downloadURL = await uploadImageToFirebaseStorage(image, "posts")
      const coordinates = geoCoordinates.split(",")
      const post: NewExcursionPost = {
        author_id: author,
        mainImage: downloadURL,
        category: category,
        title: title,
        highlighted: isHighlighted,
        latitude: coordinates[0] ?? "",
        longitude: coordinates[1] ?? "",
        content: content,
        tag: tags.split(","),
        author_notes: authorNotes,
      }
      createPost(post)
      console.log("Excursion post: ", post)
      toast.success("Post criado com sucesso", {
        autoClose: 1000,
        hideProgressBar: true,
      })
      setIsSavingPost(false)
    } else {
      if (!image || !title || !content || !category) {
        toast.error("Por favor preeencha todos os campos obrigatórios.", {
          hideProgressBar: true,
          autoClose: 2000,
        })
        setIsSavingPost(false)
        return
      }
      const downloadURL = await uploadImageToFirebaseStorage(image, "posts")
      const post: NewPost = {
        author_id: author,
        mainImage: downloadURL,
        category: category,
        title: title,
        highlighted: isHighlighted,
        content: content,
        tag: tags.split(","),
        author_notes: authorNotes,
      }
      createPost(post)
      toast.success("Post criado com sucesso", {
        autoClose: 1000,
        hideProgressBar: true,
      })
      console.log(post)
      setIsSavingPost(false)
    }
  }

  useEffect(() => {
    const catName = categories?.filter((cat) => cat._id === category)[0]
    if (catName) {
      setCategoryName(catName.name)
    }
  }, [category])

  return (
    <main className="w-full h-[calc(85vh+3vh)] gap-6 flex items-center justify-center">
      <div className="flex-[2]  border overflow-y-auto scroll-bar w-full rounded-md">
        <ReactQuill
          modules={modules}
          theme="snow"
          value={content}
          onChange={(value) => setContent(value)}
          placeholder="Escrever post"
          className="w-full h-[70vh] overflow-hidden"
        />
      </div>

      <div className="relative flex-1 overflow-y-auto scroll-bar border-l h-[70vh]">
        <form
          onSubmit={handleSubmit}
          className="absolute inset-0 w-full h-full px-4 py-6"
        >
          <div className="w-full flex justify-center items-center relative">
            <Label htmlFor="file" className="cursor-pointer">
              {image ? (
                <>
                  <Button
                    variant={"secondary"}
                    onClick={() => setImage(undefined)}
                    className="absolute right-2 font-semibold text-[12px] z-50"
                  >
                    Fechar
                  </Button>
                  <img
                    src={imageToShow}
                    className="w-full h-[150px] object-contain"
                    alt=""
                  />
                </>
              ) : (
                <>
                  <span className="border px-4 py-2 text-center">
                    Adicionar imagem
                  </span>
                </>
              )}
              <div className="w-full flex flex-col">
                <Input
                  onChange={handleFileInputChange}
                  id="file"
                  type="file"
                  accept="image/*"
                  className="opacity-0 w-0 h-0"
                />
              </div>
            </Label>
          </div>

          <div>
            <Label htmlFor="title" className="text-[12px]">
              Título
            </Label>
            <Input type="text" onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="flex w-full gap-x-4 items-end">
            <div className="w-full">
              <Label htmlFor="title" className="text-[12px]">
                Categoria
              </Label>
              <Select onValueChange={(value) => setCategory(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    ?.filter((category) => category.name !== CLASSIFICADOS)
                    .map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            {categoryName !== "Agenda AO" && (
              <div className="border flex py-2 h-10 px-2 items-center rounded-md">
                <Label htmlFor="checkbox" className="text-[12px]">
                  Destacar
                </Label>
                <Input
                  id="checkbox"
                  type="checkbox"
                  onChange={(e) => setIsHighlighted(e.target.checked)}
                  className="w-8 h-4"
                />
              </div>
            )}
          </div>

          {categoryName === "Passeios" && (
            <div>
              <Label htmlFor="coordinates" className="text-[12px]">
                Latitude e longitude
              </Label>
              <Input
                id="coordinates"
                type="text"
                onChange={(e) => setGeoCoordinates(e.target.value)}
              />
            </div>
          )}

          {categoryName === "Agenda AO" && (
            <div>
              <Label htmlFor="doc" className="text-[12px]">
                Documento PDF
              </Label>
              <Input
                id="doc"
                type="file"
                onChange={(e) =>
                  setDocument(e.target.files && e.target.files[0])
                }
                accept="application/pdf"
              />
            </div>
          )}

          {categoryName !== "Agenda AO" && (
            <div>
              <Label htmlFor="tags" className="text-[12px]">
                Adicionar tags(separe-ás por vírgulas)
              </Label>
              <Input
                id="tags"
                type="text"
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          )}

          {categoryName !== "Agenda AO" && (
            <div>
              <Label htmlFor="notes" className="text-[12px]">
                Notas do autor(opcional)
              </Label>
              <Textarea
                id="notes"
                className="resize-none"
                onChange={(e) => setAuthorNotes(e.target.value)}
                rows={5}
              />
            </div>
          )}

          <div className="w-full">
            <Label htmlFor="author" className="text-[12px]">
              Autor
            </Label>
            <Select onValueChange={(value) => setAuthor(value)}>
              <SelectTrigger id="author">
                <SelectValue placeholder="Eu" />
              </SelectTrigger>
              <SelectContent>
                {users?.map((user) => (
                  <SelectItem key={user._id} value={user._id}>
                    <div className="w-full gap-x-3 flex items-center">
                      <img
                        src={user.image ?? "/user.png"}
                        className="w-6 h-6 rounded-full object-cover"
                        alt="imagem do autor"
                      />
                      <div className="flex items-center gap-x-1">
                        {user._id === userId ? (
                          <span className="capitalize">eu</span>
                        ) : (
                          <>
                            <span>{user.firstname}</span>
                            <span>{user.lastname}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full mt-3 items-center flex">
            <Button disabled={isSavingPost} type="submit" variant={"default"}>
              {isSavingPost ? <ClipLoader size={20} /> : "Salvar"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default NovoPost
