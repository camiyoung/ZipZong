import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import Room from "../features/room/Room"
import { http } from "../api/axios"
import { resetInfo } from "../features/room/exerciseReducer"
import AlertModal from "../features/room/AlertModal"

export default function RoomPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isExercising, setExercising] = useState(true)
  const [alreadyIn, setAlreadyIn] = useState(false)
  const {
    memberId: id,
    memberNickname: nickname,
    memberRepIcon: icon,
  } = useSelector((state) => state.member)

  const roomTitle = useSelector((state) => state.exercise.roomTitle)

  const { teamId } = useParams()

  useEffect(() => {
    async function roomStatus() {
      const {
        data: { data },
      } = await http.get(`room/${teamId}`)
      if (data.status === "EXERCISING") {
        alert("이미 운동이 시작된 방입니다. ")
        moveToGroupPage()
      } else {
        dispatch(resetInfo())
        setExercising(false)
      }
    }
    roomStatus()
  }, [teamId])

  const moveToGroupPage = () => {
    navigate(`/group/${teamId}`)
  }

  return (
    <>
      {isExercising ? (
        <div>
          <AlertModal
            type={"error"}
            title={"운동이 진행중입니다. "}
            message={["운동이 시작되면 중도 참여가 불가합니다🥲"]}
            groupId={teamId}
          />
        </div>
      ) : (
        <div className="bg-gradient-to-r from-lgBlue-500 to-primary-600 p-4 h-screen w-screen">
          <Room
            user={nickname}
            icon={icon}
            sessionName={teamId}
            roomTitle={roomTitle}
            goBack={moveToGroupPage}
          />
        </div>
      )}
    </>
  )
}
