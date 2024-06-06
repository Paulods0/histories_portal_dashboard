import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Link, useParams } from "react-router-dom"
import QuillEditor from "@/components/global/quill-editor"
import LoaderSpinner from "@/components/global/loader-spinner"
import EditTipForm from "@/components/tip-components/edit-tip-form"
import { useGetSingleTip } from "@/lib/react-query/queries/tip-queries"

const EditTipPage = () => {
  const { id } = useParams()
  const { data: tip, isLoading } = useGetSingleTip(id!!)

  const [content, setContent] = useState("")

  useEffect(() => {
    if (tip) {
      setContent(tip.content)
    }
  }, [tip])

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center p-8">
        <LoaderSpinner />
      </div>
    )
  }

  return (
    <main className="flex h-full flex-col gap-4 pb-4">
      <div className="w-full flex border-b pb-3 justify-end items-center">
        <Button asChild variant={"default"}>
          <Link to="/dicas/todas">Ver dicas</Link>
        </Button>
      </div>

      <section className="w-full grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-lg w-full col-span-2 ">
          <QuillEditor content={content} setContent={setContent} />
        </div>

        <EditTipForm content={content} tip={tip!!} />
      </section>
    </main>
  )
}

export default EditTipPage
