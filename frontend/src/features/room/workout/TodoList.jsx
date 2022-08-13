import { useSelector, useDispatch } from "react-redux"

const language = {
  PUSHUP: "팔굽혀펴기",
  BURPEE: "버피",
  SQUAT: "스쿼트",
  JUMPINGJACK: "팔벌려뛰기",
  LUNGE: "런지",
  LATERALRAISE: "레터럴레이즈",
}

const ActiveIcon = () => {
  return (
    <div className="flex absolute mt-[4px]  -left-2.5 justify-center items-center w-5 h-5 bg-blue-200 rounded-full  dark:ring-gray-900 dark:bg-blue-900">
      <span className="flex h-full w-full justify-center items-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mainBlue opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-mainBlue"></span>
      </span>
    </div>
  )
}

const NonActiveIcon = () => (
  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-[7px]  -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
)

export const TodoList = () => {
  const list = useSelector((state) => state.exercise.todoList)
  const todoIndex = useSelector((state) => state.exercise.todoIndex)
  // const todoIndex = 2
  // console.log("투두", list, todoIndex)
  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-8 mb-10">
      {list.map((item, index) => {
        if (item.type !== "exercise") return <li key={index}></li>
        else {
          return (
            <li
              className={`${index === list.length - 1 ? "ml-5 " : "mb-5 ml-5"}`}
              key={index}
            >
              {index === todoIndex && <ActiveIcon />}
              {index !== todoIndex && <NonActiveIcon />}
              {item.exerciseName && (
                <div className="flex items-center text-lg font-semibold text-gray-900  ">
                  <span className=" bg-[#ffffff97] px-2  rounded-lg">
                    {language[item.exerciseName]}{" "}
                  </span>
                </div>
              )}
            </li>
          )
        }
      })}
    </ol>
  )
}
