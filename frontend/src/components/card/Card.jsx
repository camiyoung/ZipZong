import React from "react"

const sizeChart = {
  small: " w-32 ",
  middle: " w-60 ",
  large: " w-96 ",
  "20%": "w-1/5",
  "25%": "w-3/12",
  "50%": "w-6/12",
  "75%": "w-9/12",
  "100%": "w-full",
}

export default function Card({ size, children, ...restProps }) {
  const cardSize = sizeChart[size]
  return (
    <div
      className={`${cardSize} p-2 bg-white rounded-lg border border-gray-200 shadow-md`}
      {...restProps}
    >
      {children}
    </div>
  )
}
