

const StoreProductCard = ({ image }: { image: string }) => {
  return (
    <div className="h-[90px] w-full bg-white items-center shadow-md rounded-lg flex justify-around">
      <div className="relative w-[70px] h-[70px]">
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div>Gucci Polo</div>
      <div>T-shirt</div>
      <div>$19.99</div>
    </div>
  )
}

export default StoreProductCard
