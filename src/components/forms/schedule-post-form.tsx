import { useCreateSchedulePost } from "@/lib/react-query/mutations"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { ClipLoader } from "react-spinners"
import { z } from "zod"
import { uploadImageToFirebaseStorage } from "@/utils/helpers"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ScheduleFormSchemaType, scheduleFormSchema } from "@/types/schema"

type Props = {
  category: string
}

const SchedulePostForm = ({ category }: Props) => {
  const { isPending } = useCreateSchedulePost()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleFormSchemaType>({
    mode: "all",
    resolver: zodResolver(scheduleFormSchema),
  })

  const handleSubmitForm = (data: ScheduleFormSchemaType) => {
    console.log(data.file[0])
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-3">
      <div>
        <Label htmlFor="doc" className="text-[12px]">
          Documento PDF
        </Label>
        <Input
          className="file:text-white "
          id="doc"
          type="file"
          {...register("file")}
          accept="application/pdf"
        />
        {errors.file && (
          <span className="text-xs text-red-600">{errors.file.message}</span>
        )}
      </div>

      <Button disabled={isPending} type="submit">
        {isPending ? <ClipLoader size={14} /> : "Publicar"}
      </Button>
    </form>
  )
}

export default SchedulePostForm
