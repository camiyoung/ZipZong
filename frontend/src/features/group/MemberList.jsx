import React from "react"
import NameSquare from "../../components/nameSquare/NameSquare"
import ImageIcon from "../../components/icon/ImageIcon"
import PlusIcon from "../../components/icon/PlusIcon"

const Members = [
  {
    memberName: "신슬기",
    Icon: "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    hasDone: true,
  },
  {
    memberName: "김준우",
    Icon: "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    hasDone: true,
  },
  {
    memberName: "박종민",
    Icon: "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    hasDone: true,
  },
  {
    memberName: "안지영",
    Icon: "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    hasDone: false,
  },
  {
    memberName: "채송지",
    Icon: "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    hasDone: false,
  },
  {
    memberName: "황승주",
    Icon: "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    hasDone: true,
  },
]

export default function MemberList() {
  // group 원들의 정보를 받아야 함
  return (
    <div className="flex mt-10">
      {Members.map(({ memberName, Icon, hasDone }) => {
        return (
          <NameSquare
            key={memberName}
            // 운동을 한 사람들만 초록색, 나머지는 빨간색
            color={hasDone ? "green" : "red"}
            size="normal"
            text={memberName}
          >
            <ImageIcon image={Icon} size="small" />
          </NameSquare>
        )
      })}

      <NameSquare text="다른 멤버를 초대해보세요!">
        <PlusIcon />
      </NameSquare>
    </div>
  )
}
