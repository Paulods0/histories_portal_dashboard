//  <h1 className="text-[22px] font-semibold text-[#9D9D9D]">
//         Seja bem-vindo <span className="text-[26px]">👋</span>
//       </h1>
//       <div className="h-[490px] mt-4 grid grid-cols-4 gap-6">
//         {/**AUTOR CARD */}
//         <HomeCards icon="posts" tittle="Posts" posts={posts} />
//         {/**TOTAL POSTS CARD */}
//         <HomeCards icon="users" tittle="Usuários" posts={posts} />
//         {/**TOTAL LIKES CARD */}
//         <HomeCards icon="likes" tittle="Likes" posts={posts} />
//         {/**DESTAQUE CARD */}
//         <div className="bg-white/50 h-[140px] w-full rounded-[10px] p-4 border border-[1px_solid_#9d9d9d] flex flex-col justify-between">
//           <div className="w-full flex justify-between">
//             <h1 className="text-[16px] font-semibold">Em destaque</h1>
//             <div className="flex items-center justify-center gap-2 text-[#382A3F] text-[12px]">
//               <span>
//                 <FiEdit />
//               </span>
//               <Link to="">Editar</Link>
//             </div>
//           </div>
//           <div className="flex items-center justify-center h-full w-full">
//             <img
//               src="/woman.jpg"
//               className="mr-2 w-20 h-20 rounded-lg object-cover"
//               alt=""
//             />
//             <div className="flex flex-col h-full justify-around gap-1">
//               <h1 className="text-[14px] font-medium">
//                 Lorem ipsum dolor sit amet.
//               </h1>
//               <p className="text-[12px] text-[#9D9D9D]">
//                 Lorem, ipsum dolor sit amet consectetur adipisicing elit.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/**POSTS RECENTES CARD */}
//         <div className="h-full overflow-y-auto col-span-3 flex flex-col gap-4 rounded-xl border border-[1px_solid_#000000]">
//           <div className="w-full flex justify-between items-center">
//             <h1 className="text-[20px] mb-4 font-semibold">Posts recentes</h1>
//             <Link
//               to=""
//               className="text flex items-center text-[#382A3F] rounded-full text-[14px]"
//             >
//               <span className="mr-2">
//                 <FiPlus />
//               </span>
//               <Link to="/history/page/admin/dashboard/novopost">Adicionar</Link>
//             </Link>
//           </div>
//           <div className="w-full h-full flex flex-col gap-4 overflow-auto">
//             {posts.map((post) => (
//               <RecentPostCard key={post._id} post={post} />
//             ))}
//           </div>
//         </div>
//         {/**TOPICS CARD */}
//         <div className="rounded-xl justify-around col-span-1 border border-white/30 shadow-md bg-[#382A3F] flex flex-col p-4">
//           <div className="w-full flex items-center justify-between flex-col">
//             <div className="w-full flex justify-between">
//               <h1 className="text-semibold text-[14px] font-bold text-white">
//                 Tópicos
//               </h1>
//               <Link to="" className="text-[12px] font-medium text-white">
//                 Ver todos
//               </Link>
//             </div>
//             <hr className="w-full h-2 my-3" />
//           </div>

//           <div className="grid grid-cols-2 place-items-center gap-6">
//             {categories.map((category) => (
//               <Topic key={category._id} topic={category.name} />
//             ))}
//           </div>
//         </div>
//       </div>