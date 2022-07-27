import React from "react"

const sizeChart = {
  small: "w-20 h-12",
  middle: "w-40 h-16",
  large: "w-52 h-28",
}
const colorChart = {
  //props으로 받은 color에 해당하는 색
  blue: "bg-lightBlue",
  white: "bg-white",
  green: "bg-green-200",
  red: "bg-danger",
}
const borderColorChart = {
  none: "",
  lightBlue: "border-lightBlue",
}
const borderSizeChart = {
  none: "",
  border1: "border-1",
  border2: "border-2",
  border3: "border-3",
  border4: "border-4",
  border5: "border-5",
}
const cursorChart = {
  pointer: "cursor-pointer",
  none: "",
}
export default function NameSquare({
  color,
  size,
  text,
  children,
  borderColor,
  borderSize,
  cursor,
}) {
  const bgsize = size ? sizeChart[size] : sizeChart.middle
  const selectedBorderColor = borderColor
    ? borderColorChart[borderColor]
    : borderColorChart.lightBlue
  const selectedBorderSize = borderSize
    ? borderSizeChart[borderSize]
    : borderSizeChart.border2
  const selectedCursorType = cursor ? cursorChart[cursor] : cursorChart.none

  return (
    <div
      className={`${colorChart[color]} ${selectedBorderColor} ${selectedBorderSize} ${bgsize} ${selectedCursorType} rounded-lg m-2`}
    >
      <div className="flex justify-center items-center h-full">
        {children}
        <span className="m-3">{text}</span>
      </div>
    </div>
  )
}
