import HomeStatsContainer from "../components/Home_Components/HomeStatsContainer"
import PostsContainer from "../components/Home_Components/PostsContainer"
import HighlightedPost from "../components/Home_Components/HighlightedPost"
import PieChart from "@/components/PieChart"
import StoreTableData from "@/components/Home_Components/StoreTableData"

{
  /* <section className="grid grid-cols-3 h-full w-full gap-8 p-2">
</section> */
}
{
}
const HomeDashboard = () => {
  return (
    <main className="w-full px-4 py-2 rounded-lg flex-col flex items-center justify-center">
      <div className="w-full grid-rows-2 grid gap-5 ">

        <div className="grid grid-cols-3 gap-5">
          <div className="self-end col-span-2 flex flex-col gap-y-3">
            <h1 className="text-3xl font-bold uppercase">dashboard</h1>
            <HomeStatsContainer />
          </div>

          <div className="h-full">
            <HighlightedPost />
          </div>
        </div>

        <div className="grid grid-cols-3 relative gap-5">
          <div className="col-span-2 w-full h-full relative">
            <PostsContainer />
          </div>

          <div className="w-full h-full relative">
            <StoreTableData />
          </div>
        </div>
      </div>
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
