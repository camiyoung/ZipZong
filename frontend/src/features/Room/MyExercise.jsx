import React from "react"
import Timer from "../../components/timer/Timer"

export default function MyExercise() {
  return (
    <div className="flex border h-4/6 ">
      <div className="border w-1/5 flex flex-col">
        <div className="w-full h-1/2 p-2 flex justify-center items-center">
          <Timer time={60} />
        </div>

        <div className="flex justify-center items-center h-1/2">
          <div className="border w-9/12 rounded-md h-full">
            투두리스트
            <ul>
              <li>운동</li>
              <li>운동</li>
              <li>운동</li>
              <li>운동</li>
              <li>운동</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border w-3/5 p-3">
        video area
        <div className="w-full h-4/5 border">video</div>
        <div className="w-full h-1/6 border">버튼들</div>
      </div>
      <div className="border w-1/5">채팅</div>
    </div>
  )
}
