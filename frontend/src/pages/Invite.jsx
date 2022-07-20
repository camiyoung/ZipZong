import Button from "../components/button/Button"
import React from "react"
import UserIcon from "../components/icon/UserIcon"

// 초대 페이지
export default function Invite() {
  // 그룹 이름을 받아와야 함
  const groupName = "집에서 운동중"
  const groupLeader = "신슬기"
  const groupExplanation =
    "집에서 운동 안 하는 사람들끼리 집에서 운동하는 웹 만들기로 함 ㅋㅋ 07. 15는 다 같이 휴식하는 날"
  let totalGroupMembers = 10
  let currentGroupMembers = 4
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="prose prose-slate text-center mt-40">
        <h1>{groupName}</h1>
        <h1>그룹에서 당신을 초대합니다.</h1>
      </div>

      <div className="mt-10">
        <div className="text-center flex justify-center">
          <p className="px-10">그룹장: {groupLeader}</p>
          <p className="flex">
            <UserIcon />
            {currentGroupMembers} / {totalGroupMembers}
          </p>
        </div>
        <p>{groupExplanation}</p>
      </div>

      <div className="flex mt-5">
        <Button text="수락" bgColor="bg-info" />
        <Button text="거절" bgColor="bg-danger" />
      </div>
    </div>
  )
}
