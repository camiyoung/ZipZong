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
  console.log("여기 왔니", params)

  useEffect(() => {
    if (params.routineId) {
      console.log(params.routineId)
      console.log(routines)
      const modify = routines.find(
        (element) => element.routineId === Number(params.routineId)
      )
      console.log(modify)
      setRoutine(modify.exercise)
      setBreakTime(modify.breakTime)
      setRoutineName(modify.routineName)
    }
  }, [])

  return (
    <div className="">
      <div className="flex p-10 justify-center font-extrabold text-3xl">
        루틴 관리
      </div>
      <div className="flex justify-center p-3">
        <div className="text-xl font-bold flex items-center pr-5">
          루틴 이름
        </div>
        <div>
          <input
            value={routineName}
            onChange={(event) => setRoutineName(event.target.value)}
            className="block p-4
            w-96
            text-gray-900
            bg-gray-50
            rounded-lg
            border
            sm:text-md
            focus:ring-blue-500
            focus:border-blue-500"
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
