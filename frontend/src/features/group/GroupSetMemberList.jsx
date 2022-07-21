import React from "react"
import ImageIcon from "../../components/icon/ImageIcon"

const members = [
  {
    name: "신슬기",
    date: "2022.05.10",
    isLeader: true,
    keyNumber: 1,
  },
  {
    name: "김준우",
    date: "2022.06.01",
    isLeader: false,
    keyNumber: 2,
  },
  {
    name: "박종민",
    date: "2022.06.16",
    isLeader: false,
    keyNumber: 3,
  },
  {
    name: "안지영",
    date: "2022.06.11",
    isLeader: false,
    keyNumber: 4,
  },
  {
    name: "채송지",
    date: "2022.07.14",
    isLeader: false,
    keyNumber: 5,
  },
  {
    name: "황승주",
    date: "2022.06.15",
    isLeader: false,
    keyNumber: 6,
  },
]

export default function GroupSetMemberList() {
  return (
    <div>
      <h1>회원 명단</h1>
      {members.map(({ name, date, keyNumber, isLeader }) => {
        return (
          <div key={keyNumber} className="flex">
            <ImageIcon
              image="https://img1.daumcdn.net/thumb/S180x180/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fsports%2Fplayer%2F300%2F14%2F111505.jpg&scode=default_face_profile_big_p"
              size="small"
            />
            <p className="mx-1">{name}</p>
            <p className="mx-1">({date} 가입)</p>
            {isLeader ? <p>👑</p> : null}
          </div>
        )
      })}
    </div>
  )
}
