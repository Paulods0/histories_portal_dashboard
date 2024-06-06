import { FC } from "react"

type Props = {}

const EditPartnerPage: FC<Props> = () => {
  return (
    <main className="w-full flex-col">
      <section className="w-full flex justify-end"></section>
      <section className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="w-full border rounded-lg p-4 col-span-2"></div>
        <div className="w-full border rounded-lg p-4"></div>
      </section>
    </main>
  )
}

export default EditPartnerPage
