import { useEffect, useState } from "react"

import { Post } from "@/types/data"
import { PostEntity } from "@/api/post"
import { useParams } from "react-router-dom"
import QuillEditor from "@/components/global/quill-editor"
import EditPostForm from "@/components/forms/edit-post-form"
import LoaderSpinner from "@/components/global/loader-spinner"
import EditTourPostForm from "@/components/forms/edit-tour-post.form"
import SelectAuthorInput from "@/components/add-post-components/select-author-input"
import SelectInputCategory from "@/components/edit-post-components/select-input-category"

const EditPostPostPage = () => {
  const { id } = useParams()

  const [content, setContent] = useState("")
  const [authorId, setAuthorId] = useState("")
  const [category, setCategory] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState<Post | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      const post = await PostEntity.getSinglePost(id!!)
      setPost(post)
      setContent(post?.content)
      setCategory(post.category)
      setAuthorId(post?.author._id)

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
          {category === "passeios" && (
            <EditTourPostForm
              content={content}
              author={authorId}
              category={category}
              post={post}
            />
          )}

          {category !== "passeios" && category !== "agenda ao" && (
            <EditPostForm
              content={content}
              authorId={authorId}
              category={category}
              post={post}
            />
          )}

          <SelectAuthorInput authorId={authorId} setAuthorId={setAuthorId} />
          <SelectInputCategory category={category} setCategory={setCategory} />
        </div>
      </section>
    </main>
  )
}

export default EditPostPostPage
