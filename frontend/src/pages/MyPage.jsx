import React, { useEffect, useLayoutEffect, useState } from "react"
import Profile from "../features/myPage/Profile"
import { useSelector, useDispatch } from "react-redux"
import PersonalExerciseInfo from "../features/myPage/PersonalExerciseInfo"
import GroupList from "../features/myPage/GroupList"
import { memberInfo } from "../features/login/memberReducer"
import { memberExerciseHistoryCheck } from "../features/myPage/myPageReducer"
import { teamJoin } from "../features/group/groupReducer"
export default function MyPage() {
  const dispatch = useDispatch()
  const { inviteTeamId } = useSelector((state) => state.group)
  const { memberId } = useSelector((state) => state.member)
  // 최초 접속 시 현재 날짜 받아오기
  const [date, setDate] = useState(new Date())
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  useEffect(() => {
    // 초대메시지 코드
    const checkInviteTeamId = localStorage.getItem("inviteTeamId")
    if (checkInviteTeamId) {
      dispatch(teamJoin({ teamId: checkInviteTeamId, memberId: memberId }))
      return () => {
        localStorage.removeItem("inviteTeamId")
      }
    }
  }, [])
  return (
    <div className="pb-10">
      <div className="flex justify-center mt-5">
        <Profile />
      </div>
      {/* <p className="flex justify-center pt-10 font-bold text-3xl">CALENDAR</p> */}
      <div className="flex justify-center pb-10">
        <PersonalExerciseInfo />
      </div>
      <div className="p-5 flex justify-center">
        <GroupList />
      </div>
    </div>
  )
}
