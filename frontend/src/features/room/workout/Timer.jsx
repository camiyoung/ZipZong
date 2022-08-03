import React from "react"
import { CountdownCircleTimer } from "react-countdown-circle-timer"

const exerciseColor = ["#0EA5E9", "#00D6D6", "#A4F489", "#F9F871"]
const breaktimeColor = ["#FF5050", "#F4397C", "#D33FA4", "#FFE5FD"]

const renderExerciseTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">완료!</div>
  }

  return (
    <div className="flex flex-col items-center">
      <div className="">운동</div>
      <div className="">남은 시간</div>
      <div className=" text-4xl">{remainingTime}</div>
      <div className="">seconds</div>
    </div>
  )
}
const renderBreakTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">완료!</div>
  }

  return (
    <div className="flex flex-col items-center">
      <div className="">휴식</div>
      <div className="">남은 시간</div>
      <div className=" text-4xl">{remainingTime}</div>
      <div className="">seconds</div>
    </div>
  )
}

export const Timer = ({ action, timerOpen }) => {
  const { type, duration } = action
  const colors = type === "breaktime" ? breaktimeColor : exerciseColor

  return (
    <div className=" z-30 absolute top-10 left-10 bg-white border-4 rounded-full">
      <CountdownCircleTimer
        isPlaying
        duration={duration}
        colors={colors}
        colorsTime={[10, 6, 3, 0]}
        onComplete={() => ({ shouldRepeat: false, delay: 1 })}
      >
        {type === "breaktime" ? renderBreakTime : renderExerciseTime}
      </CountdownCircleTimer>
    </div>
  )
}
export default Timer
