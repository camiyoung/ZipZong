import React, { useState, useRef, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import Modal from "../../components/modal/Modal"
import NameSquare from "../../components/nameSquare/NameSquare"
import ImageIcon from "../../components/icon/ImageIcon"
import PlusIcon from "../../components/icon/PlusIcon"
import Button from "../../components/button/Button"

const Members = [
  {
    memberName: "신슬기",
    Icon: "bee",
    hasDone: true,
  },
  {
    memberName: "김준우",
    Icon: "elephant",
    hasDone: true,
  },
  {
    memberName: "박종민",
    Icon: "basic",
    hasDone: true,
  },
  {
    memberName: "안지영",
    Icon: "ferret",
    hasDone: false,
  },
  {
    memberName: "채송지",
    Icon: "rabbit",
    hasDone: false,
  },
  {
    memberName: "황승주",
    Icon: "pandaBear",
    hasDone: true,
  },
]
export default function MemberList() {
  const { inviteLink, teamMembers } = useSelector((state) => state.group)
  const [isOpen, setOpen] = useState(false)
  const modalClose = () => setOpen(false)
  const copyLinkRef = useRef()
  const [link, setLink] = useState("")

  const copyTextUrl = () => {
    copyLinkRef.current.focus()
    copyLinkRef.current.select()

    navigator.clipboard
      .writeText(copyLinkRef.current.value)
      .then(() => alert("링크를 복사했습니다."))
  }
  return (
    // group 원들의 정보를 받아야 함
    <div className="flex mt-10 w-full flex-wrap">
      {/* 모달 영역 */}
      <Modal isOpen={isOpen} modalClose={modalClose}>
        <form>
          <p className="text-3xl font-semibold text-center mb-5">초대링크</p>
          <div className="flex justify-center items-center">
            <input
              type="text"
              ref={copyLinkRef}
              value={`https://i7a805.p.ssafy.io/invite?groundId=${inviteLink}`}
              className="mr-3"
              readOnly
            />
            <Button
              onClick={() => copyTextUrl()}
              text="복사"
              width="w-20"
            ></Button>
          </div>
        </form>
      </Modal>
      {/* 모달 영역 끝 */}
      {teamMembers.map(({ nickname, repIcon, hasExercised }, idx) => {
        return (
          <div key={idx}>
            <NameSquare
              // 운동을 한 사람들만 초록색, 나머지는 빨간색
              color={hasExercised ? "green" : "red"}
              size="middle"
              text={nickname}
              borderColor="none"
              borderSize="none"
            >
              <ImageIcon
                image={`images/badgeIcon/${repIcon}.png`}
                size="middle"
                shape="round"
                className="m-4"
              />
            </NameSquare>
          </div>
        )
      })}
      <div onClick={() => setOpen(true)} className="hover:scale-125">
        <NameSquare text="멤버를 초대해보세요!" cursor="pointer">
          <PlusIcon />
        </NameSquare>
      </div>
    </div>
  )
}
