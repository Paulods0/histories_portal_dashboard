import { useAuthContext } from "../context/AuthContext"
import PostCategoriesTable from "@/components/categories-components/post-categories-table"
import { CiCirclePlus } from "react-icons/ci"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs"
import ProductCategoryTable from "@/components/categories-components/product-categories-table"
import AddCategoryDialog from "@/components/categories-components/add-category-dialog"

const CategoriesPage = () => {
  const { userId } = useAuthContext()

  return (
    <main className="py-3 flex flex-col items-center justify-center">
      <div className="w-[700px] mx-auto flex">
        <Tabs defaultValue="posts">
          <TabsList>
            <TabsTrigger value="posts">Categoria de posts</TabsTrigger>
            <TabsTrigger value="produtos">Categoria de produtos</TabsTrigger>
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
