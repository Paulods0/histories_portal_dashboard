import { ClipLoader } from "react-spinners"

type Props = {
  size?: number
}

const LoaderSpinner = ({ size = 24 }: Props) => {
  return (
    <div className="w-full h-[50vh]  flex items-center justify-center ">
      <ClipLoader size={size} color="rgba(200 190 200)" />
    </div>
  )
}

export default LoaderSpinner
