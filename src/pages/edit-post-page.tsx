import { useState } from "react"
import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"
Quill.register("modules/imageUploader", ImageUploader)

//@ts-ignore
import ImageUploader from "quill-image-uploader"
import "quill-image-uploader/dist/quill.imageUploader.min.css"
import { toolbarOptions } from "@/utils/constants"
import { uploadImageToFirebaseStorage } from "@/utils/helpers"
import { useGetPostById } from "@/lib/react-query/queries"

import { useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import SelectInputUser from "@/components/edit-post-components/select-input-user"
import SelectInputCategory from "@/components/edit-post-components/select-input-category"
import EditPostForm from "@/components/forms/edit-post-form"
import EditTourPostForm from "@/components/forms/edit-tour-post.form"

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

  const [content, setContent] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const [author, setAuthor] = useState("")

  const { data: post, isLoading: isLoadingPost } = useGetPostById(id!!)

  if (isLoadingPost) {
    return (
      <main className="w-full items-center justify-center h-full">
        <ClipLoader size={32} color="#FFF" />
      </main>
    )
  }

  return (
    <main className="w-full grid grid-cols-1 lg:grid-cols-3 lg:h-[85vh] place-items-center overflow-y-hidden gap-6">
      <div className="border h-[70vh] rounded-sm col-span-2 overflow-y-hidden">
        <ReactQuill
          modules={modules}
          value={post!!.content ?? content}
          onChange={(value) => setContent(value)}
          className="h-full scroll-bar w-full"
        />
      </div>

      <div className="h-[70vh] w-full relative border-l py-8 px-4 overflow-y-scroll scroll-bar">
        {isLoadingPost ? (
          <div className="w-full p-4 flex items-center justify-center ">
            <ClipLoader size={28} color="#FFF" />
          </div>
        ) : (
          <div className="w-full gap-4 items-center absolute inset-0 flex-col p-4 flex">
            <SelectInputCategory
              setCategoryName={setCategoryName}
              post={post!!}
            />
            <SelectInputUser setAuthor={setAuthor} post={post!!} />

            {post?.category.name === "Passeios" ? (
              <EditTourPostForm
                author={author}
                category={categoryName}
                post={post!!}
              />
            ) : post?.category.name === "Agenda AO" ? (
              "Em processo de atualização..."
            ) : (
              <EditPostForm
                author={author}
                post={post!!}
                category={categoryName}
              />
            )}
          </div>
        )}
      </div>
    </main>
  )
}

export default EditPostPostPage
