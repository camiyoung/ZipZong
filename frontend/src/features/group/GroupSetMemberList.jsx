import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import ImageIcon from "../../components/icon/ImageIcon"
import UserIcon from "../../components/icon/UserIcon"
import Modal from "../../components/modal/Modal"
import Button from "../../components/button/Button"
import { teamExpel, teamAssign } from "./groupReducer"

export default function GroupSetMemberList() {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const fetchTeamId = location.pathname.split("/")[2]
  const { teamMembers, teamLeader } = useSelector((state) => state.group)
  const { memberId, memberNickname } = useSelector((state) => state.member)
  const [user, setUser] = useState("")
  const [selectedMemberId, setSelectedMemberId] = useState("")
  const [isExpulsionOpen, setExpulsionOpen] = useState(false)
  const modalClose = () => setExpulsionOpen(false)

  const [isOpen2, setOpen2] = useState(false)
  const modalClose2 = () => setOpen2(false)

  console.log("팀 멤버들", teamMembers)

  console.log("리더", teamLeader)
  return (
    <div className="mx-5 mt-10">
      {/* 회원 강퇴 모달 */}
      <Modal isOpen={isExpulsionOpen} modalClose={modalClose}>
        <div className="flex flex-col">
          <p className="text-xl font-bold flex justify-center">
            {user} 회원에게 그룹장을 위임하시겠습니까?
          </p>
          <div className="flex justify-around mt-5">
            <Button
              height="h-7"
              width="w-32"
              text="예"
              bgColor="bg-info"
              onClick={() => {
                dispatch(
                  teamAssign({
                    leaderId: teamLeader.memberId,
                    followerId: selectedMemberId,
                    teamId: fetchTeamId,
                  })
                )
                alert("그룹장이 변경되었습니다.")
                navigate(`/group/${fetchTeamId}`)
              }}
            />
            <Button
              height="h-7"
              width="w-32"
              text="아니오"
              bgColor="bg-danger"
              onClick={() => setOpen2(false)}
            />
          </div>
        </div>
      </Modal>
      {/* 회원 강퇴 모달 끝 */}

      {/* 그룹장 위임 모달 시작 */}
      <Modal isOpen={isOpen2} modalClose={modalClose2}>
        <div className="flex flex-col">
          <p className="text-xl font-bold flex justify-center">
            {user} 회원님을 정말 탈퇴하시겠습니까?
          </p>
          <div className="flex justify-around mt-5">
            <Button
              height="h-7"
              width="w-32"
              text="예"
              bgColor="bg-info"
              onClick={() => {
                dispatch(
                  teamExpel({
                    leaderId: teamLeader.memberId,
                    followerId: selectedMemberId,
                    teamId: fetchTeamId,
                  })
                )
                alert("강퇴 완료되었습니다")
                navigate(`/group/${fetchTeamId}`)
              }}
            />
            <Button
              height="h-7"
              width="w-32"
              text="아니오"
              bgColor="bg-danger"
              onClick={() => setExpulsionOpen(false)}
            />
          </div>
        </div>
      </Modal>
      {/* 그룹장 위임 모달 끝 */}

      <p className="text-3xl font-semibold mb-1">회원 명단</p>
      <p className="flex my-3">
        <UserIcon />
        {teamMembers.length}명 / {10}명
      </p>
      {teamMembers.map(
        ({ nickname, createdAt, role, repIcon, memberId }, idx) => {
          return (
            <div key={idx} className="flex mb-2 w-128">
              <ImageIcon
                image={`images/badgeIcon/${repIcon}.png`}
                size="small"
                shape="round"
              />
              <p className="mx-2">{nickname}</p>
              <p className="ml-3">
                ({createdAt.substr(0, 4)}년 {createdAt.substr(5, 2)}월{" "}
                {createdAt.substr(8, 2)}일 가입)
              </p>
              {role === "LEADER" ? <p className="w-min">👑</p> : null}

              {/* 그룹장 위임, 강퇴 컴포넌트 */}
              <p>⚙️ </p>
              <div alt="">
                <button
                  className="ml-5"
                  onClick={() => {
                    setOpen2(true)
                    setUser(nickname)
                    setSelectedMemberId(memberId)
                  }}
                >
                  그룹장 위임
                </button>
                <button
                  className="ml-5"
                  onClick={() => {
                    setExpulsionOpen(true)
                    setUser(nickname)
                    setSelectedMemberId(memberId)
                  }}
                >
                  회원 강퇴
                </button>
              </div>
            </div>
          )
        }
      )}
    </div>
  )
}

// 회원 명단 클릭하였을떄 그룹장 위임 및 강퇴 메뉴가 나타나야 함! - 미구현
