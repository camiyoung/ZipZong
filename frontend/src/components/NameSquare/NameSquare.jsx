import React from "react"

const sizeChart = {
  small: "w-20 h-12",
  middle: "w-40 h-16",
  large: "w-52 h-20",
}
const colorChart = {
  //props으로 받은 color에 해당하는 색
  blue: "bg-lightBlue",
  white: "bg-white",
  green: "bg-green-200",
  red: "bg-danger",
}

export default function NameSquare({ color, size, text, children }) {
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
