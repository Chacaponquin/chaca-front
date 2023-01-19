import clsx from "clsx"
import { useFilters } from "../../hooks"
import { ChacaFormProps } from "../../interfaces/chacaForm.interface"

interface ChacaTextInputProps extends ChacaFormProps<string> {
  placeholder: string
  size?: number | "full"
}

export default function ChacaTextInput({
  placeholder,
  dimension = "normal",
  onChange,
  className = "",
  size = "full",
  value,
}: ChacaTextInputProps) {
  const { textClass, paddingClass } = useFilters({ dimension })

  const inputClass = clsx(
    "py-[2px] rounded-sm px-3 outline-none text-base transition-all duration-300 hover:border-principalColor border-2 focus:border-principalColor",
    className,
    textClass,
    paddingClass,
  )

  return (
    <input
      type='text'
      placeholder={placeholder}
      onChange={(e) => {
        onChange(e.target.value)
      }}
      className={inputClass}
      style={{
        width: size === "full" ? `100%` : `${size}px`,
      }}
      value={value}
    />
  )
}