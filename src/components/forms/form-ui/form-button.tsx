import LoaderSpinner from "@/components/global/loader-spinner"
import { Button } from "@/components/ui/button"

type Props = {
  isSubmitting: boolean
  text: string
  buttonColor?: string
  variant?:
    | "default"
    | "ghost"
    | "secondary"
    | "outline"
    | "link"
    | "destructive"
}

const FormButton = ({
  variant = "default",
  isSubmitting,
  text,
  buttonColor = "#FFF",
}: Props) => {
  return (
    <Button variant={variant} type="submit" disabled={isSubmitting}>
      {isSubmitting ? <LoaderSpinner color={buttonColor} size={18} /> : text}
    </Button>
  )
}

export default FormButton
