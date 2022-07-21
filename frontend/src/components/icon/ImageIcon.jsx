import React from "react"
const sizeChart = {
  small: "w-6 h-6",
  middle: "w-12 h-12",
  large: "w-24 h-24",
  xLarge: "w-32 h-32",
}
const shapeChart = {
  round: "rounded-full",
  square: "",
}

export default function Icon({ image, size, shape, ...restProps }) {
  const iconSize = size ? sizeChart[size] : sizeChart.middle
  const shapeType = shape ? shapeChart[shape] : shapeChart.square
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
      }}
      className={`${iconSize} ${shapeType} bg-cover `}
    ></div>
  )
}
