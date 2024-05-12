import { Post } from "@/types/data"

type Props = {
  post: Post | undefined
  category: string
  author: string
}

const EditTourPostForm = ({}: Props) => {
  return (
    <form className="flex flex-col gap-3 w-full">
      <h1>edit tour form</h1>
    </form>
  )
}

export default EditTourPostForm
