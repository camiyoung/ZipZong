import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setRoutineInfo } from "./exerciseReducer"

const style = {
  button:
    "relative inline-flex items-center justify-center p-0.5  mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800",
  buttonText:
    "relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0",
}

const SelectRoutine = ({ closeMoal }) => {
  const routines = useSelector((state) => state.routine.routines)
  const dispatch = useDispatch()

  const selectRoutine = (routine) => {
    dispatch(setRoutineInfo(routine))
    closeMoal()
  }
  return (
    <div className="w-full h-full fixed z-50 top-0 left-0 flex flex-col justify-center items-center">
      <div className="relative bg-white rounded-lg shadow w-4/6 ">
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

export default function SideBar({ chatComponent }) {
  const [showSelectRoutine, setShowSelectRoutine] = useState(false)
  const exersiceRoutine = useSelector((state) => state.exercise.rotuineInfo)
  useEffect(() => {
    if (!exersiceRoutine) return
    if (exersiceRoutine) console.log(exersiceRoutine)
  }, [exersiceRoutine])
  return (
    <div className="border border-black w-full h-full p-3 space-y-2 relative">
      {showSelectRoutine && (
        <SelectRoutine closeMoal={() => setShowSelectRoutine(false)} />
      )}
      <div className="h-1/2 bg-white border rounded-2xl">
        <div
          id="buttons"
          className="border flex justify-center items-center p-2"
        >
          <button
            className={`${style.button} `}
            onClick={() => setShowSelectRoutine(true)}
          >
            <span className={`${style.buttonText}`}>루틴 변경</span>
          </button>
          <button className={`${style.button}`}>
            <span className={`${style.buttonText}`}>게임 시작</span>
          </button>
        </div>

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
      </div>
      <div className="h-1/2  bg-white rounded-2xl border">{chatComponent}</div>
    </div>
  )
}
