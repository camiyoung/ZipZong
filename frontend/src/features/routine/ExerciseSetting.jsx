import React, { useState } from "react"
import ExerciseList from "./ExerciseList"
import ExerciseSelect from "./ExerciseSelect"

export default function ExerciseSetting() {
  const [routine, setRoutine] = useState([])

  return (
    <div>
      <div>
        <ExerciseList routine={routine} setRoutine={setRoutine} />
      </div>
      <div className="p-5 flex justify-center">
        <ExerciseSelect routine={routine} setRoutine={setRoutine} />
      </div>
    </div>
  )
}
