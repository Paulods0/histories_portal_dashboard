import { SchedulePost } from "@/types/data"
import { formatDate } from "@/utils/helpers"
import { MdOutlineRemoveRedEye } from "react-icons/md"
import { Button } from "../ui/button"
import EditSchedulePostDialog from "./edit-schedule-post-dialog"

type Props = {
  post: SchedulePost
}

const SchedulePostCard = ({ post }: Props) => {
  return (
    <div className="h-auto flex flex-col w-full lg:w-auto p-4 border rounded-md hover:bg-zinc-900 transition-all duration-200 ease-in-out">
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
          <EditSchedulePostDialog post={post} />

          <Button
            variant={"secondary"}
            className="flex items-center w-fit gap-2"
          >
            <a target="_blank" className="flex items-center" href={post.file}>
              Ver
            </a>
            <MdOutlineRemoveRedEye />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SchedulePostCard
