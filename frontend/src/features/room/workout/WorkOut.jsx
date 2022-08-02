import React, { useEffect, useState } from "react"
import TeachableMachine from "../teachableMachine/TeachableMachine"
import Timer from "./Timer"

const exersiceRoutine = {
  routineId: 2,
  routineName: "tmproutine",
  exercise: [
    { name: "LEGRAISE", count: 5 },
    { name: "PUSHUP", count: 5 },
    { name: "BURPEE", count: 5 },
    { name: "LEGRAISE", count: 5 },
    { name: "PUSHUP", count: 5 },
    { name: "BURPEE", count: 5 },
  ],
  breaktime: 3,
}
// 운동시간 5초

const WorkOut = ({ myVideo }) => {
  const { breaktime, exercise: exerciseInfos } = exersiceRoutine
  let routine = []

  useEffect(() => {
    exerciseInfos.forEach((info) => {
      routine.push({ type: "exercise", duration: 5, name: info.name })
      routine.push({ type: "breaktime", duration: breaktime })
    })
    routine.pop()
  }, [])

  const [currentAction, SetCurrentAction] = useState({
    type: "ready",
    duration: 5,
  })

  const changeExerciseState = () => {
    routine.forEach((current) => {})
  }

  return (
    <div className="w-full h-full absolute">
      {/* <TeachableMachine myVideoRef={myVideo.props.myVideoRef} /> */}
      <Timer type={currentAction.type} duration={currentAction.duration} />
    </div>
  )
}

export default WorkOut
