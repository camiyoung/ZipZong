import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import {
  teamInfo,
  teamTotalExerciseCount,
} from "../features/group/groupReducer"
import GroupInfo from "../features/group/GroupInfo"
import MemberList from "../features/group/MemberList"
import Line from "../components/Line"
import ExerciseInfo from "../features/group/ExerciseInfo"
import GroupExerciseInfo from "../features/group/GroupExerciseInfo"

export default function Group() {
  const dispatch = useDispatch()
  const location = useLocation()
  const fetchTeamId = location.pathname.split("/")[2]
  useEffect(() => {
    console.log("최초")
    dispatch(teamInfo(fetchTeamId))
    dispatch(teamTotalExerciseCount(fetchTeamId))
  }, [fetchTeamId])

  const { inviteLink } = useSelector((state) => state.group)

  return (
    <div className="w-full flex justify-center">
      <div className="w-4/5 flex flex-col">
        <div className="flex">
          <GroupInfo />
        </div>
        <div className="flex justify-center flex-col items-center mt-20">
          <div className="text-center">
            <p className="text-lg">멤버 리스트</p>
            <Line />
          </div>
          <MemberList inviteLink={inviteLink} />
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
    </div>
  )
}
