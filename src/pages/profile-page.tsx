import { getUserPosts } from "@/api"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/AuthContext"
import { PostData } from "@/types/data"
import { useEffect, useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { CiSettings } from "react-icons/ci"
import { CiUser } from "react-icons/ci"
import { useGetUserPosts } from "@/lib/react-query/queries"

const ProfilePage = () => {
  const [posts, setPosts] = useState<PostData[]>([])
  const { user, userId } = useAuthContext()
  const path = useLocation()
  const [pathName, setPathName] = useState<string>("")

  // const { data: userPosts } = useGetUserPosts(userId!!)

  useEffect(() => {
    setPathName(path.pathname.split("/")[4])
    if (!user) return
    const fetchData = async () => {
      const data = await getUserPosts(userId!!)
      setPosts(data)
    }
    fetchData()
  }, [user, userId, path.pathname])

  if (!user) return null

  return (
    <main className="w-full h-full overflow-y-auto scroll-bar p-4 ">
      <section className="w-[800px] h-full flex flex-col items-start justify-start mx-auto">
        <section className="flex p-4 w-full border-b">
          <div className="flex items-center w-full justify-between">
            <div className="flex">
              <div className="relative w-36 h-36">
                <img
                  src={user?.image}
                  className="absolute w-full h-full rounded-full object-cover"
                  alt=""
                />
              </div>
            </div>

            <div className="w-full flex items-center justify-around">
              <div className="flex flex-col items-center justify-center">
                <span className="font-semibold text-[22px] flex self-start gap-2">
                  {user?.firstname} {user?.lastname}
                </span>
                <div className="w-full text-[#999999] text-[14px]">
                  {user?.email}
                </div>
                <div className="self-start gap-x-1 capitalize mt-4 flex items-center">
                  <span className="text-[14px]">posts</span>
                  <span className="font-bold text-[18px]">{posts.length}</span>
                </div>
              </div>

              <div className="flex items-center flex-col">
                <div className="w-full mb-6 flex flex-col gap-y-2 items-center">
                  <Link to="settings/edit_profile">
                    <Button
                      variant={`${
                        pathName === "edit_profile" ? "default" : "outline"
                      }`}
                      className="text-[13px] flex items-center space-x-1"
                    >
                      <CiUser size={20} />
                      <span>Editar dados pessoais</span>
                    </Button>
                  </Link>
                  <Link to="settings/security">
                    <Button
                      variant={`${
                        pathName === "security" ? "default" : "outline"
                      }`}
                      className="text-[13px] flex items-center space-x-1"
                    >
                      <CiSettings size={20} />
                      <span>Editar dados de segurança</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full mt-4 flex flex-col">
          <Outlet />
        </section>
      </section>
    </main>
  )
}

export default ProfilePage
