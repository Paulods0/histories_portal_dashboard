interface IProdutcCard {
  product: {
    _id: string
    image: string
    name: string
    price: string
    category: {
      _id: string
      name: string
    }
    createdAt: string
  }
}

const StoreProductCard: React.FC<IProdutcCard> = ({
  product: { _id, category, image, name, price },
}) => {
  return (
    <tr className="h-[90px] w-full bg-white items-center shadow-md rounded-lg flex justify-between px-6">
      <td className="w-[150px]">
        <div className="relative w-full h-[70px]">
          <img
            src={image}
            alt="Imagem do produto"
            className="absolute w-full h-full object-contain"
          />
        </div>
      </td>

      <td className="w-[150px]">{name}</td>
      <td className="w-[150px]">{category.name}</td>
      <td className="w-[150px]">${price}</td>
    </tr>
  )
}

export default StoreProductCard
