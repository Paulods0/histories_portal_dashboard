import { ClipLoader } from "react-spinners"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

import { formatDate } from "@/utils/helpers"
import DeleteCategoryDialog from "./delete-category-dialog"
import { useGetCategories } from "@/lib/react-query/queries-and-mutations"
import EditPostCategoryDialog from "./edit-post-category-dialog"

const PostCategoriesTable = () => {
  const { data: postCategories, isLoading } = useGetCategories()

  return (
    <div className="border w-[760px] h-[75vh] scroll-bar overflow-y-auto mx-auto rounded-lg bg-foregroud flex p-2 flex-col gap-4">
      <Table>
        <TableHeader className="w-full">
          <TableRow className="w-full">
            <TableHead>ID</TableHead>
            <TableHead className="">Nome</TableHead>
            <TableHead className="w-[200px]">Data de criação</TableHead>
          </TableRow>
        </TableHeader>

        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <ClipLoader color="#111111" size={40} />
          </div>
        ) : (
          <TableBody className="scroll-bar overflow-y-auto">
            {postCategories?.map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category._id.substring(0, 10)}...</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{formatDate(category.createdAt)}</TableCell>
                <TableCell className="space-x-3">
                  <EditPostCategoryDialog
                    id={category._id}
                    name={category.name}
                  />

                  <DeleteCategoryDialog
                    type="post-category"
                    id={category._id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  )
}

export default PostCategoriesTable
