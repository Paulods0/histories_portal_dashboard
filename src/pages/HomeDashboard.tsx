import { Link } from "react-router-dom"
import HomeStatsContainer from "../components/Home_Components/HomeStatsContainer"
import PostsContainer from "../components/Home_Components/PostsContainer"
import HighlightedPost from "../components/Home_Components/HighlightedPost"

import PieChart from "@/components/PieChart"
import StoreTableData from "@/components/Home_Components/StoreTableData"

const HomeDashboard = () => {
  return (
    <main className="w-full p-4 rounded-lg gap-x-4 h-full flex">
      <section className="w-full flex-[2] h-full flex flex-col">
        <HomeStatsContainer />
        <PostsContainer />
      </section>

      <section className="w-full flex-1 gap-y-4  flex flex-col h-full">
        <div className="flex flex-col">
          <HighlightedPost />
        </div>

        <div className="h-full relative overflow-y-auto scroll-bar">
          <StoreTableData />
        </div>
      </section>
    </main>
  )
}

export default HomeDashboard
// <ResponsiveContainer width="100%" height="100%">
//   <PieChart width={400} height={400}>
//     <Pie
//       labelLine={false}
//       outerRadius={80}
//       fill="#8884d8"
//       dataKey="val"
//       label={data.map((val, index) => (
//         <span key={index}>{val.name}</span>
//       ))}
//       data={data}
//       cx="50%"
//       cy="50$"
//     >
//       {data.map((item, index) => (
//         <Cell
//           key={`cell-${index}`}
//           fill={COLORS[index % COLORS.length]}
//         />
//       ))}
//     </Pie>
//   </PieChart>
// </ResponsiveContainer>
// <div className="gap-4 grid-cols-3 grid place-items-center w-full">
//       {/** LEFT SIDE */}
//       <section className="p-3 border gap-4 rounded-[10px] h-full w-full flex flex-col col-span-2">
//         {/** UPPER SIDE */}
//         <div>
//           <HomeStatsContainer />
//         </div>
//         {/** END UPPER SIDE */}
//         {/** BOTTOM SIDE */}
//         <div className="relative h-[90%] mt-2 w-full flex flex-col gap-2">
//           <h1 className="text-zinc-900 font-bold text-[22px]">Posts</h1>
//           <PostsContainer />
//         </div>
//         {/** END BOTTOM SIDE */}
//       </section>
//       {/** END LEFT SIDE */}

//       {/** RIGHT SIDE */}
//       <section className="w-full h-full flex flex-col">
//         <div className="flex w-full items-center justify-between p-2">
//           <h1 className="font-medium">Post em destaque</h1>
//         </div>

//         <HighlightedPost />

//         <section className="w-full h-full flex flex-col gap-4">
//           <div className="flex w-full items-center justify-between">
//             <h1 className="font-semibold text-zinc-900 text-[18px]">
//               Produtos na loja
//             </h1>
//             <Link to="loja" className="text-[14px] underline text-zinc-900">
//               Ir à loja
//             </Link>
//           </div>
//           {/* <StoreTableData /> */}
//         </section>
//       </section>
//       {/** END RIGHT SIDE */}
//     </div>
