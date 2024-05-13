import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { User } from "@/types/data"

type AuthorNotesProps = {
  author?: User
  notes?: string
}

const AuthorNotes = ({ author, notes }: AuthorNotesProps) => {
  return (
    <Card className="self-start mt-12 max-w-3xl">
      <CardHeader className="flex flex-row items-center gap-x-2">
        <Avatar className="w-24 h-24">
          <AvatarFallback>
            {author?.firstname.charAt(0).toUpperCase()}
          </AvatarFallback>
          <AvatarImage src={author?.image} />
        </Avatar>

        <CardTitle className="space-x-1">
          <span>{author?.firstname}</span>
          <span>{author?.lastname}</span>
        </CardTitle>
        {/* <CardDescription>{author.email}</CardDescription> */}
      </CardHeader>
      <CardContent className="text-[16px]">{notes}</CardContent>
    </Card>
  )
}

export default AuthorNotes
