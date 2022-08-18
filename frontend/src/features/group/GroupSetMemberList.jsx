import "./GroupSetMemberList.css"

import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import ImageIcon from "../../components/icon/ImageIcon"
import UserIcon from "../../components/icon/UserIcon"
import Modal from "../../components/modal/Modal"
import Button from "../../components/button/Button"
import { teamExpel, teamAssign, teamInfo } from "./groupReducer"
import "../../components/button/PositiveBtn.css"
import "../../components/button/NegativeBtn.css"

export default function GroupSetMemberList() {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const fetchTeamId = location.pathname.split("/")[2]
  const { teamMembers, teamLeader } = useSelector((state) => state.group)
  const { memberId } = useSelector((state) => state.member)
  const [user, setUser] = useState()
  const [otherMemberId, setOtherMemberId] = useState("")

  const [isExpulsionOpen, setExpulsionOpen] = useState(false)
  const modalExpulsionClose = () => setExpulsionOpen(false)
  const [isMandateOpen, setMandateOpen] = useState(false)
  const modalMandateClose = () => setMandateOpen(false)

  useEffect(() => {}, [])

  const GroupHover = ({
    nickname,
    date,
    isLeader,
    imageUrl,
    idx,
    selectedMemberId,
  }) => {
    return (
      <div key={idx} className="flex mb-4">
        <div className="flex text-sm p-4 rounded-tr-full rounded-br-full container w-[55%] min-w-[400px] shadow-md bg-white border-[#4abaee88] border-l-[20px]">
          <div className="flex image items-center px-2">
            <ImageIcon image={imageUrl} size="smmiddle" shape="round" />
            <span className="ml-3">{nickname}</span>
            <span className="mx-2">
              ({date[0]}년 {date[1]}월 {date[2]}일 가입)
            </span>
            {isLeader === "LEADER" ? <span>👑</span> : null}
            {isLeader === "LEADER" ? null : (
              <div className="overlay rounded-tr-full rounded-br-full w-full">
                <div className="text">
                  <button
                    className="textBtn hover:bg-mainBlue  px-3 py-1 rounded-xl text-white shadow-sm"
                    onClick={() => {
                      setMandateOpen(true)
                      setUser(nickname)
                      setOtherMemberId(selectedMemberId)
                    }}
                  >
                    그룹장 위임
                  </button>
                  <button
                    className="textBtn hover:bg-mainBlue px-3 py-1 ml-3 rounded-xl text-white shadow-sm"
                    onClick={() => {
                      setExpulsionOpen(true)
                      setUser(nickname)
                      setOtherMemberId(selectedMemberId)
                    }}
                  >
                    그룹원 강퇴
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ml-10 mt-5">
      {/* 회원 강퇴 모달 */}
      <Modal isOpen={isExpulsionOpen} modalClose={modalExpulsionClose}>
        <div className="mt-3 mb-3">
          <div className="flex justify-center mb-1">
            {user} 회원님을 정말 그룹에서 탈퇴 시키시겠습니까?
          </div>
          <div className="mb-3 text-red-600 text-sm flex justify-center">
            탈퇴된 회원의 누적 운동 정보는 사라지지 않습니다.
          </div>
          <div className="flex justify-center pt-3">
            <button
              className="negative-btn mr-10"
              role="button"
              // 회원 강퇴 로직
              onClick={() => {
                if (parseInt(memberId) === teamLeader.memberId) {
                  dispatch(
                    teamExpel({
                      leaderId: teamLeader.memberId,
                      followerId: otherMemberId,
                      teamId: fetchTeamId,
                    })
                  )
                  dispatch(teamInfo(fetchTeamId))

                  // 강퇴하면 아예 새로고침하는 코드
                  window.location.replace(`/groupset/${fetchTeamId}`)
                } else {
                  alert("그룹장만 회원을 강퇴할 수 있습니다!")
                  modalExpulsionClose()
                }
              }}
            >
              예
            </button>
            <button
              className="positive-btn"
              role="button"
              onClick={() => setExpulsionOpen(false)}
            >
              아니오
            </button>
          </div>
        </div>
      </Modal>

      {/* 그룹장 위임 모달 */}
      <Modal isOpen={isMandateOpen} modalClose={modalMandateClose}>
        <div className="mt-3 mb-3">
          <div className="flex justify-center mb-1">
            {user} 회원님께 그룹장 직위를 넘기시겠습니까?
          </div>
          <div className="mb-3 text-gray-600 text-sm flex justify-center">
            위임 후 즉시 그룹 페이지로 이동됩니다.
          </div>
          <div className="flex justify-center pt-3">
            <button
              className="negative-btn mr-10"
              role="button"
              onClick={() => {
                if (parseInt(memberId) === teamLeader.memberId) {
                  dispatch(
                    teamAssign({
                      leaderId: teamLeader.memberId,
                      followerId: otherMemberId,
                      teamId: fetchTeamId,
                    })
                  )
                  navigate(`/group/${fetchTeamId}`)
                } else {
                  alert("그룹장만 위임 권한이 있습니다!")
                  modalMandateClose()
                }
              }}
            >
              예
            </button>
            <button
              className="positive-btn"
              role="button"
              onClick={() => setMandateOpen(false)}
            >
              아니오
            </button>
            <div></div>
          </div>
        </div>
      </Modal>
      {/* 그룹장 위임 모달 끝 */}

      <div className="flex items-center mb-6">
        <p className="text-3xl font-semibold">
          <span className="text-md mr-1">📝</span>회원 명단
        </p>
        <p className="flex items-center ml-3">
          <UserIcon />
          <span className="ml-1">
            {teamMembers.length}명 / {10}명
          </span>
          <span className="ml-4 text-gray-500">
            그룹장 위임, 멤버 강퇴가 가능합니다.
          </span>
        </p>
      </div>
      {teamMembers &&
        teamMembers.map(
          ({ nickname, createdAt, role, repIcon, memberId }, idx) => {
            return (
              <GroupHover
                key={idx}
                nickname={nickname}
                date={createdAt}
                isLeader={role}
                imageUrl={`/images/badgeIcon/${repIcon}.png`}
                selectedMemberId={memberId}
              />
            )
          }
        )}
    </div>
  )
}
