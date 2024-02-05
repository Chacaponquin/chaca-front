import { ArrowDown } from "@modules/app/modules/icon/components"
import clsx from "clsx"

interface Props {
  title: string
  handleChangeOpen(): void
  selected: boolean
}

export default function Title({ title, handleChangeOpen, selected }: Props) {
  const CLASS = clsx(
    "flex justify-between",
    "rounded w-full cursor-pointer",
    "py-1.5 px-4",
    "stroke-black dark:stroke-white",
    "mb-1",
    {
      "duration-300 hover:bg-scale-11/30 dark:hover:bg-scale-11/10 transition-all": !selected,
      "bg-scale-11/30 dark:bg-scale-11/10": selected,
    },
    { "text-purple-6 dark:text-purple-6": selected, "text-scale-8 dark:text-white": !selected },
  )

  return (
    <div onClick={handleChangeOpen} className={CLASS}>
      <p className="text-base">{title}</p>

      <button>
        <ArrowDown size={20} />
      </button>
    </div>
  )
}
