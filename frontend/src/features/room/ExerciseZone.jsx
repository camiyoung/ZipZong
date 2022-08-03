import React, { useState } from "react"
import Button from "../../components/button/Button"
import Timer from "../../components/timer/Timer"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import TeachableMachine from "./teachableMachine/TeachableMachine"
import WorkOut from "./workout/WorkOut"

function MyExercise({ Toolbar, myVideo, chat, isRoomAdmin }) {
  const [isExercising, setExercising] = useState(false)

  console.log("방 관리자?", isRoomAdmin)

  const startExercise = () => {
    console.log("운동 시작")
    setExercising(true)
  }
  const finishExercise = () => {
    console.log("운동 종료")
    setExercising(false)
  }

  const startButton = (
    <button className="bg-mainBlue border " onClick={startExercise}>
      운동 시작하기
    </button>
  )

  const finishButton = (
    <button className=" bg-red-400 border " onClick={finishExercise}>
      운동 종료하기
    </button>
  )

  return (
    <div className="flex  h-full w-full pl-2  relative ">
      {myVideo && isExercising && <WorkOut myVideo={myVideo} />}
      {<div className="w-full h-full ">{myVideo}</div>}

      <div id="button " className="absolute top-5 left-5 z-50">
        {isRoomAdmin && !isExercising && startButton}
        {isExercising && finishButton}
      </div>
      <div className="w-full h-[10%] flex justify-between items-center absolute bottom-5">
        {Toolbar}
      </div>
    </div>
  )
}

export default MyExercise
