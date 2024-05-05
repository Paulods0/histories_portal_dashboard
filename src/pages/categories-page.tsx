import { useAuthContext } from "../context/AuthContext"
import PostCategoriesTable from "@/components/categories-components/post-categories-table"
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs"
import ProductCategoryTable from "@/components/categories-components/product-categories-table"
import AddCategoryDialog from "@/components/categories-components/add-category-dialog"

const CategoriesPage = () => {
  return (
    <main className="py-3 flex flex-col items-center justify-center">
      <div className="w-full lg:w-[700px] mx-auto flex">
        <Tabs defaultValue="posts">
          <TabsList>
            <TabsTrigger className="text-xs lg:text-sm" value="posts">
              Categoria de posts
            </TabsTrigger>
            <TabsTrigger className="text-xs lg:text-sm" value="produtos">
              Categoria de produtos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <PostCategoriesTable />
          </TabsContent>

          <TabsContent value="produtos">
            <ProductCategoryTable />
          </TabsContent>
        </Tabs>

        <AddCategoryDialog />
      </div>
    </main>
  )
}

export default CategoriesPage
