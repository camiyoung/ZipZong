import React from "react"

const sizeChart = {
  small: "w-20 h-12",
  middle: "w-40 h-16",
  large: "w-52 h-20",
}
const colorChart = {
  blue: "bg-lightBlue",
  white: "bg-white",
}

export default function NameSquare({ color, size, text, children }) {
  const bgcolor = color === "blue" ? "lightBlue" : "white"
  const bgsize = size ? sizeChart[size] : sizeChart.middle

  return (
    <div
      className={`${colorChart[color]} ${bgsize} border-lightBlue border-2 rounded-lg m-2`}
    >
      <div className="flex justify-center items-center h-full w-full">
        {children}
        <span className="m-3">{text}</span>
      </div>
    </div>
  )
}
