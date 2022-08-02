import React from "react"
export default function SmallTextInput(props) {
  const { inputName, ...other } = props
  return (
    <div className="flex">
      <label
        htmlFor="small-input"
        className="
          block
          w-20
          my-auto
          text-sm
          font-medium
        "
      >
        {inputName}
      </label>
      <input
        type="text"
        id="small-input"
        className="
          ml-10
          h-9
          w-[300px]
          block
          bg-gray-50
          rounded-lg
          text-sm
          border
          border-gray-300
          focus:ring-primary-400
          focus:border-primary-400
        "
        onChange={(event) => {
          props.handler(event.target.value)
        }}
        {...other}
      />
    </div>
  )
}
