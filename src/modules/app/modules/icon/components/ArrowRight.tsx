import { DEFAULT_ICON_SIZE } from "../constants/icons.enum"
import { IconProps } from "../interfaces/icon.interface"

const ArrowRight = ({ size = DEFAULT_ICON_SIZE }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size}>
      <path
        fill="inherit"
        d="M15.54,11.29,9.88,5.64a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.95,5L8.46,17a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l5.66-5.65A1,1,0,0,0,15.54,11.29Z"
      />
    </svg>
  )
}

export default ArrowRight
