import { ChangeEvent, SetStateAction, useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

type Props = {
  setImage: React.Dispatch<SetStateAction<File | undefined>>
}

const PostImageInput = ({ setImage }: Props) => {
  const [file, setFile] = useState("")

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const urlImage = URL.createObjectURL(e.target.files[0])
      setFile(urlImage)
      setImage(e.target.files[0])
    }
  }

  return (
    <>
      {file && (
        <div className="relative">
          <img
            src={file}
            className="h-32 w-full object-contain aspect-square mx-auto"
          />
          <button
            onClick={() => setFile("")}
            className="absolute text-xs top-3 hover:text-white/20 transition-all right-10"
          >
            Fechar
          </button>
        </div>
      )}

      <Label
        className="p-3 cursor-pointer text-center border rounded-lg"
        htmlFor="image"
      >
        Adicionar imagem
        <Input
          onChange={(e) => handleChangeInput(e)}
          id="image"
          type="file"
          className="hidden w-full"
        />
      </Label>
    </>
  )
}

export default PostImageInput
