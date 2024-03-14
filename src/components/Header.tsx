import { FiSearch, FiCalendar } from "react-icons/fi"

const Header = () => {
  return (
    <header className="w-full px-12 flex items-center justify-between ">
      <div className="w-[250px] flex items-center justify-center gap-2">
        <button>
          <FiSearch size={14} color="#9D9D9D" />
        </button>
        <input
          type="text"
          placeholder="Pesquise alguma coisa"
          className="bg-transparent text-[14px] h-full w-full text-[#9D9D9D] placeholder-[#9D9D9D] outline-none border-none"
        />
      </div>
      <div className="flex w-[200px] gap-2 items-center ">
        <div className="flex gap-1 items-center">
          <FiCalendar size={14} color="#9D9D9D" />
          <span className="text-[14px] text-[#9D9D9D]">Hoje</span>
        </div>
        <span className="text-black font-semibold text-[14px]">03 Março</span>
      </div>
      <div className="flex gap-2 items-center">
        <h1 className="text-[14px]">Paulo Luguenda</h1>
        <div className="h-[40px] w-[40px] rounded-full bg-blue-600"></div>
      </div>
    </header>
  )
}

export default Header
