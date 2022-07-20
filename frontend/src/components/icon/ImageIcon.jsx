import React from "react"
const sizeChart = {
  small: "w-6 h-6",
  middle: "w-12 h-12",
  large: "w-24 h-24",
  xLarge: "w-32 h-32",
}

export default function Icon({ image, size }) {
  const iconSize = size ? sizeChart[size] : sizeChart.middle
  return (
    <div
      style={{
        borderRadius: "70%",
        backgroundImage: `url(${image})`,
      }}
      className={`${iconSize} bg-cover `}
    ></div>
  )
}
