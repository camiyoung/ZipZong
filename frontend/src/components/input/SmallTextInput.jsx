import React from "react"
export default function SmallTextInput(props) {
  return (
    <div className="flex">
      <label
        htmlFor="small-input"
        className="
          block
          w-24
          my-auto
          text-sm
          font-medium
        "
      >
        {props.inputName}
      </label>
      <input
        type="text"
        id="small-input"
        className="
          ml-10
          block
          w-96
          bg-gray-50
          rounded-lg
          border
          border-gray-300
          focus:ring-blue-500
          focus:border-blue-500
        "
      />
    </div>
  )
}
