import React from "react"
import StretchedPostCard from "./StretchedPostCard"

const MyPostsWrapper = () => {
  return (
    <div className="w-full overflow-y-auto scroll-bar h-[320px]">
      <div>
        <StretchedPostCard />
      </div>
      <div>
        <StretchedPostCard />
      </div>
    </div>
  )
}

export default MyPostsWrapper
