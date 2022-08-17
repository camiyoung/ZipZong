import React, { useEffect, useLayoutEffect, useState } from "react"
import Profile from "../features/myPage/Profile"
import { Carousel } from "flowbite-react"
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
import PersonalRank from "../features/myPage/PersonalRank"
export default function MyPage() {
  const dispatch = useDispatch()
  const { inviteTeamId, registeredTeam } = useSelector((state) => state.group)
  const member = useSelector((state) => state.member)
  const { memberId, memberNickname } = member
  // 최초 접속 시 현재 날짜 받아오기

  const [date, setDate] = useState(new Date())
  const storageNickname = localStorage.getItem("nickname")
  useEffect(() => {
    dispatch(memberInfo(storageNickname))
  }, [dispatch])

  useEffect(() => {
    if (memberId) {
      dispatch(memberExerciseHistorySumCheck(memberId))
    }

    let flag = 0
    for (let i = 0; i < registeredTeam.length; ++i) {
      if (registeredTeam[i].groupId === localStorage.getItem("inviteTeamId")) {
        flag = 1
      }
    }

    if (flag === 0) {
      // 초대메시지 코드
      const checkInviteTeamId = localStorage.getItem("inviteTeamId")
      if (checkInviteTeamId && memberId) {
        dispatch(teamJoin({ teamId: checkInviteTeamId, memberId: memberId }))
        localStorage.removeItem("inviteTeamId")
      }
    } else {
      alert("이미 가입된 팀입니다!")
    }
  }, [memberId])
  return (
    <div className="pb-10">
      <div className="flex justify-center mt-5">
        <Profile />
      </div>
      {/* <p className="flex justify-center pt-10 font-bold text-3xl">CALENDAR</p> */}
      <div className="flex justify-center pb-10 w-full  h-[30rem]">
        <div className="w-full flex justify-center ">
          <Carousel slide={false}>
            <div className="w-full  justify-center h-full flex">
              <PersonalExerciseInfo />
            </div>

            <div className="w-full justify-center h-full flex px-6">
              <PersonalRank
                memberId={memberId}
                memberNickname={memberNickname}
              />
            </div>
          </Carousel>
        </div>
      </div>

      <div className="p-2 flex justify-center">
        <GroupList />
      </div>
    </div>
  )
}
