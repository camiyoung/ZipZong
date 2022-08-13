import { useSelector, useDispatch } from "react-redux"

const ActiveIcon = () => {
  return (
    <span className="flex absolute -left-3 justify-center items-center w-5 h-5 bg-blue-200 rounded-full  dark:ring-gray-900 dark:bg-blue-900">
      <span className="flex h-full w-full justify-center items-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mainBlue opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-mainBlue"></span>
      </span>
    </span>
  )
}

const NonActiveIcon = () => (
  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
)

export const TodoList = () => {
  const list = useSelector((state) => state.exercise.todoList)
  const todoIndex = useSelector((state) => state.exercise.todoIndex)
  console.log("투두", list, todoIndex)
  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700">
      {list.map((item, index) => (
        <li
          className={index === list.length - 1 ? "ml-5 pb-12" : "mb-10 ml-5"}
          key={index}
        >
          {item.type === "exercise" && index === todoIndex && <ActiveIcon />}
          {item.type === "exercise" && index !== todoIndex && <NonActiveIcon />}
          {item.exerciseName && (
            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              {item.exerciseName}
            </h3>
          )}
        </li>
      ))}
    </ol>
  )
}
