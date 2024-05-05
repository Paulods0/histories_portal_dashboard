import { useState } from "react"
import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"
Quill.register("modules/imageUploader", ImageUploader)

//@ts-ignore
import ImageUploader from "quill-image-uploader"
import "quill-image-uploader/dist/quill.imageUploader.min.css"
import { toolbarOptions } from "@/utils/constants"
import { uploadImageToFirebaseStorage } from "@/utils/helpers"
import {
  useGetAllUsers,
  useGetCategories,
  useGetPostById,
} from "@/lib/react-query/queries"

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

  const { data: categories, isLoading } = useGetCategories()
  const { data: users, isLoading: isUsersLoading } = useGetAllUsers()
  const { data: post, isLoading: isLoadingPost } = useGetPostById(id!!)

  const [content, setContent] = useState("")
  const [categoryName, setCategoryName] = useState("")

  return (
    <main className="w-full grid grid-cols-1 lg:grid-cols-3 h-[85vh] place-items-center overflow-y-hidden gap-6">
      <div className="border h-[70vh] rounded-sm col-span-2 overflow-y-hidden">
        <ReactQuill
          modules={modules}
          value={content}
          onChange={(value) => setContent(value)}
          className="h-full bg-foreground scroll-bar w-full"
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
              categories={categories!!}
              post={post!!}
            />
            <SelectInputUser post={post!!} users={users!!} />

            {post?.category.name === "Passeios" ? (
              <EditTourPostForm post={post!!} />
            ) : post?.category.name === "Agenda AO" ? (
              ""
            ) : (
              <EditPostForm post={post!!} />
            )}
          </div>
        )}
      </div>
    </main>
  )
}

export default EditPostPostPage
