import React from "react"
export default function Select(props) {
  return (
    <div className="flex">
      <label
        htmlFor="routine"
        className="
          block
          w-20
          my-auto
          text-sm
          font-medium
        "
      >
        {props.selectName}
      </label>
      <select
        id="routine"
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
      >
        <option defaultValue>루틴을 선택하시오.</option>
        <option value={props.options}>{props.optionName}</option>
        <option value="CA">Canada</option>
      </select>
    </div>
  )
}
