import { Link } from "react-router-dom"

const Topic = ({ topic }: { topic: string }) => {
  return (
    <Link
      to=""
      className="hover:scale-95 cursor-pointer duration-200 transition-all ease-out bg-white/15 text-white text-center font-regular w-28 rounded-full p-3 text-[12px]"
    >
      {topic}
    </Link>
  )
}

export default Topic
