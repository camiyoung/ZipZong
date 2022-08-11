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

export default function ExerciseIcon({ image, size, shape, ...restProps }) {
  const iconSize = size ? sizeChart[size] : sizeChart.middle
  const shapeType = shape ? shapeChart[shape] : shapeChart.square

  console.log(image)

  return (
    <div
      style={{
        backgroundImage: `url(/images/exerciseIcon/${image}.png)`,
      }}
      className={`${iconSize} ${shapeType} bg-cover `}
    ></div>
  )
}
