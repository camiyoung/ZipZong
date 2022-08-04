import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { teamLinkLookup } from "../features/group/groupReducer"
import Button from "../components/button/Button"
import UserIcon from "../components/icon/UserIcon"

// 초대 페이지
export default function Invite() {
  const dispatch = useDispatch()
  const location = useLocation()
  const fetchGroundId = location.search.split("=")[1]
  const { teamName, teamLeader, teamMembers, teamContent } = useSelector(
    (state) => state.group
  )

  useEffect(() => {
    dispatch(teamLinkLookup(fetchGroundId))
  }, [])
  const navigate = useNavigate()
  // 그룹 이름을 받아와야 함
  const groupLeader = "신슬기"
  const groupExplanation =
    "집에서 운동 안 하는 사람들끼리 집에서 운동하는 웹 만들기로 함 ㅋㅋ 07. 15는 다 같이 휴식하는 날"
  let totalGroupMembers = 10
  let currentGroupMembers = 4

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="prose prose-slate text-center mt-40">
        <h1>{teamName}</h1>
        <h1>그룹에서 당신을 초대합니다.</h1>
      </div>

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
          onClick={() => navigate(`/login?invitedTeamId=${fetchGroundId}`)}
          bgColor="bg-info"
        />

        {/* 초대 메시지 거절 시 이전 페이지로 이동 */}
        <Button text="거절" onClick={() => navigate(-1)} bgColor="bg-danger" />
      </div>
    </div>
  )
}
