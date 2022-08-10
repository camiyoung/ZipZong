import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import ImageIcon from "../../components/icon/ImageIcon"
import UserIcon from "../../components/icon/UserIcon"
import Modal from "../../components/modal/Modal"
import Button from "../../components/button/Button"
import { teamExpel } from "./groupReducer"

export default function GroupSetMemberList() {
  const dispatch = useDispatch()
  const location = useLocation()

  const fetchTeamId = location.pathname.split("/")[2]
  const { teamMembers, teamLeader } = useSelector((state) => state.group)
  const { memberId, memberNickname } = useSelector((state) => state.member)
  const [isExpulsionOpen, setExpulsionOpen] = useState(false)
  const [user, setUser] = useState("")
  const [selectedMemberId, setSelectedMemberId] = useState("")
  const modalClose = () => setExpulsionOpen(false)

  const GroupHover = ({
    nickname,
    createdAt,
    role,
    repIcon,
    memberId,
    idx,
  }) => {
    const [isHovering, setIsHovering] = useState(false)

    return (
      <div
        key={idx}
        className="flex mb-2 w-128"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <ImageIcon
          image={`images/badgeIcon/${repIcon}.png`}
          size="small"
          shape="round"
        />
        <p className="mx-2">{nickname}</p>
        <p className="ml-3">({createdAt} 가입)</p>
        {role === "LEADER" ? <p className="w-min">👑</p> : null}

        {/* 그룹장 위임, 강퇴 컴포넌트 */}
        <p>⚙️ </p>
        <div
          className={
            isHovering && nickname !== memberNickname ? "show" : "hidden"
          }
          alt=""
        >
          <button className="ml-5">그룹장 위임</button>
          <button
            className="ml-5"
            onClick={() => {
              setExpulsionOpen(true)
              setUser(nickname)
              setSelectedMemberId(memberId)
            }}
          >
            그룹장 강퇴
          </button>
        </div>
      </div>
    )
  }

  console.log("리더", teamLeader)
  return (
    <div className="mx-5 mt-10">
      {/* 회원 강퇴 모달 */}
      <Modal isOpen={isExpulsionOpen} modalClose={modalClose}>
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
                modalClose()
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

      <p className="text-3xl font-semibold mb-1">회원 명단</p>
      <p className="flex my-3">
        <UserIcon />
        {teamMembers.length}명 / {10}명{console.log(teamMembers)}
      </p>
      {teamMembers.map(
        ({ nickname, createdAt, role, repIcon, memberId }, idx) => {
          return (
            <GroupHover
              key={idx}
              name={nickname}
              date={createdAt}
              isLeader={role}
              imageUrl={`images/badgeIcon/${repIcon}.png`}
              memberId={memberId}
            />
          )
        }
      )}
    </div>
  )
}

// 회원 명단 클릭하였을떄 그룹장 위임 및 강퇴 메뉴가 나타나야 함! - 미구현
