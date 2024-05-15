import { useEffect, useState } from "react"

import QuillEditor from "@/components/global/quill-editor"

import { Post, SchedulePost } from "@/types/data"
import { getSinglePost } from "@/api/post"

import { useParams } from "react-router-dom"
import LoaderSpinner from "@/components/global/loader-spinner"
import EditPostForm from "@/components/forms/edit-post-form"
import EditTourPostForm from "@/components/forms/edit-tour-post.form"
import SelectAuthorInput from "@/components/add-post-components/select-author-input"
import SelectInputCategory from "@/components/edit-post-components/select-input-category"

const EditPostPostPage = () => {
  const { id } = useParams()

  const [content, setContent] = useState("")
  const [authorId, setAuthorId] = useState("")
  const [category, setCategory] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [categoryName, setCategoryName] = useState("")
  const [post, setPost] = useState<Post | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      const post = await getSinglePost(id!!)
      setPost(post)
      setContent(post?.content)
      setAuthorId(post?.author._id)
      setCategory(post.category._id)
      setCategoryName(post.category.name)

      setIsLoading(false)
    }
    fetchData()
  }, [id])

  if (isLoading) {
    return <LoaderSpinner />
  }

  return (
    <main className="flex h-full justify-center items-center">
      <section className="w-full h-full mx-auto flex lg:flex-row flex-col gap-6">
        <QuillEditor
          className="flex-[2] "
          content={content}
          setContent={setContent}
        />

        <div className="flex-1 h-full gap-4 w-full flex flex-col">
          {categoryName === "Passeios" && (
            <EditTourPostForm
              content={content}
              author={authorId}
              category={category}
              post={post}
            />
          )}

          {categoryName !== "Passeios" && categoryName !== "Agenda AO" && (
            <EditPostForm
              content={content}
              authorId={authorId}
              category={category}
              post={post}
            />
          )}

          <SelectAuthorInput setAuthorId={setAuthorId} />
          <SelectInputCategory
            category={category}
            setCategory={setCategory}
            categoryName={categoryName}
            setCategoryName={setCategoryName}
          />
        </div>
      </section>
    </main>
  )
}

export default EditPostPostPage
