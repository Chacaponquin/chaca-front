import React from "react"
import { IconProps } from "../interfaces/icon.interface"
import { DEFAULT_ICON_SIZE } from "../constants/icons.enum"

export default function Smile({ size = DEFAULT_ICON_SIZE }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z'
        fill='none'
        stroke='inherit'
        strokeWidth='4'
        strokeLinejoin='round'
      />
      <path
        d='M31 31C31 31 29 35 24 35C19 35 17 31 17 31'
        stroke='inherit'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M21 21C21 21 20 17 17 17C14 17 13 21 13 21'
        stroke='inherit'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M35 21C35 21 34 17 31 17C28 17 27 21 27 21'
        stroke='inherit'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}