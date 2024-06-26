import LoaderSpinner from "@/components/global/loader-spinner"
import SsubscribersTable from "@/components/subscribers-table"
import { useGetSubscribers } from "@/lib/react-query/queries/subscriber-queries"

const SubscribersPage = () => {
  const { data: subscribers, isLoading } = useGetSubscribers()

  if (isLoading) {
    return (
      <div className="w-full p-12 items-center flex justify-center">
        <LoaderSpinner />
      </div>
    )
  }

  return (
    <main className="w-full flex flex-col">
      <div className="w-full px-4 lg:px-0 lg:w-[900px] mx-auto flex flex-col mt-12">
        <h1 className="text-3xl text-left font-bold capitalize">Inscritos</h1>
        <SsubscribersTable subscribers={subscribers} />
      </div>
    </main>
  )
}

export default SubscribersPage
