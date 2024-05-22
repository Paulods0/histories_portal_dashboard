import { InputHTMLAttributes, forwardRef } from "react"
import { FieldError, useFormContext } from "react-hook-form"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { twMerge } from "tailwind-merge"

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label: string
  error?: FieldError | undefined
  className?: string
}

const InputField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { register } = useFormContext()
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={props.name} className="text-foreground">
        {props.label}
      </Label>
      <Input
        id={props.name}
        {...register(props.name)}
        ref={ref}
        {...props}
        className={twMerge("bg-background text-foreground", props.className)}
      />
      {props.error && (
        <span className="text-xs text-red-600">{props.error.message}</span>
      )}
    </div>
  )
})

export default InputField
