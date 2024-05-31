import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TextareaHTMLAttributes, forwardRef } from "react"
import { useFormContext } from "react-hook-form"

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  name: string
}

const TextAreaField = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { register } = useFormContext()

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={props.name}>{props.label}</Label>
      <Textarea
        id={props.name}
        rows={6}
        {...props}
        className="resize-none scroll-bar text-foreground"
        {...register(props.name)}
        ref={ref}
      />
    </div>
  )
})

export default TextAreaField
