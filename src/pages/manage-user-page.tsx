import { ClipLoader } from "react-spinners"
import { useGetAllUsers } from "@/lib/react-query/queries"
import UsersTable from "@/components/manage-user-component/users-table"
import AddUserDialog from "@/components/manage-user-component/add-user-dialog"
import { useAuthContext } from "@/context/auth-context"

const ManageUserPage = () => {
  const { user: currentUser } = useAuthContext()
  const { data: users, isLoading } = useGetAllUsers()

  if (isLoading) {
    return (
      <main className="w-full h-full flex items-center justify-center">
        <ClipLoader size={40} color="#111111" />
      </main>
    )
  }

  return (
    <main className="w-full">
      <section className="flex flex-col gap-4 w-auto mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-foreground text-base">
              Total de usuários: {users?.length}
            </p>
          </div>
          {currentUser!!.role === "admin" && <AddUserDialog />}
        </div>
        {users?.length === 0 ? (
          <main className="w-full flex items-center justify-center">
            <h1 className="text-foreground text-2xl font-semibold">
              Não há usuários ainda.
            </h1>
          </main>
        ) : (
          <UsersTable users={users} />
        )}
      </section>
    </main>
  )
}

export default ManageUserPage
