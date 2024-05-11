import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"

//@ts-ignore
import ImageUploader from "quill-image-uploader"
import "quill-image-uploader/dist/quill.imageUploader.min.css"

import { toolbarOptions } from "@/utils/constants"
import { uploadImageToFirebaseStorage } from "@/utils/helpers"
import { SetStateAction } from "react"
import { twMerge } from "tailwind-merge"

Quill.register("modules/imageUploader", ImageUploader)

const modules = {
  toolbar: toolbarOptions,
  imageUploader: {
    upload: async (file: File) => {
      return await uploadImageToFirebaseStorage(file, "posts-content")
    },
  },
}

type Props = {
  content: string
  className?: string
  setContent: React.Dispatch<SetStateAction<string>>
}

const QuillEditor = ({ className, content, setContent }: Props) => {
  return (
    <div
      className={twMerge(
        "lg:col-span-2 h-fit lg:h-[85vh] relative border overflow-y-auto py-6 scroll-bar w-full rounded-md",
        className
      )}
    >
      <ReactQuill
        modules={modules}
        theme="snow"
        value={content}
        onChange={(value) => setContent(value)}
        placeholder="Escrever post"
        className="w-full h-full overflow-hidden "
      />
    </div>
  )
}

export default QuillEditor
