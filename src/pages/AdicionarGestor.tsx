import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { IUser } from "../interfaces"
import { createUser, getAllUsers } from "../api"
import { ClipLoader } from "react-spinners"
import { FaRegEyeSlash } from "react-icons/fa"
import { IoEye } from "react-icons/io5"
import { toast } from "react-toastify"
import { uploadImageToFirebaseStorage } from "../utils/helpers"

const AdicionarGestor = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [image, setImage] = useState<File | undefined>(undefined)
  // const [downloadURL, setDownloadURL] = useState("")
  const [imageToShow, setImageToShow] = useState<any>()
  const [isCreatingUser, setIsCreatingUser] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImageToShow(e.target!!.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const resetInputs = () => {
    setPassword("")
    setFirstname("")
    setLastname("")
    setEmail("")
    setIsCreatingUser(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    setIsCreatingUser(true)
    e.preventDefault()
    try {
      if (!email || !firstname || !lastname || !password) {
        toast.error("Por favor, preencha os campos obrigatórios!", {
          autoClose: 1000,
          hideProgressBar: true,
        })
        setIsCreatingUser(false)
        return
      }
      let downloadURL
      if (image) {
        downloadURL = await uploadImageToFirebaseStorage(image, "profile")
      }

      const user = {
        firstname,
        lastname,
        email,
        password,
        image: image ? downloadURL : "",
      }

      await createUser(user)
      toast.success("Usuário criado com sucesso", {
        autoClose: 1000,
        hideProgressBar: true,
      })
    } catch (error) {}
    setIsCreatingUser(false)
    resetInputs()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers()
        setUsers(data)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return (
    <main className="w-full h-full grid grid-cols-3">
      <section className="w-full font-bold flex col-span-2 items-center justify-center h-full">
        {isLoading ? (
          <main className="w-full h-full flex items-center justify-center">
            <ClipLoader size={40} color="#111111" />
          </main>
        ) : (
          <section className="w-full flex flex-col h-full items-center p-6">
            <table className="w-full flex flex-col gap-2">
              <tr className="w-full rounded-md bg-BLACK text-white mb-4 flex">
                <th className="w-full text-center capitalize text-[16px] font-semibold">
                  Id
                </th>
                <th className="w-full text-center capitalize text-[16px] font-semibold">
                  Nome
                </th>
                <th className="w-full text-center capitalize text-[16px] font-semibold">
                  Sobrenome
                </th>
                <th className="w-full text-center capitalize text-[16px] font-semibold">
                  Email
                </th>
                <th className="w-full text-center capitalize text-[16px] font-semibold">
                  Ações
                </th>
              </tr>
              {users.map((user, index) => (
                <tr key={index} className="flex w-full gap-1 text-BLACK ">
                  <td className="w-full text-center text-[14px]">
                    {user.id.substring(0, 10)}
                  </td>
                  <td className="w-full text-center text-[14px]">
                    {user.firstname}
                  </td>
                  <td className="w-full text-center text-[14px]">
                    {user.lastname}
                  </td>
                  <td className="w-full text-center text-[14px]">
                    {user.email}
                  </td>
                  <td className="w-full text-center text-[14px]">
                    <button className="bg-RED-DARK text-white px-3 py-1 rounded-md">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </section>
        )}
      </section>

      <section className="w-full h-full border flex  border-GRAY-LIGHTER p-2 rounded-md">
        <form
          onSubmit={handleSubmit}
          className="bg-transparent gap-3 flex items-center justify-center flex-col w-full h-full"
        >
          <h1 className="font-bold mb-4 text-xl text-BLACK uppercase">
            Adicionar um novo gestor
          </h1>
          {imageToShow ? (
            <div className="w-full border flex items-center justify-center border-GRAY-LIGHTER rounded-md p-2">
              <label
                htmlFor="file"
                className="flex self-center flex-col items-center justify-center"
              >
                <img
                  src={imageToShow}
                  className="w-42 object-cover h-36"
                  alt=""
                />
                <input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleInputChange(e)}
                  className="opacity-0"
                />
              </label>
            </div>
          ) : (
            <div className="w-full border border-GRAY-LIGHTER rounded-md p-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleInputChange(e)}
                className="w-full h-full outline-none border-none"
              />
            </div>
          )}
          <div className="w-full border border-GRAY-LIGHTER rounded-md p-2">
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full h-full outline-none border-none"
              placeholder="Nome"
            />
          </div>
          <div className="w-full border border-GRAY-LIGHTER rounded-md p-2">
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full h-full  outline-none border-none"
              placeholder="Sobrenome"
            />
          </div>
          <div className="w-full border border-GRAY-LIGHTER rounded-md p-2">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-full  outline-none border-none"
              placeholder="Email"
            />
          </div>
          <div className="relative w-full border border-GRAY-LIGHTER rounded-md p-2">
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-full outline-none border-none"
              placeholder="Palavra-passe"
            />
            <span
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute cursor-pointer right-3 top-3"
            >
              {passwordVisible ? (
                <FaRegEyeSlash color="#111111" size={20} />
              ) : (
                <IoEye color="#111111" size={20} />
              )}
            </span>
          </div>
          <button
            disabled={isCreatingUser}
            type="submit"
            className={`w-full ${
              isCreatingUser ? "bg-BLACK/80" : "bg-BLACK"
            }  uppercase font-semibold text-white p-2 rounded-md`}
          >
            {isCreatingUser ? (
              <ClipLoader size={18} color="#FFF" />
            ) : (
              "Adicionar"
            )}
          </button>
        </form>
      </section>
    </main>
  )
}

export default AdicionarGestor
