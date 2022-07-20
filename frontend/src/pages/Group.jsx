import React from "react"
import GroupInfo from "../features/group/GroupInfo"
import MemberList from "../features/group/MemberList"
import Line from "../components/Line"
import ExerciseInfo from "../features/group/ExerciseInfo"
import GroupExerciseInfo from "../features/group/GroupExerciseInfo"
export default function Group() {
  return (
    <div>
      <div className="flex justify-center">
        <GroupInfo
          groupname="집에서 운동중"
          groupleader="신슬기"
          groupPeopleNumber="4"
          groupExplanation="집에서 운동 안 하는 사람들끼리 집에서 운동하는 웹 만들기로 함 ㅋㅋ 07. 15는 다 같이 휴식하는 날"
        />
      </div>
      <div className="flex justify-center flex-col items-center mt-20">
        <div className="prose prose-slate text-center">
          <h4>멤버 리스트</h4>
          <Line />
        </div>
        <MemberList />
      </div>

      <div className="flex justify-center flex-col items-center mt-20">
        <div className="prose prose-slate text-center">
          <h4>운동 정보</h4>
          <Line />
        </div>
        <ExerciseInfo />
      </div>

      <div className="flex justify-center flex-col items-center mt-20">
        <div className="prose prose-slate text-center">
          <h4>그룹 운동 정보</h4>
          <Line />
        </div>
        <GroupExerciseInfo />
      </div>
    </div>
  )
}
