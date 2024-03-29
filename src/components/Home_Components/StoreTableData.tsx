import { useEffect, useState } from "react"
import { IProductData } from "../../types"
import { getAllProducts } from "../../api/apiCalls"
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
        <div className="h-[322px] bg-white border p-2 border-GRAY-LIGHTER rounded-[10px]  flex flex-col w-full">
          <div className="text-[14px] px-2 flex font-normal w-full border-b border-b-GRAY-LIGHTER">
            <div className="w-full text-center">Nome</div>
            <div className="w-full text-center">Categoria</div>
            {/* <div className="w-full text-center">Quantidade</div> */}
            <div className="w-full text-center">Preço</div>
          </div>

          {products.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <h1 className="font-semibold text-base">
                Não há nenhum produto na loja.
              </h1>
            </div>
          ) : (
            <div className="overflow-y-auto h-[322px] scroll-bar px-1">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-BLACK rounded-[6px] mt-2 text-white font-light px-2 text-[14px] w-full flex"
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
