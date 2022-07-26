import React from "react"
import Button from "../../components/button/Button"
import Timer from "../../components/timer/Timer"

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

const Chat = () => {
  return <div className="w-full p-3 h-full border rounded-lg">채팅</div>
}

const Config = ({ toolbar }) => {
  return (
    <div className="w-full h-[10%]  flex justify-between items-center">
      {toolbar}
    </div>
  )
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

function MyExercise({ Toolbar, myVideo }) {
  console.log(Toolbar)
  return (
    <div className="flex border h-4/6 ">
      <div className=" w-1/5 flex flex-col">
        <div className="w-full h-1/2 p-2 flex justify-center items-center">
          <Timer time={60} />
        </div>

        <div className="flex justify-center items-center h-1/2">
          <div className=" w-9/12 rounded-md h-full">
            <div className="font-semibold text-center">To Do</div>
            <TodoList />
          </div>
        </div>
      </div>
      <div className=" w-3/5 p-3 relative">
        <div className="w-full h-[90%]  rounded-xl bg-primary-100">
          {myVideo}
        </div>
        <Counter />
        <Config toolbar={Toolbar} />
      </div>
      <div className="border w-1/5 p-3">
        <Chat />
      </div>
    </div>
  )
}

export default MyExercise
