import { useEffect, useState } from "react"
import { ICategoryData } from "../types"
import { getAllCategories } from "../api/apiCalls"

const CategoriasAdmin = () => {
  const [categories, setCategories] = useState<ICategoryData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCategories()
        setCategories(data)
      } catch (error) {
        console.log("Error: " + error)
      }
    }
    fetchData()
  }, [])

  return (
    <main className="w-full flex gap-4 h-full">
      <div className="flex-1 flex gap-4 flex-col">
        <div className="h-full bg-orange-400"></div>
        <div className="h-full bg-blue-600">2</div>
      </div>
      <div className="flex-[0.5]  h-full row-span-2 bg-red-300">
        <form className="h-full w-full flex items-center flex-col justify-around"></form>
      </div>
    </main>
  )
}

export default CategoriasAdmin
