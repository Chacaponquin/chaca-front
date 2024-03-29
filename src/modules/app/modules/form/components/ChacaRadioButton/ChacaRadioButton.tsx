import clsx from "clsx"

const ChacaRadioButton = ({
  value,
  onChange,
}: {
  value: boolean
  onChange: (value: boolean) => void
}) => {
  const containerClass = clsx(
    "w-[13px] h-[13px] rounded-full bg-white cursor-pointer flex items-center justify-center outline-2 transition-all duration-200",
    {
      "outline-scale-5 border-2 hover:border-purple-6": !value,
      "outline-purple-6": value,
    },
  )

  const subDivClass = clsx(
    "bg-purple-6 w-[8px] h-[8px] rounded-full transition-all duration-200 ",
    {
      "scale-0": !value,
      "scale-100": value,
    },
  )

  return (
    <div onClick={() => onChange(!value)} className={containerClass}>
      <div className={subDivClass}></div>
    </div>
  )
}

export default ChacaRadioButton
