import { useState } from "react"

import PostForm from "@/components/forms/post-form"
import SchedulePostForm from "@/components/forms/schedule-post-form"

import QuillEditor from "@/components/global/quill-editor"
import ToursPostForm from "@/components/forms/tours-post-form"
import SelectAuthorInput from "@/components/add-post-components/select-author-input"
import SelectCategoryInput from "@/components/add-post-components/select-category-input"
import { useAuthContext } from "@/context/auth-context"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const AddPostPage = () => {
  const { user } = useAuthContext()

  if (user!!.role === "store-manager") {
    return (
      <main className="flex flex-col items-center justify-center gap-6 h-[80vh] md:h-screen mx-auto max-w-96 ">
        <h1 className="text-xl md:text-2xl text-white">
          Não tem permissão para adicionar posts, apenas os usuários com as
          roles de <span className="text-red-600 font-bold">ADMIN</span> e{" "}
          <span className="text-red-600 font-bold">PUBLICADOR</span> podem
          adicionar posts.
        </h1>
        <Button asChild variant={"link"} className="text-xl">
          <Link to="/posts">Ver posts</Link>
        </Button>
      </main>
    )
  }

  const [content, setContent] = useState("")
  const [authorId, setAuthorId] = useState("")
  const [category, setCategory] = useState("")
  const [categoryName, setCategoryName] = useState("")

  return (
    <main className="flex h-full justify-center items-center">
      <section className="w-full h-full mx-auto flex lg:flex-row flex-col gap-6">
        <QuillEditor
          className="flex-[2]"
          content={content}
          setContent={setContent}
        />

        <div className="flex-1 px-4 gap-2 flex-col flex py-2">
          {categoryName === "Passeios" && (
            <ToursPostForm
              authorId={authorId}
              category={category}
              content={content}
            />
          )}

          {categoryName !== "Agenda AO" && categoryName !== "Passeios" && (
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
          
          {categoryName === "Agenda AO" && (
            <SchedulePostForm authorId={authorId} category={category} />
          )}
        </div>
      </section>
    </main>
  )
}

export default AddPostPage
