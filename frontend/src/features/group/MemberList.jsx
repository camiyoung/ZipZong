import React from "react"
import NameSquare from "../../components/nameSquare/NameSquare"
import ImageIcon from "../../components/icon/ImageIcon"
import PlusIcon from "../../components/icon/PlusIcon"

// 동물 사진들
import bee from "../../assets/animalIcon/bee.png"
import elephant from "../../assets/animalIcon/elephant.png"
import antelope from "../../assets/animalIcon/antelope.png"
import ferret from "../../assets/animalIcon/ferret.png"
import frog from "../../assets/animalIcon/frog.png"
import pandaBear from "../../assets/animalIcon/panda-bear.png"
import pig from "../../assets/animalIcon/pig.png"
import rabbit from "../../assets/animalIcon/rabbit.png"
import walrus from "../../assets/animalIcon/walrus.png"
import yak from "../../assets/animalIcon/yak.png"

const Members = [
  {
    memberName: "신슬기",
    Icon: bee,
    hasDone: true,
  },
  {
    memberName: "김준우",
    Icon: elephant,
    hasDone: true,
  },
  {
    memberName: "박종민",
    Icon: antelope,
    hasDone: true,
  },
  {
    memberName: "안지영",
    Icon: ferret,
    hasDone: false,
  },
  {
    memberName: "채송지",
    Icon: rabbit,
    hasDone: false,
  },
  {
    memberName: "황승주",
    Icon: pandaBear,
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
            borderColor="none"
          >
            <ImageIcon
              image={Icon}
              size="middle"
              shape="round"
              className="m-4"
            />
          </NameSquare>
        )
      })}

      <NameSquare text="다른 멤버를 초대해보세요!">
        <PlusIcon />
      </NameSquare>
    </div>
  )
}
