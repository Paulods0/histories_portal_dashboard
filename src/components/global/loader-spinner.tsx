import { ClipLoader } from "react-spinners"

type Props = {
  size?: number
}

const LoaderSpinner = ({ size = 24 }: Props) => {
  return (
    <div className="w-full h-[50vh] text-background flex items-center justify-center ">
      <ClipLoader size={size} />
    </div>
  )
}

export default LoaderSpinner
