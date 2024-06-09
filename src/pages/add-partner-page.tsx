import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import QuillEditor from "@/components/global/quill-editor"
import AddPartnerForm from "@/components/partners-component/add-partner-form"

const AddPartnerPage = () => {
  const [content, setContent] = useState("")

  return (
    <main className="w-full h-full flex flex-col pb-6 gap-4">
      <section className="w-full flex items-center justify-end">
        <Button asChild>
          <Link to="/parceiros">Ver todos</Link>
        </Button>
      </section>

      <section className="grid h-full grid-cols-1 lg:grid-cols-3 w-full gap-4">
        <QuillEditor content={content} setContent={setContent} />

        <AddPartnerForm content={content} />
      </section>
    </main>
  )
}

export default AddPartnerPage
