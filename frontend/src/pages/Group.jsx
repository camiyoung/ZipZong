import React from "react"
import GroupInfo from "../features/group/GroupInfo"
import GroupManagement from "../features/group/GroupManagement"
import MemberList from "../features/group/MemberList"

export default function Group() {
  return (
    <div>
      <div className="flex">
        <GroupInfo
          groupname="집에서 운동중"
          groupleader="신슬기"
          groupPeopleNumber="4"
          groupExplanation="집에서 운동 안 하는 사람들끼리 집에서 운동하는 웹 만들기로 함 ㅋㅋ 07. 15는 다 같이 휴식하는 날"
        />
        <GroupManagement />
      </div>
      <div className="flex justify-center flex-col items-center mt-20">
        <MemberList />
      </div>
    </div>
  )
}
