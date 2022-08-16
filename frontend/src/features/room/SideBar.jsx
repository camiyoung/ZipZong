import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setRoutineInfo, setTodoList } from "./exerciseReducer"
import { Tooltip, Toast } from "flowbite-react"
import ExerciseIcon from "../../components/icon/ExerciseIcon"
import ChangeLanguage from "../routine/ChangeLanguage"
import { http } from "../../api/axios"
import { useParams } from "react-router"

const style = {
  buttonAdmin:
    "relative inline-flex items-center justify-center p-0.5  mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800",
  buttonText:
    "relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0",
  buttonDisable:
    "text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center",
}

const ErrorToast = ({ message, setError }) => {
  const close = () => {
    setError("")
  }

  return (
    <div className="top-0 right-0 absolute" onClick={close}>
      <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Warning icon</span>
        </div>
        <div className="ml-3 text-sm font-normal">{message}</div>
        {/* <Toast.Toggle /> */}
      </Toast>
    </div>
  )
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

const ExerciseCard = ({ exercise }) => {
  const name = exercise.type === "exercise" ? exercise.exerciseName : "BREAK"

  return (
    <div className="flex justify-center">
      <div
        className="w-[150px] shadow-md flex justify-center items-center bg-cover bg-center rounded-3xl mx-3 border-white border-4 clickbtn cursor-pointer text-base"
        style={{
          backgroundImage: `url(/images/exerciseIcon/${name}.png)`,
        }}
      >
        <div className="w-full h-full backdrop-blur-lg rounded-3xl">
          <div className="flex flex-col justify-center items-center w-full h-full py-6">
            <ExerciseIcon
              size="large"
              shape="round"
              image={name}
            ></ExerciseIcon>
            <span className="bg-[#ffffffee] mt-4 p-1 w-full flex justify-center">
              {name === "BREAK" ? (
                <div>휴식</div>
              ) : (
                <ChangeLanguage exercise={name} className="" />
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const ExerciseInfo = () => {
  const todo = useSelector((state) => state.exercise.todoList)
  const index = useSelector((state) => state.exercise.todoIndex)
  const current = index === -1 ? undefined : todo[index]
  // const current = undefined
  const successCount = useSelector((state) => state.exercise.successCount)
  return (
    <div className="0 w-full h-full flex flex-col justify-center items-center">
      {!current ? (
        <div>준비 </div>
      ) : (
        <div className="flex">
          {/* <div>{current.exerciseName}</div> */}
          <ExerciseCard exercise={current} />
          <div className="flex  items-center justify-center flex-col ">
            <div>
              {current.type === "exercise"
                ? `Todo :${current.targetNum}`
                : "휴식"}
            </div>
            <div>
              <span className="text-8xl font-semibold text-mainBlue">
                {successCount}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SideBar({ chatComponent, user, isRoomAdmin, tmModel }) {
  const dispatch = useDispatch()
  const [showSelectRoutine, setShowSelectRoutine] = useState(false)
  const [errorMessage, setError] = useState("")
  const exersiceRoutine = useSelector((state) => state.exercise.rotuineInfo)
  const isExercising = useSelector((state) => state.exercise.isExercising)
  const { teamId } = useParams()
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
        duration: 10,
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
    console.log("모델 모두 로딩?", tmModel.modelsLoaded())
    if (!tmModel.modelsLoaded()) {
      setError(" 운동 모델을 불러오는중입니다. 잠시후 다시 시도해주세요.")
      return
    }
    user.getStreamManager().stream.session.signal({
      data: JSON.stringify(exersiceRoutine),
      type: "change",
    })
    http
      .put(`room/start/${teamId}`)
      .then((res) => {
        user.getStreamManager().stream.session.signal({
          data: "게임을 시작~~",
          type: "start",
        })
      })
      .catch((err) => {
        alert("정상적인 루트로 운동방을 생성해야 합니다.")
      })
  }

  return (
    <div className="w-full h-full p-3 relative">
      {showSelectRoutine && (
        <SelectRoutine
          closeMoal={() => setShowSelectRoutine(false)}
          user={user}
        />
      )}
      <div className="h-2/5 bg-white rounded-2xl relative shadow-md">
        {isExercising ? (
          <div className=" flex justify-center items-center p-2 h-1/6 moving-grad rounded-t-2xl shadow-lg">
            <span>운동중</span>
          </div>
        ) : (
          <div
            id="buttons"
            className=" flex justify-center items-center p-2 h-1/6"
          >
            {isRoomAdmin ? (
              <div>
                <button
                  className={`${style.buttonAdmin} `}
                  onClick={() => setShowSelectRoutine(true)}
                >
                  <span className={`${style.buttonText}`}>루틴 변경</span>
                </button>
                <button
                  className={`${style.buttonAdmin}`}
                  onClick={startExercise}
                >
                  <span className={`${style.buttonText}`}>게임 시작</span>
                </button>
              </div>
            ) : (
              <NotActiveButtons />
            )}
          </div>
        )}

        {exersiceRoutine && (
          <div id="routine-info" className="h-5/6 overflow-auto">
            {!isExercising ? (
              <div>
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
            ) : (
              <ExerciseInfo />
            )}
          </div>
        )}
        {errorMessage && (
          <ErrorToast message={errorMessage} setError={setError} />
        )}
      </div>
      <div className="h-3/5 pt-3">
        <div className="h-full w-full  rounded-2xl bg-white shadow-md">
          {chatComponent}
        </div>
      </div>
    </div>
  )
}
