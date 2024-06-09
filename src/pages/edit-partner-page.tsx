import LoaderSpinner from "@/components/global/loader-spinner"
import QuillEditor from "@/components/global/quill-editor"
import EditPartnerForm from "@/components/partners-component/edit-partner-form"
import { Button } from "@/components/ui/button"
import { useGetSinglePartner } from "@/lib/react-query/queries/partner-queries"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const EditPartner = () => {
  const { id } = useParams()
  const { data: partner, isLoading } = useGetSinglePartner(id!!)
  const [content, setContent] = useState("")

  useEffect(() => {
    if (partner) {
      setContent(partner.content)
    }
  }, [partner])

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
          <Link to="/parceiros">Ver parceiros</Link>
        </Button>
      </div>

      <section className="w-full grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-lg w-full col-span-2 ">
          <QuillEditor content={content} setContent={setContent} />
        </div>

        <EditPartnerForm content={content} partner={partner!!} />
      </section>
    </main>
  )
}

export default EditPartner
