import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuthContext } from "@/context/auth-context"
import { useGetAllUsers } from "@/lib/react-query/queries"
import { SetStateAction } from "react"
import { ClipLoader } from "react-spinners"
import { Label } from "../ui/label"

type Props = {
  setAuthorId: React.Dispatch<SetStateAction<string>>
}

const SelectAuthorInput = ({ setAuthorId }: Props) => {
  const { userId } = useAuthContext()
  const { data: users, isLoading: isLoadingUsers } = useGetAllUsers()

  if (isLoadingUsers) {
    return (
      <div className="w-full items-center justify-center">
        <ClipLoader size={20} color="#FFF" />
      </div>
    )
  }

  let currAuthor = users!!.find((user) => user._id === userId)!!

  return (
    <div className="w-full">
      <Label>Autor</Label>

      <Select
        defaultValue={currAuthor._id}
        onValueChange={(value) => setAuthorId(value)}
      >
        <SelectTrigger className="bg-foreground text-background">
          <SelectValue
            placeholder={
              <span className="flex items-center gap-1">
                <img
                  src={currAuthor?.image ?? "/user.png"}
                  className="size-6 rounded-full"
                  alt="profile-image"
                />
                <span>{currAuthor?.firstname}</span>
                <span>{currAuthor?.lastname}</span>
              </span>
            }
          />
        </SelectTrigger>

        <SelectContent>
          {users?.map((user) => (
            <SelectItem key={user._id} value={user._id}>
              <div className="w-full gap-x-3 flex items-center">
                <img
                  src={user.image ?? "/user.png"}
                  className="w-6 h-6 rounded-full object-cover"
                  alt="imagem do autor"
                />
                <div className="flex items-center gap-x-1">
                  <span>{user.firstname}</span>
                  <span>{user.lastname}</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectAuthorInput
