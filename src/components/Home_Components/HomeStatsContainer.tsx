import React from "react"
import HomeStatsCard from "./HomeStatsCard"

const HomeStatsContainer = () => {
  return (
    <div className="grid grid-cols-5 gap-2 h-[80px]">
      <HomeStatsCard
        amount={1}
        color="bg-YELLOW"
        label="usuários"
        text_color="BLACK"
        icon="users"
      />
      <HomeStatsCard
        amount={12}
        color="bg-PINK-LIGHT"
        label="loja"
        text_color="BLACK"
        icon="store"
      />
      <HomeStatsCard
        amount={10}
        color="bg-GRAY-LIGHTER"
        label="meus posts"
        text_color="BLACK"
        icon="my_posts"
      />
      <HomeStatsCard
        amount={33}
        color="bg-BLACK"
        col_span
        label="total de posts"
        text_color="white"
        icon="total_posts"
      />
    </div>
  )
}

export default HomeStatsContainer
