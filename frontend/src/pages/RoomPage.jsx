import React from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router"
import Room from "../features/room/Room"

export default function RoomPage() {
  const {
    memberId: id,
    memberNickname: nickname,
    memberRepIcon: icon,
  } = useSelector((state) => state.member)

  const location = useLocation()
  const groupId = location.pathname.split("/")?.[2] ?? "test"
  // console.log(groupId)
  return (
    <div className="bg-gradient-to-r from-lgBlue-500 to-primary-600 p-4 h-screen w-screen">
      <Room user={nickname} icon={icon} sessionName={groupId} />
    </div>
  )
}
