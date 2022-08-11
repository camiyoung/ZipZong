import React from "react"
import { useSelector } from "react-redux"
import Room from "../features/room/Room"

export default function RoomPage() {
  const {
    memberId: id,
    memberNickname: nickname,
    memberRepIcon: icon,
  } = useSelector((state) => state.member)
  return (
    <div className="bg-gradient-to-r from-lgBlue-500 to-primary-600 p-4 h-screen w-screen">
      <Room user={nickname} icon={icon} />
    </div>
  )
}
