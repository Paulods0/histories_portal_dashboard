import { useEffect, useState } from "react"
import { IPostData, IProductData } from "../interfaces"
import { getAllProducts } from "../api"
import { ClipLoader } from "react-spinners"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
import { Doughnut } from "react-chartjs-2"
ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart = () => {
  const [products, setProducts] = useState<IProductData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const generateRandomColor = (posts: IProductData[]) => {
    const colors = []
    const lenght = posts.length

    for (let i = 0; i < lenght; i++) {
      const red = Math.floor(Math.random() * 256)
      const green = Math.floor(Math.random() * 256)
      const blue = Math.floor(Math.random() * 256)
      const color = `rgb(${red}, ${green}, ${blue})`
      colors.push(color)
    }

    return colors
  }

  const data = {
    labels: products.map((item) => item.name),
    datasets: [
      {
        label: "Quantidade",
        data: products.map((item) => item.quantity),
        backgroundColor: ["#FF0000", "#0000FF", "#FFFF00", "#A020F0"],
        borderColor: "#dddddd",
        borderWidth: 1,
      },
    ],
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProducts()
      setProducts(data.filter((product) => product.quantity >= 12))
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className="flex w-full h-72 items-center justify-center text-center flex-col mt-4">
      <Doughnut
        options={{
          responsive: true,
          plugins: {
            tooltip: {
              backgroundColor: "#000000",
            },
            legend: {
              display: true,
              labels: {
                font: {
                  size: 12,
                },
              },
            },
          },
        }}
        data={data}
      />
    </div>
  )
}

export default PieChart