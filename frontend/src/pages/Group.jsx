import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { teamInfo } from "../features/group/groupReducer"
import GroupInfo from "../features/group/GroupInfo"
import MemberList from "../features/group/MemberList"
import Line from "../components/Line"
import ExerciseInfo from "../features/group/ExerciseInfo"
import GroupExerciseInfo from "../features/group/GroupExerciseInfo"
export default function Group() {
  const dispatch = useDispatch()
  const teamName = useSelector((state) => state.group)
  console.log(teamName)
  const teamId = 1
  useEffect(() => {
    // dispatch(teamInfo(teamId))
  }, [])
  return (
    <div className="w-[60%] mx-auto">
      <div className="flex">
        <GroupInfo
          groupname="집에서 운동중"
          groupleader="신슬기"
          groupPeopleNumber="4"
          groupExplanation="집에서 운동 안 하는 사람들끼리 집에서 운동하는 웹 만들기로 함 ㅋㅋ 07. 15는 다 같이 휴식하는 날"
        />
      </div>
      <div className="flex justify-center flex-col items-center mt-20">
        <div className="text-center">
          <p className="text-lg">멤버 리스트</p>
          <Line />
        </div>
        <MemberList />
      </div>

      <div className="flex justify-center flex-col items-center mt-20">
        <div className="text-center">
          <p className="text-lg">운동 정보</p>
          <Line />
        </div>
        <ExerciseInfo />
      </div>

      <div className="flex justify-center flex-col items-center mt-20">
        <div className="text-center">
          <p className="text-lg">그룹 운동 정보</p>
          <Line />
        </div>
        <GroupExerciseInfo />
      </div>
    </div>
  )
}
