import { ClassifiedPost } from "@/types/data"

type Props = {
  post: ClassifiedPost | undefined
}

const ClassifiedCard = ({ post }: Props) => {
  return (
    <div key={post?._id} className="flex flex-col border rounded-lg">
      <img
        src={post?.mainImage}
        className="w-full object-contain h-32"
        alt=""
      />

      <div className="flex w-full flex-col p-3 border-t">
        <h1 className="text-xl capitalize font-semibold">{post?.title}</h1>
        <div className="flex flex-col w-full">
          <div className="w-full flex items-start gap-4 text-sm">
            <div className="flex flex-col gap-1">
              <p>
                Autor:
                {` ${post?.author.firstname} ${post?.author.lastname}`}
              </p>
              <p>Tel:{` ${post?.author.phone}`}</p>
              <p>Preço: {post?.price}</p>
            </div>

            <div className="flex flex-col gap-1">
              <p>
                Estado:
                <span
                  className={`${
                    post?.status === "active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {post?.status}
                </span>
              </p>
              <p>Tipo: {post?.type === "sell" ? "À venda" : "Comprar"}</p>
            </div>
          </div>

          <p className="w-full">Email:{`${post?.author.email}`}</p>
        </div>
      </div>
    </div>
  )
}

export default ClassifiedCard
