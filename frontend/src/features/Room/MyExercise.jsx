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

const SoundConfig = () => {
  return (
    <div className="w-full h-[10%]  flex justify-between items-center">
      <Button text="음소거" bgColor="normal" round="round3xl" />
      <div className="sound-btn w-52 flex items-center">
        <label
          htmlFor="small-range"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          <svg
            className="w-6 h-6 text-lightGray"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <input
          id="small-range"
          type="range"
          defalultvalue="50"
          className="mb-6 w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700  mt-4"
        />
      </div>
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

function MyExercise({ children }) {
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
          {children}
        </div>
        <Counter />
        <SoundConfig />
      </div>
      <div className="border w-1/5 p-3">
        <Chat />
      </div>
    </div>
  )
}

export default React.memo(MyExercise)
