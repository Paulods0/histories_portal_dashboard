import { SchedulePost } from "@/types/data"
import { formatDate } from "@/utils/helpers"
import { MdOutlineRemoveRedEye } from "react-icons/md"
import { Button } from "../ui/button"
import EditSchedulePostDialog from "./edit-schedule-post-dialog"
import { useAuthContext } from "@/context/auth-context"

type Props = {
  post: SchedulePost
}

const SchedulePostCard = ({ post }: Props) => {
  const { user } = useAuthContext()
  return (
    <div className="h-auto flex flex-col w-full lg:w-auto p-4 border rounded-md hover:bg-muted-foreground/10 transition-all duration-200 ease-in-out">
      <img
        src="/pdf-image.png"
        className="w-full h-20 object-contain"
        alt="pdf ícone"
      />

      <div className="flex flex-col items-end justify-between w-full">
        <div className="flex flex-col items-center gap-2 w-full">
          <h1 className="text-xl font-semibold">{post.title}</h1>
          <p className="text-sm text-zinc-500">
            {formatDate(post!!.createdAt!!)}
          </p>
        </div>

        <div className="flex items-center gap-2 mt-4">
          {user?.role !== "store-manager" && (
            <EditSchedulePostDialog post={post} />
          )}

          <Button
            asChild
            variant={"secondary"}
            className="flex items-center w-fit gap-2"
          >
            <a
              target="_blank"
              className="flex items-center gap-2"
              href={post.file}
            >
              Ver
              <MdOutlineRemoveRedEye />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SchedulePostCard
