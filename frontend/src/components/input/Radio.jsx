import React from "react"

export default function Radio() {
  return (
    <ul className="flex w-[300px] justify-between my-5 ">
      <li>
        <input
          type="radio"
          id="hosting-small"
          name="hosting"
          value="hosting-small"
          className="hidden peer"
          required
        />
        <label
          htmlFor="hosting-small"
          className="inline-flex justify-center items-center p-2 w-36 text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-lgBlue-300 peer-checked:text-black hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div className="block">
            <div className="w-full text-medium font-semibold">운동</div>
          </div>
        </label>
      </li>
      <li>
        <input
          type="radio"
          id="hosting-big"
          name="hosting"
          value="hosting-big"
          className="hidden peer"
        />
        <label
          htmlFor="hosting-big"
          className="inline-flex justify-center items-center p-2 w-36 text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-lgBlue-300 peer-checked:text-black hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div className="block">
            <div className="w-full text-medium font-semibold">게임</div>
          </div>
        </label>
      </li>
    </ul>
  )
}
