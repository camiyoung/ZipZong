import React from "react"

export default function Radio() {
  return (
    <ul className="flex w-96 justify-between my-5">
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
          for="hosting-small"
          className="inline-flex justify-center items-center p-2 w-32 text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-info peer-checked:border-black peer-checked:text-black hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div className="block">
            <div className="w-full text-lg font-semibold">운동</div>
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
          for="hosting-big"
          className="inline-flex justify-center items-center p-2 w-32 text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-info peer-checked:border-black peer-checked:text-black hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div className="block">
            <div className="w-full text-lg font-semibold">게임</div>
          </div>
        </label>
      </li>
    </ul>
  )
}
