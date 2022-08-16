import React from "react"

const sizeChart = {
  small: "w-6 h-6",
  smmiddle: "w-9 h-9",
  middle: "w-12 h-12",
  mdlarge: "w-16 h-16",
  ltlarge: "w-20 h-20",
  large: "w-24 h-24",
  xLarge: "w-32 h-32",
  xLarge2: "w-36 h-36",
}
const shapeChart = {
  round: "rounded-full",
  square: "",
}

export default function ExerciseIcon({ image, size, shape, ...restProps }) {
  const iconSize = size ? sizeChart[size] : sizeChart.middle
  const shapeType = shape ? shapeChart[shape] : shapeChart.square

  return (
    <div
      style={{
        backgroundImage: `url(/images/exerciseIcon/${image}.png)`,
      }}
      className={`${iconSize} ${shapeType} bg-cover bg-center`}
    ></div>
  )
}
