import { ClipLoader } from "react-spinners"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

import { useGetCategories } from "@/utils/react-query/queries-and-mutations"
import EditCategoryDialog from "./edit-category-dialog"
import { Button } from "../ui/button"
import DeleteCategoryDialog from "./delete-category-dialog"
import { formatDate } from "@/utils/helpers"

const PostCategoriesTable = () => {
  const { data: postCategories, isLoading } = useGetCategories()

  return (
    <div className="border w-[760px] h-[75vh] scroll-bar overflow-y-auto mx-auto rounded-lg bg-foregroud flex p-2 flex-col gap-4">
      <Table>
        <TableHeader className="w-full">
          <TableRow className="w-full">
            <TableHead className="">Nome</TableHead>
            <TableHead>Criado por</TableHead>
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
                <TableCell>{category.name}</TableCell>
                <TableCell>{`${category.creator?.firstname} ${category.creator?.lastname}`}</TableCell>
                <TableCell>{formatDate(category.createdAt)}</TableCell>
                <TableCell className="space-x-3">
                  <EditCategoryDialog />
                  <DeleteCategoryDialog type="post-category" id={category._id} />
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
