import { InputHTMLAttributes, forwardRef } from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useFormContext } from "react-hook-form"

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
}

const InputField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { register } = useFormContext()

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={props.name} className="text-white">
        {props.label}
      </Label>
      <Input {...props} id={props.name} {...register(props.name)} ref={ref} />
    </div>
  )
})

export default InputField
