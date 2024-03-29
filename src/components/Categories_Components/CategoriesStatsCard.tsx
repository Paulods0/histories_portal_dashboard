const CategoriesStatsCard = ({
  amount,
  label,
  selected,
}: {
  amount: number
  label: string
  selected: boolean
}) => {
  return (
    <div
      className={`flex flex-col p-2 rounded-lg border items-center justify-center ${
        selected ? "bg-BLACK text-white" : "text-BLACK bg-transparent"
      }`}
    >
      <span className="text-[24px]  font-semibold">{amount}</span>
      <span className="text-[14px] uppercase">{label}</span>
    </div>
  )
}

export default CategoriesStatsCard
