import { produceWithPatches } from "immer"
import React from "react"
export default function LargeTextInput(props) {
  return (
    <div className="max-w-sm mx-auto flex">
      <label
        htmlFor="large-input"
        className="
          block
          my-auto
          text-sm
          font-medium
          text-gray-900
          dark:text-gray-300
        "
      >
        {props.inputName}
      </label>
      <input
        onChange={(event) => {
          props.handler(event.target.value)
        }}
        type="text"
        id="large-input"
        className="
          block
          p-4
          w-96
          text-gray-900
          bg-gray-50
          rounded-lg
          border
          border-gray-300
          sm:text-md
          focus:ring-primary-400
          focus:border-primary-400
          dark:bg-gray-700
          dark:border-gray-600
          dark:placeholder-gray-400
          dark:text-white
          dark:focus:ring-blue-500
          dark:focus:border-blue-500
        "
      />
    </div>
  )
}
