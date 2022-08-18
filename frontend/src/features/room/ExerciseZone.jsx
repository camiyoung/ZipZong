import React, { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useLocation, useParams } from "react-router"
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
import { http } from "../../api/axios"

function MyExercise({
  Toolbar,
  myVideo,
  isRoomAdmin,
  tmModel,
  user,
  setAlert,
  leaveSession,
}) {
  // console.log("userInfo ", user)
  const isExercising = useSelector((state) => state.exercise.isExercising)
  const memberId = localStorage.getItem("memberId")
  const [isFinished, setFinished] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { teamId } = useParams()
  const resultUsers = useRef({ teamId: undefined, personalResults: [] })

  const setExercising = (value) => {
    dispatch(setExerciseStatus(value))
  }
  useEffect(() => {
    console.log(location.pathname.split("/"))
    const paths = location.pathname.split("/")
    if (paths.length >= 2 && paths[2]) {
      console.log("roomid", paths[2])
      resultUsers.current.teamId = paths[2]
      dispatch(getRoutine(paths[2]))
    }
  }, [])
  const admin = useSelector(getAdminId)
  // const routine =

  let participantCount = undefined
  let recivedCount = 0
  useEffect(() => {
    const session = user.getStreamManager().stream.session
    console.log("세션 :", session)
    dispatch(getSessionInfo(session.sessionId))
    user.getStreamManager().stream.session.on("signal:start", (event) => {
      console.log("운동 시작 이벤트 발생 !!!", event)
      setExercising(true)
    })

    user.getStreamManager().stream.session.on("signal:finish", (event) => {
      const session = user.getStreamManager().stream.session
      resultUsers.current.personalResults.push(JSON.parse(event.data))

      if (!participantCount) {
        participantCount = session.streamManagers.length
      }
      recivedCount++

      // console.log(
      //   "운동 종료 이벤트 수신",
      //   "참여자:",
      //   participantCount,
      //   "수신:",
      //   recivedCount
      // )

      if (recivedCount === participantCount) {
        // 모든 참여자의 정보를 수신하면 4초후 결과창 이동
        console.log("모든 참여자들의 결과 기록 수신 완료 ")
        console.log(resultUsers.current)
        setTimeout(() => {
          console.log("결과 전송 끝 !")
          setFinished(true)
        }, 4000)
      }

      setExercising(false)
      setTimeout(() => {
        // 결과 데이터를 참여자의 수 만큼 받지 못하는 상황일 경우 최초 결과 데이터 수신된 시점으로 5초후 결과창 이동
        console.log("5초끝!")
        console.log(resultUsers)
        setFinished(true)
      }, 5000)
    })

    user.getStreamManager().stream.session.on("signal:result", (event) => {
      const res = JSON.parse(event.data)
      console.log("운동 결과 데이터 수신", res)
      // setExercising(true)

      dispatch(setAllExerciseResult(res.data))
      // if (isRoomAdmin) {
      //   http.delete(`room/${teamId}`)
      // }
      leaveSession()
      navigate("/result")
    })

    user.getStreamManager().stream.session.on("signal:exit", (event) => {
      console.log("비정상종료 ", event.data)
      setExercising(false)
      leaveSession()
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
      async function sendResult() {
        const { data } = await http.post("exercise/result", resultUsers.current)
        user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: "result",
        })
      }

      sendResult()
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
    const res = { memberId, personalResultDetails: data }

    console.log("운동 끝!! ", res)
    dispatch(setMyExerciseResult(res))
    setAlert("alert")

    setTimeout(() => {
      user.getStreamManager().stream.session.signal({
        data: JSON.stringify(res),
        type: "finish",
        to: [admin],
      })
    }, 3000)

    // console.log("방장 ID!!", admin)
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
    <div className="flex  h-full w-full  relative ">
      {myVideo && isExercising && (
        <WorkOut
          myVideo={myVideo}
          tmModel={tmModel}
          user={user}
          finishExercise={finishExercise}
        />
      )}
      {<div className="w-full h-full py-3 ">{myVideo}</div>}

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
