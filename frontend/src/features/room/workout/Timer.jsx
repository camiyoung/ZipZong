import React from "react"
import { CountdownCircleTimer } from "react-countdown-circle-timer"

const exerciseColor = ["#FF5050", "#F4397C", "#D33FA4", "#FFE5FD"]
const breaktimeColor = ["#0EA5E9", "#00D6D6", "#A4F489", "#F9F871"]

const renderExerciseTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">완료!</div>
  }

  return (
    <div className="flex flex-col items-center">
      {/* <div className="">운동</div> */}
      {/* <div className="">남은 시간</div> */}
      <p className="text-lg font-semibold  text-gray-400">운동</p>
      <div className=" text-6xl text-[#dcd4d7] font-bold relative">
        {remainingTime} <span className="  text-lg">초</span>{" "}
        <div className=" text-6xl  text-[#F4397C] font-bold absolute top-0 translate-x-1 -translate-y-2 ">
          {remainingTime} <span className="  text-lg">초</span>{" "}
        </div>
      </div>
    </div>
  )
}
const renderBreakTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">완료!</div>
  }

  return (
    <div className="flex flex-col items-center">
      {/* <div className="">휴식</div> */}
      {/* <div className="">남은 시간</div> */}
      <p className="text-lg font-semibold  text-gray-400 pb-1">휴식</p>
      <div className=" text-6xl text-[#cdd3d5] font-bold relative">
        {remainingTime} <span className="  text-lg">s</span>{" "}
        <div className=" text-6xl  text-[#0EA5E9] font-bold absolute top-0 translate-x-1 -translate-y-2 ">
          {remainingTime} <span className="  text-lg">s</span>{" "}
        </div>
      </div>
    </div>
  )
}

export const Timer = ({ action, timerOpen }) => {
  const { type, duration } = action
  const colors = type === "breaktime" ? breaktimeColor : exerciseColor

  return (
    <div className=" z-30 absolute top-20 left-10 bg-white border-2 rounded-full">
      <CountdownCircleTimer
        isPlaying
        duration={duration}
        colors={colors}
        colorsTime={[10, 6, 3, 0]}
        onComplete={() => ({ shouldRepeat: false, delay: 1 })}
      >
        {type === "exercise" ? renderExerciseTime : renderBreakTime}
      </CountdownCircleTimer>
    </div>
  )
}
export default Timer
