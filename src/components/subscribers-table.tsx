import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FC } from "react"

export type Subscriber = {
  _id: string
  name: string
  email: string
  phone?: string
}

type Props = {
  subscribers?: Subscriber[]
}

const SsubscribersTable: FC<Props> = ({ subscribers }) => {
  return subscribers?.length === 0 ? (
    <h3 className="mt-20 text-center font-semibold text-2xl">
      Não há nenhum inscrito na newsletter ainda.
    </h3>
  ) : (
    <div className="w-full border rounded-lg p-4 mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {subscribers?.map((subscriber) => (
            <TableRow key={subscriber._id}>
              <TableCell>{subscriber._id}</TableCell>
              <TableCell>{subscriber.name}</TableCell>
              <TableCell>{subscriber.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default SsubscribersTable
