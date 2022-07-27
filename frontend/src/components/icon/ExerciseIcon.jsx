import React from "react"
import 푸쉬업 from "../../assets/exercise/푸쉬업.png"
import 버피 from "../../assets/exercise/버피.png"
import 스쿼트 from "../../assets/exercise/스쿼트.png"
import 레그레이즈 from "../../assets/exercise/레그레이즈.png"
import 마운틴클라이밍 from "../../assets/exercise/마운틴클라이밍.png"

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
  푸쉬업,
  버피,
  스쿼트,
  레그레이즈,
  마운틴클라이밍,
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
