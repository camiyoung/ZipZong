import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import {
  teamJoin,
  teamLinkLookup,
  registrationTeam,
} from "../features/group/groupReducer"
import Button from "../components/button/Button"
import UserIcon from "../components/icon/UserIcon"

// 초대 페이지
export default function Invite() {
  const dispatch = useDispatch()
  const location = useLocation()
  const fetchGroundId = location.search.split("=")[1]
  const {
    teamName,
    teamLeader,
    teamMembers,
    teamContent,
    inviteTeamId,
    registeredTeam,
  } = useSelector((state) => state.group)
  const memberId = localStorage.getItem("memberId")
  useEffect(() => {
    dispatch(teamLinkLookup(fetchGroundId))
    if (memberId) {
      dispatch(registrationTeam(memberId))
    }
  }, [])
  const navigate = useNavigate()

  return (
    <div className="w-full h-full flex justify-center flex-col items-center">
      <div className="bg-white w-[50%] h-[50%]">
        <p>{teamName}</p>
        <h1>그룹에서 당신을 초대합니다.</h1>

        <div className="mt-10">
          <div className="text-center flex justify-center">
            <p className="px-10">그룹장: {teamLeader.nickname}</p>
            <p className="flex">
              <UserIcon />
              {teamMembers.length} / {10}
            </p>
          </div>
          <p>{teamContent}</p>
        </div>

        <div className="flex mt-5">
          <Button
            text="수락"
            onClick={() => {
              // 리프레쉬 토큰이 존재하면 팀 조인 후 마이페이지로 이동
              let flag = 0
              if (localStorage.getItem("refreshToken") && memberId) {
                for (let i = 0; i < registeredTeam.legnth; ++i) {
                  if (inviteTeamId == registeredTeam[i].groupId) {
                    flag = 1
                  }
                }
                if (flag === 0) {
                  dispatch(
                    teamJoin({
                      teamId: inviteTeamId,
                      memberId: memberId,
                    })
                  )
                  navigate("/mypage")
                } else {
                  alert("팀에 이미 가입되어 있습니다.")
                }
              } else {
                localStorage.setItem("inviteTeamId", inviteTeamId)
                navigate(`/login?invitedTeamId=${inviteTeamId}`)
              }
            }}
            bgColor="bg-info"
          />

          {/* 초대 메시지 거절 시 이전 페이지로 이동 */}
          <Button
            text="거절"
            onClick={() => navigate(-1)}
            bgColor="bg-danger"
          />
        </div>
      </div>
    </div>
  )
}
