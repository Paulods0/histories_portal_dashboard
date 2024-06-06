import { useState } from "react"
import QuillEditor from "./components/global/quill-editor"
import AddTipsForm from "./components/add-tips/add-tips-form"
import { Link } from "react-router-dom"
import { Button } from "./components/ui/button"

const AddTips = () => {
  const [content, setContent] = useState("")

  return (
    <div className="w-full h-full flex flex-col gap-2 px-12">
      <div className="border-b py-2 flex items-center justify-between">
        <h1 className="font-bold text-2xl capitalize">Adicionar dica</h1>
        <Button variant={"default"} asChild>
          <Link to="/dicas/todas">Ver dicas</Link>
        </Button>
      </div>
      <section className="w-full grid grid-cols-1 lg:grid-cols-3 py-4 gap-6 mx-auto">
        <section className="lg:col-span-2 w-full">
          <QuillEditor content={content} setContent={setContent} />
        </section>
        <section className="border rounded-lg p-4 w-full">
          <AddTipsForm setContent={setContent} content={content} />
        </section>
      </section>
    </div>
  )
}

export default AddTips
