import React from "react"
import NameSquare from "../../components/NameSquare/NameSquare"
import Line from "../../components/Line"
import SmallIcon from "../../components/icon/SmallIcon"

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
    <div>
      <div className="prose prose-slate">
        <h4>멤버 리스트</h4>
        <Line />
      </div>
      {Members.map((memberName, Icon, hasDone) => {
        <NameSquare color="green" size="normal" text={memberName}>
          <SmallIcon image={Icon} style={{ width: "28px" }} />
        </NameSquare>
      })}
    </div>
  )
}
