import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PostData, User } from "@/types/data"
import { Label } from "../ui/label"

type Props = {
  users: User[]
  post: PostData
}

const SelectInputUser = ({ post, users }: Props) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <Label htmlFor="category">Autor</Label>
      <Select>
        <SelectTrigger>
          <SelectValue
            placeholder={
              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarFallback></AvatarFallback>
                  <AvatarImage src={post.author.image} />
                </Avatar>
                <div className="flex items-center gap-1">
                  <span>{post?.author.firstname}</span>
                  <span>{post?.author.lastname}</span>
                  <span></span>
                </div>
              </div>
            }
          />
        </SelectTrigger>
        <SelectContent>
          {users?.map((user) => (
            <SelectItem key={user._id} value={user._id}>
              <div className="flex items-center gap-1">
                <Avatar className="size-6">
                  <AvatarFallback></AvatarFallback>
                  <AvatarImage src={user.image} />
                </Avatar>
                <div className="flex items-center gap-1">
                  <span>{user.firstname}</span>
                  <span>{user.lastname}</span>
                  <span></span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectInputUser
