import { useEffect, useState } from "react"
import { IProductData } from "../../interfaces"
import { getAllProducts } from "../../api"
import { ClipLoader } from "react-spinners"

const StoreTableData = () => {
  const [products, setProducts] = useState<IProductData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProducts()
      setProducts(data)
      setIsLoading(false)
    }
    fetchData()
  }, [])
  return (
    <>
      {isLoading ? (
        <div className="w-full lg:h-[300px] flex items-center justify-center">
          <ClipLoader color="#111111" size={28} />
        </div>
      ) : (
        <div className="h-[100%] bg-white border p-2 rounded-[10px] flex flex-col w-full">
          <div className="text-[14px] px-2 flex font-normal w-full border-b border-b-zinc-200">
            <div className="w-full text-zinc-900 font-bold text-center text-[16px]">
              Nome
            </div>
            <div className="w-full  text-zinc-900 font-bold  text-center text-[16px]">
              Categoria
            </div>
            {/* <div className="w-full text-center text-[16px]">Quantidade</div> */}
            <div className="w-full  text-zinc-900 font-bold  text-center text-[16px]">
              Preço
            </div>
          </div>

          {products.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <h1 className="font-semibold text-base">
                Não há nenhum produto na loja.
              </h1>
            </div>
          ) : (
            <div className="overflow-y-auto h-[90%] scroll-bar px-1">
              {products.map((product) => (
                <div
                  key={product._id}
                  className=" rounded-[6px] border-b mt-2 text-zinc-900 font-normal px-2 text-[14px] w-full flex"
                >
                  <div className="w-full text-start line-clamp-1">
                    {product?.name}
                  </div>
                  <div className="w-full text-center">
                    {product?.category?.name}
                  </div>
                  {/* <div className="w-full text-center">{3}</div> */}
                  <div className="w-full text-center">{product?.price} kz</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default StoreTableData
