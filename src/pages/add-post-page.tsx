import { uploadImageToFirebaseStorage } from "../utils/helpers"
import { useState } from "react"
import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"

//@ts-ignore
import ImageUploader from "quill-image-uploader"
import "quill-image-uploader/dist/quill.imageUploader.min.css"

import { toolbarOptions } from "@/utils/constants"
import PostForm from "@/components/forms/post-form"
import ToursPostForm from "@/components/forms/tours-post-form"
import SchedulePostForm from "@/components/forms/schedule-post-form"

import PostImageInput from "@/components/add-post-components/post-image-input"
import SelectAuthorInput from "@/components/add-post-components/select-author-input"
import SelectCategoryInput from "@/components/add-post-components/select-category-input"

Quill.register("modules/imageUploader", ImageUploader)

const modules = {
  toolbar: toolbarOptions,
  imageUploader: {
    upload: async (file: File) => {
      return await uploadImageToFirebaseStorage(file, "posts-content")
    },
  },
}

const AddPostPage = () => {
  const [image, setImage] = useState<File | undefined>(undefined)
  const [content, setContent] = useState("")
  const [authorId, setAuthorId] = useState("")
  const [category, setCategory] = useState("")
  const [categoryName, setCategoryName] = useState("")

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
          {categoryName !== "Agenda AO" && (
            <PostImageInput setImage={setImage} />
          )}

          <SelectCategoryInput
            setCategoryName={setCategoryName}
            setCategory={setCategory}
          />
          <SelectAuthorInput setAuthorId={setAuthorId} />

          {categoryName === "Passeios" ? (
            <ToursPostForm
              image={image}
              content={content}
              category={category}
              authorId={authorId}
            />
          ) : categoryName === "Agenda AO" ? (
            <SchedulePostForm authorId={authorId} category={category} />
          ) : (
            <PostForm
              image={image}
              content={content}
              category={category}
              authorId={authorId!!}
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default AddPostPage
