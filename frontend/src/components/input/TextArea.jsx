import React from "react"

export default function TextArea(props) {
  return (
    <div>
      <label
        htmlFor="message"
        className="
          block
          my-auto
          text-sm
          font-medium
          text-gray-900
        "
      >
        {props.textAreaName}
      </label>
      <textarea
        id="message"
        rows="4"
        className="
          block
          w-96
          text-sm
          text-gray-900
          bg-gray-50
          rounded-lg
          border
          border-gray-300
          focus:ring-blue-500
          focus:border-blue-500
        "
        placeholder="Leave a comment..."
      ></textarea>
    </div>
  )
}
