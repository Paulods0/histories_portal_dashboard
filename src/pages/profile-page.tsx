import { CiUser } from "react-icons/ci"
import { CiSettings } from "react-icons/ci"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/auth-context"
import { Link, Outlet, useLocation } from "react-router-dom"

const ProfilePage = () => {
  const path = useLocation()
  const { user, userId } = useAuthContext()
  const [pathName, setPathName] = useState<string>("")

  useEffect(() => {
    setPathName(path.pathname.split("/")[4])
    if (!user) return
  }, [user, userId, path.pathname])

  if (!user) return null

  return (
    <main className="w-full h-full overflow-y-auto scroll-bar p-4 ">
      <section className="w-full lg:w-[800px] h-full flex flex-col items-start justify-start mx-auto">
        <section className="flex p-4 w-full border-b">
          <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center w-full justify-between">
            <div className="flex">
              <div className="relative size-24 lg:size-36">
                <img
                  src={user?.image}
                  className="absolute w-full h-full rounded-full object-cover"
                  alt="imagem de perfil"
                />
              </div>
            </div>

            <div className="w-full flex flex-col lg:flex-row lg:gap-0 gap-4 items-center justify-around">
              <div className="flex flex-col text-sm lg:text-xl items-center justify-center">
                <span className="font-semibold  flex self-start gap-2">
                  {user?.firstname} {user?.lastname}
                </span>
                <div className="w-full text-[#999999]">{user?.email}</div>
              </div>

              <div className="flex items-center flex-col">
                <div className="w-full text-xs lg:text-sm mb-6 flex flex-col gap-y-2 items-center">
                  <Link to="settings/edit_profile">
                    <Button
                      variant={`${
                        pathName === "edit_profile" ? "default" : "outline"
                      }`}
                      className="flex items-center space-x-1"
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
                      className=" flex items-center space-x-1"
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
