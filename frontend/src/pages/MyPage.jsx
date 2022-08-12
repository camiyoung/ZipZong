import React, { useEffect, useLayoutEffect, useState } from "react"
import Profile from "../features/myPage/Profile"
import { useSelector, useDispatch } from "react-redux"
import PersonalExerciseInfo from "../features/myPage/PersonalExerciseInfo"
import GroupList from "../features/myPage/GroupList"
import { memberInfo } from "../features/login/memberReducer"
import {
  memberExerciseHistoryCheck,
  memberIconListReview,
  memberExerciseHistorySumCheck,
} from "../features/myPage/myPageReducer"
import { teamJoin } from "../features/group/groupReducer"
export default function MyPage() {
  const dispatch = useDispatch()
  const { inviteTeamId, registeredTeam } = useSelector((state) => state.group)
  const member = useSelector((state) => state.member)
  const { memberId } = member
  // 최초 접속 시 현재 날짜 받아오기

  const [date, setDate] = useState(new Date())
  const storageNickname = localStorage.getItem("nickname")
  useEffect(() => {
    dispatch(memberInfo(storageNickname))
  }, [dispatch])

  useEffect(() => {
    dispatch(memberExerciseHistorySumCheck(memberId))

    let flag = 0
    for (let i = 0; i < registeredTeam.length; ++i) {
      if (registeredTeam[i].groupId === localStorage.getItem("inviteTeamId")) {
        flag = 1
      }
    }

    if (flag === 0) {
      // 초대메시지 코드
      const checkInviteTeamId = localStorage.getItem("inviteTeamId")
      if (checkInviteTeamId) {
        dispatch(teamJoin({ teamId: checkInviteTeamId, memberId: memberId }))
        localStorage.removeItem("inviteTeamId")
      }
    } else {
      alert("이미 가입된 팀입니다!")
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
