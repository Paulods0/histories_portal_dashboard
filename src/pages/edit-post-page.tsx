import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"

import { useNavigate, useParams } from "react-router-dom"
import {
  deleteImageFromFirebase,
  uploadImageToFirebaseStorage,
} from "../utils/helpers"
//@ts-ignore
import ImageUploader from "quill-image-uploader"
import "quill-image-uploader/dist/quill.imageUploader.min.css"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Input } from "@/components/ui/input"
import {
  useDeletePost,
  useGetAllUsers,
  useGetCategories,
  useGetPostById,
} from "@/lib/react-query/queries-and-mutations"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Author, CategoryData, UpdatePost } from "@/types/data"
import { useAuth } from "@/context/AuthContext"
import InputField from "@/components/InputField"
import { ClipLoader } from "react-spinners"
import { updatePost } from "@/api"
import { toast } from "react-toastify"
import DialogModal from "./dialog-modal"

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

const EditPostPostPage = () => {
  const { id } = useParams()
  const { userId } = useAuth()
  const navigate = useNavigate()

  const { mutate } = useDeletePost()
  const { data: users } = useGetAllUsers()
  const { data: categories } = useGetCategories()
  const { data: post, isLoading } = useGetPostById(id!!)

  const [tag, setTag] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [authorId, setAuthorId] = useState("")
  const [authorNotes, setAuthorNotes] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [categoryName, setCategoryName] = useState("")
  const [imageToShow, setImageToShow] = useState<any>("")
  const [isHighlighted, setIsHighlighted] = useState(false)
  const [author, setAuthor] = useState<Author>({} as Author)
  const [isUpdatingPost, setIsUpdatingPost] = useState(false)
  const [downloadURLImage, setDownloadURLImage] = useState("")
  const [image, setImage] = useState<File | undefined>(undefined)
  const [geoCoordinates, setGeoCoordinates] = useState<string | null>(null)

  const handleSelectInputChange = (value: string) => {
    const currentCategoryName =
      categories?.find((category) => category._id === value)!!.name || ""

    setCategory(value)
    setCategoryName(currentCategoryName)
  }

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

  const handleUpdatePost = async (e: FormEvent) => {
    e.preventDefault()
    setIsUpdatingPost(true)
    try {
      if (imageToShow) {
        deleteImageFromFirebase(downloadURLImage, "posts")
        console.log("Current post image deleted 🔴")
      }

      if (image && imageToShow) {
        const newDownloadURL = await uploadImageToFirebaseStorage(
          image,
          "posts"
        )
        setDownloadURLImage(newDownloadURL)
        console.log("Main image updated 🟢")
      }

      let latitude: number | null = null
      let longitude: number | null = null
      if (geoCoordinates) {
        const coordinates = geoCoordinates.split(",")
        latitude = Number(coordinates[0])
        longitude = Number(coordinates[1])
      }
      const tags = tag.split(",")
      const postData: UpdatePost = {
        title: title,
        category: category,
        author: authorId,
        mainImage: downloadURLImage,
        content: content,
        latitude: latitude,
        longitude: longitude,
        tag: tags,
        highlighted: isHighlighted,
        author_notes: authorNotes,
      }

      await updatePost(id!!, postData)

      toast.success("Post atualizado com suceddo!", {
        autoClose: 2000,
        hideProgressBar: true,
      })
    } catch (error) {
      console.error("Error while updating post: " + error)
      toast.error("Erro ao atualizar o post!", {
        autoClose: 1000,
        hideProgressBar: true,
      })
    }
    setIsUpdatingPost(false)
  }

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    deleteImageFromFirebase(downloadURLImage, "posts")
    mutate(id)
    toast.success("post deletado")
    setIsDeleting(false)
    navigate("/posts")
  }

  useEffect(() => {
    if (post && !isLoading) {
      const coordinates =
        post?.latitude && post.longitude
          ? `${post?.latitude},${post?.longitude}`
          : null

      setTitle(post?.title)
      setAuthor(post?.author)
      setContent(post?.content)
      setTag(post?.tag.toString())
      setAuthorId(post?.author._id)
      setCategory(post?.category._id)
      setGeoCoordinates(coordinates)
      setAuthorNotes(post?.author_notes)
      setCategoryName(post?.category.name)
      setDownloadURLImage(post?.mainImage)
      setIsHighlighted(post?.highlighted)
    }
  }, [post, isLoading])

  if (isLoading)
    return (
      <section className="w-full text-red-600 h-[80vh] flex items-center justify-center">
        <ClipLoader size={40} />
      </section>
    )

  return (
    <main className="w-full h-[85vh] overflow-y-hidden justify-center flex items-center gap-6 ">
      <div className="border rounded-sm flex-[2] overflow-y-hidden">
        <ReactQuill
          modules={modules}
          value={content}
          onChange={(value) => setContent(value)}
          className="h-[70vh] bg-foreground scroll-bar w-full"
        />
      </div>
      <div className="h-[70vh] relative border-l flex-[1] py-8 px-4 overflow-y-scroll scroll-bar">
        <form
          encType="multipart/form-data"
          onSubmit={handleUpdatePost}
          className="w-full gap-4 items-center absolute inset-0 flex-col p-4 flex"
        >
          <div className="w-full">
            {imageToShow ? (
              <div className="relative w-full h-40">
                <Button
                  variant={"outline"}
                  onClick={() => setImageToShow(null)}
                  className="absolute text-[12px] right-0 cursor-pointer z-10"
                >
                  Apagar
                </Button>
                <Label htmlFor="image">
                  <img
                    src={imageToShow}
                    className="absolute w-full h-full inset-0 object-contain"
                    alt=""
                  />
                  <Input
                    id="image"
                    type="file"
                    onChange={(e) => handleFileInputChange(e)}
                    className="opacity-0 w-0 h-0"
                  />
                </Label>
              </div>
            ) : (
              <Label htmlFor="image">
                <img
                  src={downloadURLImage}
                  className="w-full h-36 object-contain"
                  alt={title}
                />
                <Input
                  id="image"
                  type="file"
                  onChange={(e) => handleFileInputChange(e)}
                  className="opacity-0 w-0 h-0"
                />
              </Label>
            )}
          </div>

          <InputField
            type="text"
            label="Título"
            value={title!!}
            onChange={setTitle!!}
          />

          <div className="w-full flex items-end justify-center gap-x-3">
            <div className="flex items-start justify-center w-full flex-col">
              <Label className=" text-[12px]" htmlFor="category">
                Categoria
              </Label>
              <Select onValueChange={(value) => handleSelectInputChange(value)}>
                <SelectTrigger className="w-full" id="category">
                  <SelectValue
                    defaultValue={category}
                    placeholder={categoryName}
                  />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category: CategoryData) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center w-24 px-2 py-2 gap-x-2 border rounded-md justify-center">
              <Label htmlFor="checked">Destacar</Label>
              <Input
                type="checkbox"
                id="checked"
                onChange={(e) => setIsHighlighted(e.target.checked)}
                checked={isHighlighted}
                className="w-12 h-6"
              />
            </div>
          </div>

          {categoryName === "Agenda AO" && (
            <InputField
              value=""
              onChange={() => {}}
              label="Adicionar documento PDF"
              type="file"
              acceptProp="application/pdf"
            />
          )}

          {categoryName === "Passeios" && (
            <InputField
              value={geoCoordinates ? geoCoordinates : ""}
              onChange={setGeoCoordinates}
              label="Latitude e Longitude"
              type="text"
            />
          )}

          <InputField
            value={tag}
            onChange={setTag}
            label="Adicionar tags(optional)"
            type="text"
          />

          <div className="flex flex-col w-full">
            <Label htmlFor="notes" className="text-[12px]">
              Notas do autor(opcional)
            </Label>
            <Textarea
              value={authorNotes}
              onChange={(e) => setAuthorNotes(e.target.value)}
              id="notes"
              rows={6}
              className="w-full scroll-bar border resize-none"
            />
          </div>

          <div className="w-full flex flex-col">
            <Label className="text-[12px]" htmlFor="author">
              Autor
            </Label>
            <Select
              defaultValue={authorId}
              onValueChange={(value) => setAuthorId(value)}
            >
              <SelectTrigger id="author" className="w-full">
                <SelectValue
                  defaultValue={authorId}
                  placeholder={
                    <div className="flex items-center space-x-1">
                      <img
                        src={post?.author.image}
                        className="w-6 h-6 object-contain"
                        alt=""
                      />
                      <span>{post!!.author.firstname}</span>
                      <span>{post!!.author.lastname}</span>
                    </div>
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {users?.map((user) => (
                  <SelectItem key={user._id} value={user._id}>
                    <div className="flex items-center gap-x-1">
                      <img
                        src={user.image ?? "/user.png"}
                        className="w-6 h-6 rounded-full object-cover"
                        alt="imagem do usuário"
                      />
                      <span>{user.firstname}</span>
                      <span>{user.lastname}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full flex items-center justify-start gap-x-3 ">
            <Button disabled={isUpdatingPost} variant={"default"}>
              {isUpdatingPost ? <ClipLoader size={21} /> : "Salvar alterações"}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={"destructive"}>Eliminar</Button>
              </AlertDialogTrigger>
              <DialogModal
                isDeleting={isDeleting}
                handleDelete={handleDelete}
                id={id!!}
              />
            </AlertDialog>
          </div>
        </form>
      </div>
    </main>
  )
}

export default EditPostPostPage
