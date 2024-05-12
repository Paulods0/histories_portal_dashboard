import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputHTMLAttributes, forwardRef } from "react"
import { useFormContext } from "react-hook-form"

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
}

const InputCheckbox = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { register } = useFormContext()
  return (
    <div className="border rounded-lg px-4 py-3 flex items-center justify-start w-fit  gap-2">
      <Label className="flex gap-2">
        {props.label}
        <Input
          type="checkbox"
          id={props.name}
          {...register(props.name)}
          {...props}
          ref={ref}
          className="size-4"
        />
      </Label>
    </div>
  )
})

export default InputCheckbox
