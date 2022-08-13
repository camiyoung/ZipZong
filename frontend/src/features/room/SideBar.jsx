import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setRoutineInfo, setTodoList } from "./exerciseReducer"
import { Tooltip } from "flowbite-react"

const style = {
  buttonAdmin:
    "relative inline-flex items-center justify-center p-0.5  mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800",
  buttonText:
    "relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0",
  buttonDisable:
    "text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center",
}

const SelectRoutine = ({ closeMoal, user }) => {
  const routines = useSelector((state) => state.routine.routines)
  const dispatch = useDispatch()

  const changeRoutine = (routine) => {
    user.getStreamManager().stream.session.signal({
      data: JSON.stringify(routine),
      type: "change",
    })
  }

  const selectRoutine = (routine) => {
    changeRoutine(routine)
    closeMoal()
  }
  return (
    <div className="w-full h-full fixed z-50 top-0 left-0 flex flex-col justify-center items-center">
      <div className="relative bg-white rounded-lg shadow w-4/6 ">
        <div onClick={() => closeMoal()}>닫기 </div>
        루틴 선택
        {routines.map((routine, index) => (
          <div
            className="border-2 border-yellow-300"
            key={index}
            onClick={() => selectRoutine(routine)}
          >
            {routine.routineName}
          </div>
        ))}
      </div>
    </div>
  )
}

const NotActiveButtons = () => {
  return (
    <div id="buttons" className="border flex justify-center items-center p-2">
      <Tooltip content="루틴 변경은 방장만 가능합니다." placement="bottom">
        <button className={`${style.buttonDisable} `}>
          <span>루틴 변경 </span>
        </button>
      </Tooltip>
      <Tooltip content="게임 시작은 방장만 가능합니다." placement="bottom">
        <button className={`${style.buttonDisable}`}>
          <span>게임 시작</span>
        </button>
      </Tooltip>
    </div>
  )
}

export default function SideBar({ chatComponent, user, isRoomAdmin }) {
  const dispatch = useDispatch()
  const [showSelectRoutine, setShowSelectRoutine] = useState(false)
  const [errorMessage, setError] = useState("")
  const exersiceRoutine = useSelector((state) => state.exercise.rotuineInfo)
  const count = useSelector((state) => state.exercise.successCount)
  if (isRoomAdmin) {
    console.log("나는 방장 ")
  }
  useEffect(() => {
    user.getStreamManager().stream.session.on("signal:change", (event) => {
      // console.log("루틴 변경 ", JSON.parse(event.data))
      dispatch(setRoutineInfo(JSON.parse(event.data)))
    })
  }, [])

  useEffect(() => {
    if (!exersiceRoutine) return
    if (exersiceRoutine) {
      // console.log("루틴이 변경됨", exersiceRoutine)
      changeTodoList()
      setError("")
    }
  }, [exersiceRoutine])

  const changeTodoList = () => {
    let todo = []
    exersiceRoutine.exercise.forEach((info) => {
      todo.push({
        type: "exercise",
        duration: 5,
        exerciseName: info.name,
        targetNum: info.count,
        // success: 0,
      })
      // todo.push({ type: "breaktime", duration: exersiceRoutine.breakTime })
      todo.push({ type: "breaktime", duration: 2 })
    })
    todo.pop()

    dispatch(setTodoList(todo))
  }

  const startExercise = () => {
    if (!exersiceRoutine) {
      setError("루틴을 선택해야 합니다.")
      return
    }
    user.getStreamManager().stream.session.signal({
      data: "게임을 시작~~",
      type: "start",
    })
  }

  return (
    <div className="border border-black w-full h-full p-3 space-y-2 relative">
      {showSelectRoutine && (
        <SelectRoutine
          closeMoal={() => setShowSelectRoutine(false)}
          user={user}
        />
      )}
      <div className="h-1/2 bg-white border rounded-2xl">
        {isRoomAdmin ? (
          <div
            id="buttons"
            className="border flex justify-center items-center p-2"
          >
            <button
              className={`${style.buttonAdmin} `}
              onClick={() => setShowSelectRoutine(true)}
            >
              <span className={`${style.buttonText}`}>루틴 변경</span>
            </button>
            <button className={`${style.buttonAdmin}`} onClick={startExercise}>
              <span className={`${style.buttonText}`}>게임 시작</span>
            </button>
          </div>
        ) : (
          <NotActiveButtons />
        )}

        {exersiceRoutine && (
          <div id="routine-info">
            <h1>수행할 운동 루틴</h1>
            <h2>{exersiceRoutine.routineName}</h2>
            {exersiceRoutine.exercise.map((exercise, index) => (
              <div key={index}>
                <div>
                  {exercise.name} : {exercise.count} 개
                </div>
              </div>
            ))}
          </div>
        )}
        {errorMessage && <div>{errorMessage}</div>}
      </div>
      <div className="h-1/2  bg-white rounded-2xl border">{chatComponent}</div>
    </div>
  )
}
