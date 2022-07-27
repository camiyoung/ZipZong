import React, { useState } from "react"
import ExerciseList from "./ExerciseList"
import ExerciseSelect from "./ExerciseSelect"

export default function ExerciseSetting({
  routine,
  setRoutine,
  idx,
  setIdx,
  breakTime,
  setBreakTime,
}) {
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
          breakTime={breakTime}
          setBreakTime={setBreakTime}
        />
      </div>
    </div>
  )
}
