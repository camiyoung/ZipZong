import React from "react"
const sizeChart = {
  small: "w-6 h-6",
  smmiddle: "w-9 h-9",
  middle: "w-12 h-12",
  mdlarge: "w-16 h-16",
  large: "w-24 h-24",
  xLarge: "w-32 h-32",
  xLarge2: "w-36 h-36",
}
const shapeChart = {
  round: "rounded-full",
  square: "",
}
const borderStyleChart = {
  none: "",
  border1: "border-1",
  border2: "border-2",
}

export default function Icon({ image, size, shape, borderStyle }) {
  const iconSize = size ? sizeChart[size] : sizeChart.middle
  const shapeType = shape ? shapeChart[shape] : shapeChart.square
  const selectedBorderStyle = borderStyle
    ? borderStyleChart[borderStyle]
    : borderStyleChart.border2
  return (
    <div
      style={{ backgroundImage: `url("${image}")` }}
      className={`${iconSize} ${shapeType} ${selectedBorderStyle} bg-cover borderColor:border-secondary-900`}
    ></div>
  )
}
