import React from "react"
export default function Select(props) {
  return (
    <div className="flex">
      <label
        htmlFor="routine"
        className="
          block
          my-auto
          text-sm
          font-medium
          text-gray-900
          w-24
        "
      >
        {props.selectName}
      </label>
      <select
        id="routine"
        className="
          bg-gray-50
          border
          border-gray-300
          text-gray-900
          text-sm
          rounded-lg
          focus:ring-blue-500
          focus:border-blue-500
          block
          ml-10
          w-96
        "
      >
        <option defaultValue>루틴을 선택하시오.</option>
        <option value={props.options}>{props.optionName}</option>
        <option value="CA">Canada</option>
      </select>
    </div>
  )
}
