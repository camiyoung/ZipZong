import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

import ExerciseSelect from "../features/routine/ExerciseSelect"
import ExerciseList from "../features/routine/ExerciseList"
import RoutineButton from "../features/routine/RoutineButton"
import { useParams } from "react-router-dom"

export default function RoutineMake() {
  const routines = useSelector((state) => state.routine.routines)

  const [routineName, setRoutineName] = useState("")
  const [routine, setRoutine] = useState([])
  const [idx, setIdx] = useState(0)
  const [breakTime, setBreakTime] = useState(15)

  const params = useParams()

  useEffect(() => {
    if (params.routineId) {
      const modify = routines.find(
        (element) => element.routineId === Number(params.routineId)
      )
      setRoutine(modify.exercise)
      setBreakTime(modify.breakTime)
      setRoutineName(modify.routineName)
    }
  }, [])

  return (
    <div className="">
      <div className="flex pt-10 text-primary-700 justify-center font-extrabold text-3xl">
        {params.routineId ? "루틴 수정" : "루틴 생성"}
      </div>
      <div className="flex pt-2 mb-10 text-lgBlue-600 justify-center text-md">
        📃 각 운동은 1분씩 시행되며, 운동 사이마다 휴식 시간이 제공됩니다.
      </div>
      <div className="flex justify-center m-3 pb-7">
        <div className="text-xl font-bold flex mr-5 items-center">
          루틴 이름
        </div>
        <div className="flex flex-col">
          <input
            value={routineName}
            onChange={(event) => setRoutineName(event.target.value)}
            className="block p-3
            w-96
            text-gray-900
            bg-gray-50
            rounded-lg
            border
            sm:text-md
            focus:ring-blue-500
            focus:border-blue-500"
            maxLength="20"
          />
        </div>
      </div>

      <div>
        <div>
          <ExerciseList
            routine={routine}
            setRoutine={setRoutine}
            setIdx={setIdx}
          />
        </div>
        <div className="p-5 flex justify-center">
          <ExerciseSelect
            routine={routine}
            setRoutine={setRoutine}
            idx={idx}
            setIdx={setIdx}
            breakTime={breakTime}
            setBreakTime={setBreakTime}
          />
        </div>
      </div>
      <div>
        <RoutineButton
          routineName={routineName}
          exercise={routine}
          breakTime={breakTime}
          routineId={params.routineId}
          teamId={params.teamId}
        />
      </div>
    </div>
  )
}
