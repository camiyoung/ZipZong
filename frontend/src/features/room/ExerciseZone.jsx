import React, { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router"
import { useSearchParams } from "react-router-dom"
import {
  getSessionInfo,
  getAdminId,
  setAllExerciseResult,
  setMyExerciseResult,
  getRoutineDetail,
  setTeamId,
  setExerciseStatus,
} from "./exerciseReducer"
import { getRoutine } from "../routine/routineReducer"
import WorkOut from "./workout/WorkOut"

function MyExercise({
  Toolbar,
  myVideo,
  isRoomAdmin,
  tmModel,
  user,
  setAlert,
}) {
  // console.log("userInfo ", user)
  const isExercising = useSelector((state) => state.exercise.isExercising)
  const [isFinished, setFinished] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const setExercising = (value) => {
    dispatch(setExerciseStatus(value))
  }
  useEffect(() => {
    console.log(location.pathname.split("/"))
    const paths = location.pathname.split("/")
    if (paths.length >= 2 && paths[2]) {
      console.log("roomid", paths[2])
      dispatch(getRoutine(paths[2]))
    }
  }, [])
  const admin = useSelector(getAdminId)
  // const routine =

  let resultUsers = { teamId: "123", personalResults: [] }
  useEffect(() => {
    console.log("세션 :", user.getStreamManager().stream.session)
    dispatch(getSessionInfo())
    user.getStreamManager().stream.session.on("signal:start", (event) => {
      console.log("운동 시작 이벤트 발생 !!!", event)
      setExercising(true)
    })

    user.getStreamManager().stream.session.on("signal:finish", (event) => {
      console.log("운동 종료 이벤트 수신")

      resultUsers.personalResults.push(JSON.parse(event.data))
      setExercising(false)
      setTimeout(() => {
        console.log("5초끝!")
        console.log(resultUsers)
        setFinished(true)
      }, 5000)
    })

    user.getStreamManager().stream.session.on("signal:result", (event) => {
      console.log("운동 결과 데이터 수신", event.data)
      // setExercising(true)
      dispatch(setAllExerciseResult(JSON.parse(event.data)))
      navigate("/result")
    })

    user.getStreamManager().stream.session.on("signal:exit", (event) => {
      console.log("비정상종료 ", event.data)
      setExercising(false)
      setAlert("error")
    })
  }, [])

  useEffect(() => {
    if (!isExercising) {
    }
  }, [isExercising])
  useEffect(() => {
    if (isFinished) {
      console.log("전송 끝 ")
      const data = {
        personalPercentages: [
          {
            nickname: "닉네임1",
            percentage: 50,
          },
          {
            nickname: "닉네임1",
            percentage: 50,
          },
          {
            nickname: "닉네임1",
            percentage: 50,
          },
          {
            nickname: "닉네임1",
            percentage: 50,
          },
          {
            nickname: "닉네임1",
            percentage: 50,
          },
        ],
      }
      user.getStreamManager().stream.session.signal({
        data: JSON.stringify(data),
        type: "result",
      })
    }
  }, [isFinished])

  const startExercise = () => {
    user.getStreamManager().stream.session.signal({
      data: "게임을 시작~~",
      type: "start",
    })
  }
  const finishExercise = (result) => {
    setExercising(false)
    const data = result.filter((res) => res.type === "exercise")
    const res = { memberId: user.connectionId }
    const exerciseRes = data.map(
      ({ name: exerciseName, success: performNum, goal: targetNum }) => {
        return { exerciseName, performNum, targetNum }
      }
    )
    res.personalResults = exerciseRes

    console.log("운동 끝!! ", res)

    // console.log("방장 ID!!", admin)
    user.getStreamManager().stream.session.signal({
      data: JSON.stringify(res),
      type: "finish",
      to: [admin],
    })
    setAlert("alert")
    dispatch(setMyExerciseResult(res))
  }

  const startButton = (
    <button className="bg-mainBlue border " onClick={startExercise}>
      운동 시작하기
    </button>
  )

  const finishButton = (
    <button className=" bg-red-400 border " onClick={finishExercise}>
      운동 종료하기
    </button>
  )

  return (
    <div className="flex  h-full w-full pl-2  relative ">
      {myVideo && isExercising && (
        <WorkOut
          myVideo={myVideo}
          tmModel={tmModel}
          user={user}
          finishExercise={finishExercise}
        />
      )}
      {<div className="w-full h-full ">{myVideo}</div>}

      <div id="button " className="absolute top-5 left-5 z-50">
        {/* {isRoomAdmin && !isExercising && startButton} */}
        {/* {isExercising && finishButton} */}
      </div>
      <div className="w-full h-[10%] flex justify-between items-center absolute bottom-5">
        {Toolbar}
      </div>
    </div>
  )
}

export default MyExercise
