import { useState, useEffect } from "react"
import ExerciseSelect from "../features/routine/ExerciseSelect"
import ExerciseList from "../features/routine/ExerciseList"
import RoutineButton from "../features/routine/RoutineButton"
import { useParams } from "react-router-dom"

const routines = [
  {
    routineId: 0,
    routineName: "슬기세트",
    exercise: [
      { name: "PUSHUP", count: 5 },
      { name: "PUSHUP", count: 5 },
      { name: "PUSHUP", count: 5 },
      { name: "PUSHUP", count: 5 },
    ],
    breaktime: 60,
    totaltime: 300,
  },
  {
    routineId: 1,
    routineName: "종민세트",
    exercise: [
      { name: "BURPEE", count: 5 },
      { name: "BURPEE", count: 5 },
      { name: "BURPEE", count: 5 },
      { name: "BURPEE", count: 5 },
    ],
    breaktime: 60,
  },
  {
    routineId: 2,
    routineName: "준우세트",
    exercise: [
      { name: "LEGRAISE", count: 5 },
      { name: "LEGRAISE", count: 5 },
      { name: "LEGRAISE", count: 5 },
      { name: "LEGRAISE", count: 5 },
    ],
    breaktime: 60,
  },
  {
    routineId: 3,
    routineName: "승주세트",
    exercise: [
      { name: "PUSHUP", count: 5 },
      { name: "PUSHUP", count: 5 },
      { name: "PUSHUP", count: 5 },
      { name: "PUSHUP", count: 5 },
    ],
    breaktime: 60,
  },
]

export default function RoutineMake() {
  const [routineName, setRoutineName] = useState("")
  const [routine, setRoutine] = useState([])
  const [idx, setIdx] = useState(0)
  const [breakTime, setBreakTime] = useState(15)

  const params = useParams()

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      console.log(routines[params.index].exercise)
      setRoutine(routines[params.index].exercise)
      setBreakTime(routines[params.index].breaktime)
      setRoutineName(routines[params.index].routineName)
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
          index={params.index}
          routines={routines}
        />
      </div>
    </div>
  )
}
