import RecentPostsDetails from "./post-details/recent-post-details"

export type PostProps = {
  post: {
    _id: string
    title: string
    subtitle: string
    mainImage: string
    content: string
    createdAt: string
    isHighlighted: boolean
    category: {
      name: string
    }
  }
}

const RecentPostCard = ({
  post: { category, mainImage, title, createdAt },
}: PostProps) => {
  // const contentSustring = content.substring(0, 158).concat("...")
  return (
    <div className="w-full mb-4 gap-3 bg-white p-2 rounded-lg flex shadow-lg  border border-gray-300">
      <div className="relative h-[100px] w-[180px]">
        <img
          src={mainImage}
          alt="imagem"
          className="absolute rounded-lg inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col w-full justify-between">
        <h1 className="font-bold text-[14px] text-[#1A101F]">{title}</h1>

        <div className="flex w-full justify-end">
          <RecentPostsDetails
            icon="topics"
            label="Tópico"
            title={category.name}
          />
          {/* <RecentPostsDetails icon="likes" label="Likes" title="120" /> */}
          <RecentPostsDetails
            icon="createdAt"
            label="Criado a"
            title={createdAt.split("T")[0]}
          />
        </div>
      </div>
    </div>
  )
}

export default RecentPostCard
