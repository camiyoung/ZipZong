import React from "react"
import PUSHUP from "../../assets/exercise/PUSHUP.png"
import BURPEE from "../../assets/exercise/BURPEE.png"
import SQUAT from "../../assets/exercise/SQUAT.png"
import LEGRAISE from "../../assets/exercise/LEGRAISE.png"
import MOUNTAINCLIMING from "../../assets/exercise/MOUNTAINCLIMING.png"

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
const imageChart = {
  PUSHUP,
  BURPEE,
  SQUAT,
  LEGRAISE,
  MOUNTAINCLIMING,
}

export default function ExerciseIcon({ image, size, shape, ...restProps }) {
  const iconSize = size ? sizeChart[size] : sizeChart.middle
  const shapeType = shape ? shapeChart[shape] : shapeChart.square

  return (
    <div
      style={{
        backgroundImage: `url(${imageChart[image]})`,
      }}
      className={`${iconSize} ${shapeType} bg-cover `}
    ></div>
  )
}
