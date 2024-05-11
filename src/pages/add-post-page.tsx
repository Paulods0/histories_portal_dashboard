import { useState } from "react"

import PostForm from "@/components/forms/post-form"
import SchedulePostForm from "@/components/forms/schedule-post-form"

import QuillEditor from "@/components/global/quill-editor"
import ToursPostForm from "@/components/forms/tours-post-form"
import SelectAuthorInput from "@/components/add-post-components/select-author-input"
import SelectCategoryInput from "@/components/add-post-components/select-category-input"

const AddPostPage = () => {
  const [content, setContent] = useState("")
  const [authorId, setAuthorId] = useState("")
  const [category, setCategory] = useState("")
  const [categoryName, setCategoryName] = useState("")

  return (
    <main className="grid grid-cols-1 place-items-center py-6 lg:grid-cols-3 h-full">
      <QuillEditor content={content} setContent={setContent} />

      <div className="relative w-full py-2 lg:mt-0 h-full">
        <div className="absolute inset-0 w-full h-full px-4 gap-2 flex-col flex py-2">
          {categoryName === "Agenda AO" ? (
            <SchedulePostForm authorId={authorId} category={category} />
          ) : categoryName === "Passeios" ? (
            <ToursPostForm
              authorId={authorId}
              category={category}
              content={content}
            />
          ) : (
            <PostForm
              content={content}
              authorId={authorId}
              category={category}
            />
          )}

          <SelectCategoryInput
            setCategory={setCategory}
            setCategoryName={setCategoryName}
          />

          <SelectAuthorInput setAuthorId={setAuthorId} />
        </div>
      </div>
    </main>
  )
}

export default AddPostPage
