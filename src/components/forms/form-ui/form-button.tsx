import LoaderSpinner from "@/components/global/loader-spinner"
import { Button } from "@/components/ui/button"

type Props = {
  isSubmitting: boolean
  text: string

  variant?:
    | "default"
    | "ghost"
    | "secondary"
    | "outline"
    | "link"
    | "destructive"
  className?: string
}

const FormButton = ({
  variant = "default",
  isSubmitting,
  text,
  className,
}: Props) => {
  return (
    <Button
      variant={variant}
      type="submit"
      disabled={isSubmitting}
      className={`${className} text-background`}
    >
      {isSubmitting ? <LoaderSpinner size={18} /> : text}
    </Button>
  )
}

export default FormButton
