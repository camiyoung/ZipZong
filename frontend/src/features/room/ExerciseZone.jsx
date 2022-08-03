import React, { useState } from "react"
import Button from "../../components/button/Button"
import Timer from "../../components/timer/Timer"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import TeachableMachine from "./teachableMachine/TeachableMachine"
import WorkOut from "./workout/WorkOut"

const TodoList = () => {
  return (
    <ul className="w-43 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      <li className="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
        운동1
      </li>
      <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
        운동2
      </li>
      <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
        운동3
      </li>
      <li className="py-2 px-4 w-full rounded-b-lg">운동4</li>
    </ul>
  )
}

const Chat = ({ children }) => {
  console.log(children)
  return <div className="w-full p-3 h-full border rounded-lg">{children}</div>
}

const Counter = () => {
  return (
    <div className="w-28 h-40 bg-mainBlue absolute top-10 right-4">
      <div>
        <p>현재 동작</p>
        <p>스쿼트</p>
      </div>
      <div>9 / 10</div>
    </div>
  )
}

const ExerciseInfo = () => {
  return (
    <div className="w-full h-full flex justify-center items-center py-4">
      <div className="w-3/5 max-w-[170px] h-full bg-white rounded-2xl p-2 mr-3">
        현재운동 <br /> 스쿼트
      </div>
      <div className="w-2/5 max-w-[140px] h-3/4  bg-white rounded-2xl p-2">
        다음 운동 <br />
      </div>
    </div>
  )
}

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
