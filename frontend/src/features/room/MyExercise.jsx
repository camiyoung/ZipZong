import React from "react"
import Button from "../../components/button/Button"
import Timer from "../../components/timer/Timer"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import TeachableMachine from "./teachableMachine/TeachableMachine"

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

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">완료!</div>
  }

  return (
    <div className="flex flex-col items-center">
      <div className="">Remaining</div>
      <div className=" text-4xl">{remainingTime}</div>
      <div className="">seconds</div>
    </div>
  )
}

function MyExercise({ Toolbar, myVideo, chat }) {
  // console.log("비디오", myVideo)
  // const videoEle = myVideo.props.myVideoRef.current

  return (
    <div className="flex  h-full w-[90%] pl-2 ">
      <div className=" w-[75%] h-full p-3 relative  " id="videoArea">
        {myVideo && <TeachableMachine myVideoRef={myVideo.props.myVideoRef} />}
        {<div className="w-full h-full ">{myVideo}</div>}
        <div className=" z-30 absolute top-10 left-10 bg-white border-4 rounded-full">
          <CountdownCircleTimer
            isPlaying
            duration={10}
            colors={["#337699", "#0ea5e9", "#34d399", "#d9f99d"]}
            colorsTime={[10, 6, 3, 0]}
            onComplete={() => ({ shouldRepeat: true, delay: 1 })}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
        <div className="w-full h-[10%] flex justify-between items-center absolute bottom-5">
          {Toolbar}
        </div>
      </div>
      <div className=" w-[25%] min-w-[250px] h-full p-3 " id="sideArea">
        <div className="w-full h-full flex flex-col  rounded-2xl">
          <div id="info" className="h-2/6 p-4">
            <div className=" w-full h-full ">
              <ExerciseInfo />
            </div>
          </div>
          <div id="chat" className="h-4/6">
            {chat}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyExercise
