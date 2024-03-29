const HighlightedPost = () => {
  return (
    <div className="p-2 cursor-pointer bg-white hover:bg-GRAY-LIGHTER duration-200 ease-linear transition-all border border-GRAY-LIGHTER rounded-[6px] flex items-center">
      <div className="relative h-[80px] w-[160px]">
        <img
          src="/6.jpg"
          alt=""
          className="absolute rounded-[5px] inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="w-full flex flex-col justify-between items-start ml-2">
        <h1 className="text-[14px] text-BLACK font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h1>
        <p className="text-[12px] text-GRAY-DARKER">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam debitis
          rerum corrupti laboriosam.
        </p>
      </div>
    </div>
  )
}

export default HighlightedPost
