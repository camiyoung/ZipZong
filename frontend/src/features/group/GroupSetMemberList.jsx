import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import ImageIcon from "../../components/icon/ImageIcon"
import UserIcon from "../../components/icon/UserIcon"
import Modal from "../../components/modal/Modal"
import Button from "../../components/button/Button"

const members = [
  {
    name: "신슬기",
    date: "2022.05.10",
    imageUrl:
      "https://img1.daumcdn.net/thumb/S180x180/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fsports%2Fplayer%2F300%2F14%2F111505.jpg&scode=default_face_profile_big_p",
    isLeader: true,
  },
  {
    name: "김준우",
    date: "2022.06.01",
    imageUrl:
      "https://img1.daumcdn.net/thumb/S180x180/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fsports%2Fplayer%2F300%2F14%2F111505.jpg&scode=default_face_profile_big_p",
    isLeader: false,
  },
  {
    name: "박종민",
    date: "2022.06.16",
    imageUrl:
      "https://img1.daumcdn.net/thumb/S180x180/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fsports%2Fplayer%2F300%2F14%2F111505.jpg&scode=default_face_profile_big_p",
    isLeader: false,
  },
  {
    name: "안지영",
    date: "2022.06.11",
    imageUrl:
      "https://img1.daumcdn.net/thumb/S180x180/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fsports%2Fplayer%2F300%2F14%2F111505.jpg&scode=default_face_profile_big_p",
    isLeader: false,
  },
  {
    name: "채송지",
    date: "2022.07.14",
    imageUrl:
      "https://img1.daumcdn.net/thumb/S180x180/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fsports%2Fplayer%2F300%2F14%2F111505.jpg&scode=default_face_profile_big_p",
    isLeader: false,
  },
  {
    name: "황승주",
    date: "2022.06.15",
    imageUrl:
      "https://img1.daumcdn.net/thumb/S180x180/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fsports%2Fplayer%2F300%2F14%2F111505.jpg&scode=default_face_profile_big_p",
    isLeader: false,
  },
]
export default function GroupSetMemberList() {
  const dispatch = useDispatch()
  const location = useLocation()

  const fetchTeamId = location.pathname.split("/")[2]
  const { teamMembers, teamLeader } = useSelector((state) => state.group)
  const { memberId } = useSelector((state) => state.member)
  const [isExpulsionOpen, setExpulsionOpen] = useState(false)
  const [user, setUser] = useState()
  const modalClose = () => setExpulsionOpen(false)

  const GroupHover = ({ name, date, isLeader, imageUrl, idx }) => {
    const [isHovering, setIsHovering] = useState(false)

    return (
      <div
        key={idx}
        className="flex mb-2 "
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="bg-white p-4 flex rounded-3xl items-center">
          <ImageIcon
            image={`images/badgeIcon/${imageUrl}.png`}
            size="smmiddle"
            shape="round"
          />
          <p className="mx-3">{name}</p>
          <p className="">({date} 가입)</p>
          {isLeader ? <p className="w-min">👑</p> : null}

          {/* 그룹장 위임, 강퇴 컴포넌트 */}
          <p>⚙️ </p>
        </div>
        <div className={isHovering ? "show" : "hidden"} alt="">
          <button className="ml-5">그룹장 위임</button>
          <button
            className="ml-5"
            onClick={() => {
              setExpulsionOpen(true)
              setUser(name)
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
    <div className="mx-5 mt-5">
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
              // onClick={() =>
              //   dispatch(
              //     teamExpel({
              //       leaderId: leaderId,
              //       followerId: memberId,
              //       teamId: fetchTeamId,
              //     })
              //   )
              // }
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

      <div className="flex items-center mb-5">
        <p className="text-3xl font-semibold">회원 명단</p>
        <p className="flex items-center ml-3">
          <UserIcon />
          <span className="ml-1">
            {teamMembers.length}명 / {10}명
          </span>
        </p>
      </div>
      {members.map(({ name, date, isLeader, imageUrl }, idx) => {
        return (
          <GroupHover
            key={idx}
            name={name}
            date={date}
            isLeader={isLeader}
            imageUrl={`images/badgeIcon/${imageUrl}.png`}
          />
        )
      })}
    </div>
  )
}

// 회원 명단 클릭하였을떄 그룹장 위임 및 강퇴 메뉴가 나타나야 함! - 미구현
