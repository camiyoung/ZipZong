import { useState } from "react"
import LargeTextInput from "../components/input/LargeTextInput"
import ExerciseSetting from "../features/routine/ExerciseSetting"
import RoutineButton from "../features/routine/RoutineButton"

export default function RoutineMake() {
  const [routineName, setRoutineName] = useState("")
  const [routine, setRoutine] = useState([])
  const [idx, setIdx] = useState(0)
  const [breakTime, setBreakTime] = useState(0)

  return (
    <div className="">
      <div className="flex p-10 justify-center font-extrabold text-3xl">
        루틴 생성하기
      </div>
      <div className="flex justify-center p-3">
        <div className="text-xl font-bold flex items-center pr-5">
          새 루틴 이름
        </div>
        <div>
          <LargeTextInput handler={setRoutineName} />
        </div>
      </div>
      <div>
        <ExerciseSetting
          routine={routine}
          setRoutine={setRoutine}
          idx={idx}
          setIdx={setIdx}
          breakTime={breakTime}
          setBreakTime={setBreakTime}
        />
      </div>
      <div>
        <RoutineButton
          routineName={routineName}
          exercise={routine}
          breakTime={breakTime}
        />
      </div>
    </div>
  )
}
