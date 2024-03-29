type CategoriesFilterButtonType = {
  container: string
  setContainer: React.Dispatch<React.SetStateAction<"topics" | "categories">>
}

const CategoriesFilterButtons = ({
  container,
  setContainer,
}: CategoriesFilterButtonType) => {
  const handleSetTopics = () => {
    setContainer("topics")
  }
  const handleSetCategories = () => {
    setContainer("categories")
  }
  return (
    <div className="flex gap-2">
      <button
        onClick={handleSetTopics}
        className={`px-3 py-1 rounded-md ${
          container === "topics"
            ? "bg-BLACK text-white"
            : "border-GRAY-LIGHTER border"
        }`}
      >
        tópicos
      </button>
      <button
        onClick={handleSetCategories}
        className={`px-3 py-1 rounded-md ${
          container === "categories"
            ? "bg-BLACK text-white"
            : "border-GRAY-LIGHTER border"
        }`}
      >
        categorias
      </button>
    </div>
  )
}

export default CategoriesFilterButtons
