import React, { useEffect, useRef, useState } from "react"
import TeachableMachine from "../teachableMachine/TeachableMachine"
import Timer from "./Timer"

const exersiceRoutine = {
  routineId: 2,
  routineName: "tmproutine",
  exercise: [
    { name: "LEGRAISE", count: 7 },
    { name: "PUSHUP", count: 7 },
    { name: "BURPEE", count: 7 },
    { name: "LEGRAISE", count: 7 },
    { name: "PUSHUP", count: 7 },
    { name: "BURPEE", count: 7 },
  ],
  breaktime: 2,
}
// 운동시간 5초

function useTimeout(callback, delay) {
  const timeoutRef = useRef(null)
  const savedCallback = useRef(callback)
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  useEffect(() => {
    const tick = () => savedCallback.current()
    if (typeof delay === "number") {
      timeoutRef.current = window.setTimeout(tick, delay)
      return () => window.clearTimeout(timeoutRef.current)
    }
  }, [delay])
  return timeoutRef
}

const WorkOut = ({ myVideo }) => {
  const { breaktime, exercise: exerciseInfos } = exersiceRoutine
  const routine = useRef([])
  const [currentAction, setCurrentAction] = useState({
    type: "ready",
    duration: 3,
  })

  const [isRunning, setRunning] = useState(true)

  const routineIdx = useRef(0)
  useEffect(() => {
    let todo = []
    console.log("운동 시작 mounted")
    exerciseInfos.forEach((info) => {
      todo.push({ type: "exercise", duration: 3, name: info.name })
      todo.push({ type: "breaktime", duration: breaktime })
    })
    todo.pop()

    routine.current = todo
    console.log(routine)
  }, [])

  const changeNextAction = () => {
    const nextAction = routine.current[routineIdx.current]
    routineIdx.current++
    // console.log("다음 동작", nextAction, routineIdx)
    setCurrentAction(nextAction)
  }
  const finishAction = () => {
    setRunning(false)
  }

  useEffect(() => {
    if (!isRunning && routineIdx.current < routine.current.length) {
      // console.log("루틴 인덱스", routineIdx.current)
      changeNextAction()
      setRunning(true)
    } else if (!isRunning && routineIdx.current === routine.current.length) {
      console.log("운동 루틴 종료!!!!!!")
    }
  }, [isRunning])

  useEffect(() => {
    // console.log("동작 변경")
  }, [currentAction])
  return (
    <div>
      {isRunning && (
        <Start
          myVideo={myVideo}
          action={currentAction}
          changeAction={changeNextAction}
          finishAction={finishAction}
        />
      )}
    </div>
  )
}

const Start = ({ myVideo, action, changeAction, finishAction }) => {
  console.log("현재 동작 정보", action)

  useTimeout(() => {
    console.log("시간 종료 ")
    finishAction()
  }, action.duration * 1000)
  useEffect(() => {
    return () => {
      console.log("현재 동작  Unmount")
    }
  }, [])
  return (
    <div>
      <div className="w-full h-full absolute">
        {/* <TeachableMachine myVideoRef={myVideo.props.myVideoRef} /> */}
        {<Timer action={action} />}
        {!!action && (
          <div className="absolute top-0 bg-white z-50">
            현재 운동:{action.type}, 시간:{action.duration}
          </div>
        )}
      </div>
    </div>
  )
}
export default WorkOut
