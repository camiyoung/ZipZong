import React from "react"

const sizeChart = {
  small: " w-32 ",
  middle: " w-60 ",
  large: " w-96 ",
  "25%": "w-9/12",
  "50%": "w-9/12",
  "75%": "w-9/12",
  "100%": "w-full",
}

export default function Card({ size, children }) {
  const cardSize = sizeChart[size]
  console.log("cardsize", cardSize)
  return (
    <div
      className={`${cardSize} p-2 bg-white rounded-lg border border-gray-200 shadow-md`}
    >
      {children}
    </div>
  )
}
