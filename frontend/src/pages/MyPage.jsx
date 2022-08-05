import React, { useEffect } from "react"
import Profile from "../features/myPage/Profile"
import { useSelector, useDispatch } from "react-redux"
import PersonalExerciseInfo from "../features/myPage/PersonalExerciseInfo"
import GroupList from "../features/myPage/GroupList"
import { memberInfo } from "../features/login/memberReducer"
import { teamJoin } from "../features/group/groupReducer"
export default function MyPage() {
  const dispatch = useDispatch()
  const { inviteTeamId } = useSelector((state) => state.group)
  const { memberId } = useSelector((state) => state.member)
  useEffect(() => {
    const checkInviteTeamId = localStorage.getItem("inviteTeamId")
    if (checkInviteTeamId) {
      console.log("이건 팀 아이디", checkInviteTeamId)
      console.log("멤버 아이디", memberId)
      dispatch(teamJoin({ teamId: checkInviteTeamId, memberId: memberId }))
    }
    return () => {
      localStorage.removeItem("inviteTeamId")
    }
  }, [])
  const memberNickname = useSelector((state) => state.member.memberNickname)
  return (
    <div className="">
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
