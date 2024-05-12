import { ClipLoader } from "react-spinners"

type Props = {
  size?: number
  color?: string
}

const LoaderSpinner = ({ size = 24, color = "#FFF" }: Props) => {
  return (
    <div className="w-full h-[50vh] flex items-center justify-center ">
      <ClipLoader size={size} color={color} />
    </div>
  )
}

export default LoaderSpinner
