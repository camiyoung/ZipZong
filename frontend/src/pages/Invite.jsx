import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import {
  teamJoin,
  teamLinkLookup,
  registrationTeam,
} from "../features/group/groupReducer"
// import Button from "../components/button/Button"
import { Button } from "flowbite-react"
import UserIcon from "../components/icon/UserIcon"
import "../components/button/PositiveBtn.css"
import "../components/button/NegativeBtn.css"

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
    if (inviteTeamId) {
      dispatch(
        teamLinkLookup({ inviteLink: fetchGroundId, teamId: inviteTeamId })
      )
    }
    if (memberId) {
      dispatch(registrationTeam(memberId))
    }
  }, [])
  const navigate = useNavigate()

  return (
    <div className="w-full h-full flex justify-center flex-col items-center">
      <div
        className="bg-white w-[50%] rounded-3xl bg-gradient-to-t mt-[7%]"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          backgroundImage: `url("/images/inviteIcon/invitation.png")`,
          backgroundSize: "100px",
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      >
        <p className="text-center font-semibold text-[50px] mt-[5rem]">
          {teamName}
        </p>
        <p className="text-center text-[24px]">그룹에서 당신을 초대합니다.</p>

        <div className="mt-[150px] flex flex-col justify-center items-center">
          <div className="text-center flex justify-center items-center">
            {teamLeader ? (
              <p className="px-10 text-md">그룹장: {teamLeader.nickname}</p>
            ) : null}

            <div className="flex">
              <UserIcon />
              <p className="ml-2">
                {teamMembers.length} / {10} 명
              </p>
            </div>
          </div>
          <div className="border-2 w-[300px] border-black my-5"></div>
          <p className="text-center">{teamContent}</p>
        </div>

        <div className="flex mt-[40px] justify-evenly mb-[30px]">
          <button
            className="positive-btn"
            role="button"
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
          >
            수락
          </button>

          {/* 초대 메시지 거절 시 이전 페이지로 이동 */}
          <button
            className="negative-btn"
            role="button"
            onClick={() => navigate(-1)}
          >
            거절
          </button>
        </div>
      </div>
    </div>
  )
}
