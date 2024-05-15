import { ClassifiedPost } from "@/types/data"

import { ImBlocked } from "react-icons/im"
import { IoIosCheckmarkCircleOutline } from "react-icons/io"
import { FaRegCirclePause } from "react-icons/fa6"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Button } from "../ui/button"
import { useState } from "react"
import { useUpdateClassifiedPost } from "@/lib/react-query/mutations"
import { toast } from "react-toastify"
import LoaderSpinner from "../global/loader-spinner"

type Props = {
  post: ClassifiedPost | undefined
}

const ClassifiedDialog = ({ post }: Props) => {
  const { mutate } = useUpdateClassifiedPost()
  const [selected, setSelected] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSelected = (value: string) => {
    setSelected(value)
  }

  const handleUpdateClassified = async () => {
    setIsLoading(true)
    try {
      const data = {
        id: post!!._id,
        newStatus: selected,
      }
      mutate(data)
      setIsLoading(false)
      toast.success("Atualizado com sucesso")
    } catch (error) {
      setIsLoading(false)
      console.log(error)
      toast.error("Erro ao atualizar o post")
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        {post?.status === "active" && (
          <div className="flex bg-green-600 py-1 px-2 rounded-full items-center gap-2">
            <p className="capitalize">{post?.status}</p>
            <IoIosCheckmarkCircleOutline size={18} />
          </div>
        )}
        {post?.status === "inactive" && (
          <div className="flex bg-red-700 py-1 px-2 rounded-full items-center gap-2">
            <p className="capitalize">{post?.status}</p>
            <ImBlocked />
          </div>
        )}
        {post?.status === "suspended" && (
          <div className="bg-yellow-600 py-1 px-2 rounded-full flex items-center gap-2">
            <p className="capitalize">{post?.status}</p>
            <FaRegCirclePause />
          </div>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar o estado do produto</DialogTitle>
          <DialogDescription>
            O produto atual está{" "}
            <span
              className={`${
                post?.status === "active"
                  ? "text-green-700"
                  : post?.status === "inactive"
                  ? "text-red-700"
                  : "text-yellow-700"
              }`}
            >
              {post?.status === "active"
                ? "Activo"
                : post?.status === "inactive"
                ? "Inativo"
                : "Suspenso"}
            </span>
          </DialogDescription>
        </DialogHeader>
        <>
          <Select onValueChange={handleSelected}>
            <SelectTrigger className="bg-foreground text-background">
              <SelectValue placeholder="Selecionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Activo</SelectItem>
              <SelectItem value="suspended">Suspenso</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </>
        <DialogFooter>
          <DialogClose>Cancelar</DialogClose>
          <Button
            disabled={isLoading}
            onClick={handleUpdateClassified}
            variant={"secondary"}
          >
            {isLoading ? (
              <LoaderSpinner size={14} color="#111111" />
            ) : (
              "Atualizar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ClassifiedDialog
