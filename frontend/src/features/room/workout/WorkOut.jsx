import React, { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  updateIndex,
  updateSuccessCount,
  resetSuccessCount,
} from "../exerciseReducer"
import TeachableMachine from "../teachableMachine/TeachableMachine"
import Timer from "./Timer"
import { TodoList } from "./TodoList"

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

const WorkOut = ({ myVideo, tmModel, user, finishExercise }) => {
  const dispatch = useDispatch()
  const todoList = useSelector((state) => state.exercise.todoList)
  const successCount = useSelector((state) => state.exercise.successCount)
  const routine = useRef([])

  const [currentAction, setCurrentAction] = useState({
    type: "ready",
    duration: 3,
  })

  const [isRunning, setRunning] = useState(true)

  const routineIdx = useRef(0)
  useEffect(() => {
    routine.current = todoList.map((item) => {
      return { ...item, performNum: 0 }
    })
    console.log("운동 시작", routine.current)
  }, [])

  const countePreExercise = useRef(0)

  const changeNextAction = () => {
    const nextAction = routine.current[routineIdx.current]

    routineIdx.current++
    setCurrentAction(nextAction)
  }
  const finishAction = () => {
    setRunning(false)
  }

  const countSuccess = () => {
    dispatch(updateSuccessCount())
  }

  const updateSuccess = () => {
    // console.log(
    //   "루틴idx:",
    //   routineIdx.current,
    //   "운동 동작 끝! 횟수:",
    //   successCount
    // )
    const idx = routineIdx.current - 1
    routine.current[idx].performNum = successCount
    dispatch(resetSuccessCount())
    countePreExercise.current = 0
  }

  useEffect(() => {
    if (!isRunning && routineIdx.current < routine.current.length) {
      // console.log("루틴 인덱스", routineIdx.current)
      changeNextAction()
      setRunning(true)
    } else if (!isRunning && routineIdx.current === routine.current.length) {
      console.log("운동 루틴 종료!!!!!!", routine.current)
      finishExercise(routine.current)
    }
  }, [isRunning])

  return (
    <div>
      {isRunning && (
        <Start
          myVideo={myVideo}
          action={currentAction}
          changeAction={changeNextAction}
          finishAction={finishAction}
          tmModel={tmModel}
          updateSuccess={updateSuccess}
          countSuccess={countSuccess}
          user={user}
        />
      )}

      <div className="absolute z-50 bottom-0 ml-2">
        <TodoList />
      </div>
    </div>
  )
}

const Start = ({
  myVideo,
  action,
  changeAction,
  finishAction,
  tmModel,
  updateSuccess,
  user,
  countSuccess,
}) => {
  // console.log("현재 동작 정보", action)
  const dispatch = useDispatch()
  useTimeout(() => {
    // console.log("시간 종료 ")
    finishAction()
  }, action.duration * 1000)
  useEffect(() => {
    return () => {
      dispatch(updateIndex())
    }
  }, [])

  // console.log("MY VIDEO ", myVideo)
  return (
    <div>
      <div className="w-full h-full absolute">
        {action.type === "exercise" && (
          <TeachableMachine
            myVideoRef={myVideo.props.myVideoRef}
            tmModel={tmModel}
            updateSuccess={updateSuccess}
            user={user}
            actionName={action.exerciseName}
            countSuccess={countSuccess}
          />
        )}
        {<Timer action={action} />}
      </div>
    </div>
  )
}
export default WorkOut
