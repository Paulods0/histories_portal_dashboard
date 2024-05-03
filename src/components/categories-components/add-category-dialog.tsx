import { CiCirclePlus } from "react-icons/ci"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import ProductCategoryForm from "./product-category-form"
import PostCategoryForm from "./post-category-form"

const AddCategoryDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="relative right-32" asChild>
        <Button className="flex items-center gap-2">
          <CiCirclePlus size={22} />
          Adicionar
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-foreground text-background">
        <Tabs defaultValue="post">
          <TabsList className="bg-foreground">
            <TabsTrigger className="bg-foreground" value="post">
              Categoria de post
            </TabsTrigger>
            <TabsTrigger className="bg-foreground" value="product">
              Categoria de produtos
            </TabsTrigger>
          </TabsList>
          <TabsContent className="bg-foreground" value="post">
            <PostCategoryForm />
          </TabsContent>
          <TabsContent className="bg-foreground" value="product">
            <ProductCategoryForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default AddCategoryDialog
