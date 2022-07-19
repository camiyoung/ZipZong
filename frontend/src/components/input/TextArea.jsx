export default function TextArea(props) {
  return (
    <div className="max-w-sm mx-auto flex">
      <label
        htmlFor="message"
        className="
          block
          my-auto
          text-sm
          font-medium
          text-gray-900
          dark:text-gray-400
        "
      >
        {props.textAreaName}
      </label>
      <textarea
        id="message"
        rows="4"
        className="
          block
          p-2.5
          w-96
          text-sm
          text-gray-900
          bg-gray-50
          rounded-lg
          border
          border-gray-300
          focus:ring-blue-500
          focus:border-blue-500
          dark:bg-gray-700
          dark:border-gray-600
          dark:placeholder-gray-400
          dark:text-white
          dark:focus:ring-blue-500
          dark:focus:border-blue-500
        "
        placeholder="Leave a comment..."
      ></textarea>
    </div>
  )
}
