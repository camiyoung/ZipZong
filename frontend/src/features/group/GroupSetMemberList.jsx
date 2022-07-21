import React, { useState } from "react"
import ImageIcon from "../../components/icon/ImageIcon"
import UserIcon from "../../components/icon/UserIcon"

const members = [
  {
    name: "신슬기",
    date: "2022.05.10",
    imageUrl:
      "https://img1.daumcdn.net/thumb/S180x180/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fsports%2Fplayer%2F300%2F14%2F111505.jpg&scode=default_face_profile_big_p",
    isLeader: true,
    keyNumber: 1,
  },
  {
    name: "김준우",
    date: "2022.06.01",
    imageUrl:
      "https://img1.daumcdn.net/thumb/S180x180/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fsports%2Fplayer%2F300%2F14%2F111505.jpg&scode=default_face_profile_big_p",
    isLeader: false,
    keyNumber: 2,
  },
  {
    name: "박종민",
    date: "2022.06.16",
    imageUrl:
      "https://img1.daumcdn.net/thumb/S180x180/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fsports%2Fplayer%2F300%2F14%2F111505.jpg&scode=default_face_profile_big_p",
    isLeader: false,
    keyNumber: 3,
  },
  {
    name: "안지영",
    date: "2022.06.11",
    imageUrl:
      "https://img1.daumcdn.net/thumb/S180x180/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fsports%2Fplayer%2F300%2F14%2F111505.jpg&scode=default_face_profile_big_p",
    isLeader: false,
    keyNumber: 4,
  },
  {
    name: "채송지",
    date: "2022.07.14",
    imageUrl:
      "https://img1.daumcdn.net/thumb/S180x180/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fsports%2Fplayer%2F300%2F14%2F111505.jpg&scode=default_face_profile_big_p",
    isLeader: false,
    keyNumber: 5,
  },
  {
    name: "황승주",
    date: "2022.06.15",
    imageUrl:
      "https://img1.daumcdn.net/thumb/S180x180/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fsports%2Fplayer%2F300%2F14%2F111505.jpg&scode=default_face_profile_big_p",
    isLeader: false,
    keyNumber: 6,
  },
]
export default function GroupSetMemberList() {
  const [showGroup, setShowGroup] = useState(false)

  const GroupManagement = ({ setVisible }) => {
    return (
      <div className="absolute z-10 top-[27rem] left-[20rem] border">
        <p>그룹장 위임</p>
        <p>그룹 강퇴</p>
        <button onClick={() => setVisible(false)}>닫기</button>
      </div>
    )
  }

  return (
    <div className="mx-5 mt-5">
      <p className="text-3xl font-semibold mb-1">회원 명단</p>
      <p className="flex my-3">
        <UserIcon />
        {members.length}명 / {10}명
      </p>

      {members.map(({ name, date, keyNumber, isLeader, imageUrl }) => {
        return (
          <div
            key={keyNumber}
            className="flex mb-2 w-64"
            onClick={() => setShowGroup(true)}
          >
            <ImageIcon image={imageUrl} size="small" shape="round" />
            <p className="mx-2">{name}</p>
            <p className="ml-3">({date} 가입)</p>
            {isLeader ? <p className="w-min">👑</p> : null}
          </div>
        )
      })}
      {showGroup && <GroupManagement setVisible={setShowGroup} />}
    </div>
  )
}

// 회원 명단 클릭하였을떄 그룹장 위임 및 강퇴 메뉴가 나타나야 함! - 미구현
