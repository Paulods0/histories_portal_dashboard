import { FC } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { User } from "@/types/data"

type Props = {
  users?: User[]
  userId?: string
  handleChange: (value: string) => void
}

const SelectAuthor: FC<Props> = ({ handleChange, userId, users }) => {
  return (
    <Select defaultValue={userId!!} onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue placeholder="Autor" />
      </SelectTrigger>
      <SelectContent>
        {users?.map((user) => (
          <SelectItem key={user._id} value={user._id}>
            <div className="flex items-center gap-1">
              <Avatar>
                <AvatarFallback>{user.firstname.charAt(0)}</AvatarFallback>
                <AvatarImage src={user.image} />
              </Avatar>
              <span>{user.firstname}</span>
              <span>{user.lastname}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SelectAuthor
