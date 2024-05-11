import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { ChangeEvent } from "react"
import { Button } from "../ui/button"

type Props = {
  handleSetImage: (e: ChangeEvent<HTMLInputElement>) => void
  handleRemoveImage: () => void
  file: File | undefined
}

const InputImage = ({ file, handleSetImage, handleRemoveImage }: Props) => {
  return (
    <div className="w-full gap-3 flex items-center justify-center">
      <Label
        className="p-3 cursor-pointer text-center border rounded-lg text-xs"
        htmlFor="image"
      >
        Adicionar imagem
        <Input
          id="image"
          type="file"
          className="hidden w-fit"
          onChange={handleSetImage}
        />
      </Label>
      {file ? (
        <Button
          type="button"
          variant={"destructive"}
          onClick={handleRemoveImage}
          className="text-xs p-2"
        >
          Remover
        </Button>
      ) : null}
    </div>
  )
}

export default InputImage
