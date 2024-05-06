import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PostData } from "@/types/data"
import { Label } from "../ui/label"
import { useGetAllUsers } from "@/lib/react-query/queries"
import { ClipLoader } from "react-spinners"
import { SetStateAction } from "react"

type Props = {
  post: PostData
  setAuthor: React.Dispatch<SetStateAction<string>>
}

const SelectInputUser = ({ post, setAuthor }: Props) => {
  const { data: users, isLoading } = useGetAllUsers()

  if (isLoading) {
    return (
      <main className="w-full items-center justify-center h-full">
        <ClipLoader size={24} color="#FFF" />
      </main>
    )
  }

  return (
    <div className="flex flex-col w-full gap-2">
      <Label htmlFor="category">Autor</Label>
      <Select onValueChange={(value) => setAuthor(value)}>
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
