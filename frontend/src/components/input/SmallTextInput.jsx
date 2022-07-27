import React from "react"
export default function SmallTextInput(props, ...restProps) {
  return (
    <div className="flex" {...restProps}>
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
        {props.inputName}
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
          focus:ring-primary-200
          focus:border-primary-200
        "
      />
    </div>
  )
}
