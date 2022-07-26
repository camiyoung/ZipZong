import React, { useState } from "react"
import ExerciseList from "./ExerciseList"
import ExerciseSelect from "./ExerciseSelect"

export default function ExerciseSetting() {
  const [routine, setRoutine] = useState([])
  const [idx, setIdx] = useState(0)
  const [breakTime, setBreakTime] = useState(0)

  return (
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
        />
      </div>
    </div>
  )
}
