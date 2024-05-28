import { ClassifiedPost } from "@/types/data"

import ClassifiedDialog from "./classified-dialog"
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
import { Button } from "../ui/button"

type Props = {
  post: ClassifiedPost | undefined
}

const ClassifiedCard = ({ post }: Props) => {
  return (
    <div key={post?._id} className="flex flex-col border rounded-lg">
      <img
        src={post?.mainImage}
        className="w-full object-contain h-32"
        alt=""
      />

      <div className="flex w-full flex-col p-3 border-t">
        <h1 className="text-xl capitalize font-semibold">{post?.title}</h1>
        <div className="flex flex-col w-full">
          <div className="w-full flex items- justify-between gap-4 text-sm">
            <div className="flex flex-col gap-1">
              <p>
                Autor:
                {` ${post?.author.firstname} ${post?.author.lastname}`}
              </p>
              <p>Tel:{` ${post?.author.phone}`}</p>
              <p>Preço: {post?.price}</p>
            </div>

            <div className="flex flex-col gap-1">
              <ClassifiedDialog post={post} />
              <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-center">
                {post?.type === "sell" ? "À venda" : "Comprar"}
              </div>
            </div>
          </div>
          {/* <p className="w-full">Email:{`${post?.author.email}`}</p> */}
        </div>
      </div>
    </div>
    // <Dialog>
    //   <DialogTrigger asChild>

    //   </DialogTrigger>
    //   <DialogContent>
    //     <DialogHeader>
    //       <DialogTitle>
    //         Tem a certeza que pretende eliminar esta post da base de dados?
    //       </DialogTitle>
    //       <DialogDescription>
    //         Esta ação é irreverssível. Ao elimnar este post, todos os dados
    //         serão removidos permanentemente da base de dados
    //       </DialogDescription>
    //     </DialogHeader>
    //     <DialogFooter>
    //       <DialogClose asChild>
    //         <Button>Cancelar</Button>
    //       </DialogClose>
    //       <Button variant={"destructive"}>Eliminar</Button>
    //     </DialogFooter>
    //   </DialogContent>
    // </Dialog>
  )
}

export default ClassifiedCard
