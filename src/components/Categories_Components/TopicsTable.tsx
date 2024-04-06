import { useEffect, useState } from "react"
import { ICategoryData } from "../../interfaces"
import { deleteCategory, getAllCategories } from "../../api"
import { ClipLoader } from "react-spinners"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { toast } from "react-toastify"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"

const TopicsTable = () => {
  const [topics, setTopics] = useState<ICategoryData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)

  const handleDeleteTopic = async (id: string) => {
    try {
      setIsLoadingDelete(true)
      await handleDeleteTopic(id)
      setIsLoadingDelete(false)
      toast.success("Apagago com sucesso", {
        autoClose: 1000,
        hideProgressBar: true,
      })
    } catch (error) {
      console.log(error)
      toast.error("Erro ao apagar", {
        autoClose: 1000,
        hideProgressBar: true,
      })
    }
    window.location.reload()
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCategories()
      setTopics(data)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return (
    <Table className="w-full bg-WHITE flex p-2 flex-col rounded-md h-full gap-4">
      <TableRow>
        <TableHeader className="flex w-full items-center">
          <TableHead className="w-full justify-between flex items-center text-[14px]">
            Nome
          </TableHead>
          <TableHead className="w-full justify-between flex items-center text-[14px]">
            Criado por
          </TableHead>
          <TableHead className="w-full justify-between flex items-center text-[14px]">
            Data de criação
          </TableHead>
          <TableHead className="w-full justify-between flex items-center text-[14px]">
            Ações
          </TableHead>
        </TableHeader>
      </TableRow>

      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <ClipLoader color="#111111" size={40} />
        </div>
      ) : (
        <TableBody className="overflow-y-auto scroll-bar">
          {topics.map((topic, index) => (
            <TableRow key={index} className="flex">
              <TableCell className="w-full justify-between flex items-center text-[14px]">
                {topic.name}
              </TableCell>
              <TableCell className="w-full justify-between flex items-center text-[14px]">{`${topic.creator?.firstname} ${topic.creator?.lastname}`}</TableCell>
              <TableCell className="w-full  justify-between flex items-center text-[14px]">
                {topic.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="w-full  items-center justify-center flex gap-2">
                <Dialog>
                  <DialogTrigger>Editar</DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Editar o tópico</DialogTitle>
                    <div className="w-full">
                      <input
                        type="text"
                        className="bg-transparent w-full border rounded-md outline-none p-2 "
                        value={topic.name}
                        onChange={() => {}}
                      />
                    </div>
                    <DialogFooter>
                      <DialogClose>
                        <Button variant={"secondary"}>Cancelar</Button>
                      </DialogClose>
                      <Button className="">Atualizar altereções</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <button
                  // onClick={() => handleDeleteTopic(topic._id)}
                  className="bg-RED-DARK rounded-md px-2  py-[2px] text-black text-[14px]"
                >
                  Apagar
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  )
}

export default TopicsTable
