import { useState } from "react"
import CategoriesTable from "./CategoriesTable"
import CategoriesFilterButtons from "./CategoriesFilterButtons"
import CategoriesStatsCard from "./CategoriesStatsCard"
import TopicsTable from "./TopicsTable"

const CategoriesFilterContainer = () => {
  const [container, setContainer] = useState<"topics" | "categories">("topics")
  const [categories, setCategories] = useState(0)
  const [topics, setTopics] = useState(0)

  return (
    <div className="w-full h-full flex flex-col col-span-2 p-2 gap-4">
      <div className="w-full flex items-end justify-between">
        <CategoriesFilterButtons
          container={container}
          setContainer={setContainer}
        />

        <div className="flex gap-2">
          <CategoriesStatsCard
            selected={container === "topics"}
            amount={6}
            label="tópicos de posts"
          />
          <CategoriesStatsCard
            selected={container === "categories"}
            amount={12}
            label="categorias de produtos"
          />
        </div>
      </div>

      {container === "topics" ? <TopicsTable /> : <CategoriesTable />}
    </div>
  )
}

export default CategoriesFilterContainer
