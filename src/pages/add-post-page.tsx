import { useState } from "react"
import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"

import { uploadImageToFirebaseStorage } from "../utils/helpers"

//@ts-ignore
import ImageUploader from "quill-image-uploader"

import "quill-image-uploader/dist/quill.imageUploader.min.css"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetAllUsers, useGetCategories } from "@/lib/react-query/queries"

import PostForm from "@/components/forms/post-form"
import SchedulePostForm from "@/components/forms/schedule-post-form"
import ToursPostForm from "@/components/forms/tours-post-form"
import { useAuthContext } from "@/context/AuthContext"

Quill.register("modules/imageUploader", ImageUploader)

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote"],
  ["link", "image", "video"],

  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],

  [{ size: ["small", false, "large", "huge"] }],

  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],

  ["clean"],
]
const modules = {
  toolbar: toolbarOptions,
  imageUploader: {
    upload: async (file: File) => {
      return await uploadImageToFirebaseStorage(file, "posts-content")
    },
  },
}

const AddPostPage = () => {
  const CLASSIFICADOS = "Classificados"
  const OVERLAND_EXPERIENCE = "Overland Experience"

  const { userId } = useAuthContext()
  const { data: users, isLoading } = useGetAllUsers()
  const { data: categories } = useGetCategories()

  let defaultUser

  if (!isLoading) {
    defaultUser = users!!.find((user) => user._id === userId)
  }

  const [author, setAuthor] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [categoryName, setCategoryName] = useState("")

  const handleChangeCategory = (value: string) => {
    const category = categories?.find((category) => category._id === value)
    setCategory(category!!._id)
    setCategoryName(category!!.name)
  }

  return (
    <main className="grid grid-cols-1 lg:grid-cols-3 lg:h-[80vh] gap-6 place-items-center">
      <div className="lg:col-span-2 h-[40vh] lg:h-[70vh] relative border overflow-y-auto scroll-bar w-full rounded-md">
        <ReactQuill
          modules={modules}
          theme="snow"
          value={content}
          onChange={(value) => setContent(value)}
          placeholder="Escrever post"
          className="w-full  h-full overflow-hidden"
        />
      </div>

      <div className="relative w-full overflow-y-auto scroll-bar border-l h-[70vh]">
        <div className="absolute inset-0 w-full h-full px-4 gap-4 flex-col flex py-6">
          <div className="w-full ">
            <Label htmlFor="title" className="text-xs">
              Categoria
            </Label>
            <Select onValueChange={(value) => handleChangeCategory(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>

              <SelectContent>
                {categories
                  ?.filter(
                    (category) =>
                      category.name !== CLASSIFICADOS &&
                      category.name !== OVERLAND_EXPERIENCE
                  )
                  .map((category) => (
                    <SelectItem
                      data-name={category.name}
                      key={category._id}
                      value={category._id}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full mb-3">
            <Label htmlFor="author" className="text-xs">
              Autor
            </Label>

            <Select onValueChange={(value) => setAuthor(value)}>
              <SelectTrigger id="author">
                <SelectValue
                  defaultValue={defaultUser?._id}
                  placeholder={
                    <span className="flex items-center gap-1">
                      <img
                        src={defaultUser?.image}
                        className="size-6 "
                        alt=""
                      />
                      {defaultUser?.firstname} {defaultUser?.lastname}
                    </span>
                  }
                />
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
                        <span>{user.firstname}</span>
                        <span>{user.lastname}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {categoryName === "Passeios" ? (
            <ToursPostForm category={category} author={author!!} />
          ) : categoryName === "Agenda AO" ? (
            <SchedulePostForm category={category} />
          ) : (
            <PostForm category={category} author={author!!} />
          )}
        </div>
      </div>
    </main>
  )
}

export default AddPostPage
