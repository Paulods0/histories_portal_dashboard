import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { User } from "@/types/data"
import { Avatar, AvatarImage } from "../ui/avatar"
import { formatDate } from "@/utils/helpers"
import EditUserDialog from "./edit-user-dialog"
import DeleteUserDialog from "./delete-user-dialog"

type Props = {
  users: User[] | undefined
}

const UsersTable = ({ users }: Props) => {
  return (
    <div className="w-full h-[75vh] overflow-auto scroll-bar mx-auto rounded-lg border p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imagem</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Sobrenome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="lg:w-[300px]">Data de criação</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users?.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={user?.image ?? "/user.png"} />
                </Avatar>
              </TableCell>
              <TableCell>{user.firstname}</TableCell>
              <TableCell>{user.lastname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{formatDate(user.createdAt)}</TableCell>
              <TableCell className="flex items-center gap-3">
                <EditUserDialog user={user} />
                <DeleteUserDialog user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default UsersTable
