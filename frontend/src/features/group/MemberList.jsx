import React, { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Modal from "../../components/modal/Modal"
import ImageIcon from "../../components/icon/ImageIcon"
import Button from "../../components/button/Button"

export default function MemberList() {
  const { inviteLink, teamMembers, teamCurrentStreak } = useSelector(
    (state) => state.group
  )
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
    <div className="mt-10 w-4/5">
      {/* 모달 영역 */}
      <Modal isOpen={isOpen} modalClose={modalClose}>
        <form className="py-3 pb-5">
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
      <div className="flex w-full flex-wrap">
        {teamMembers.map(
          ({ nickname, repIcon, hasExercised, memberId }, idx) => {
            return (
              <div className="w-[10%] px-2" key={idx}>
                <div
                  className={
                    hasExercised
                      ? "w-full h-full flex flex-col items-center rounded-3xl shadow-md py-8 bg-gradient-to-b from-teal-50 to-teal-200 border-2 border-white "
                      : "w-full h-full flex flex-col items-center rounded-3xl shadow-md py-8 border-2 border-gray-100 bg-gradient-to-b from-white to-gray-100"
                  }
                >
                  <div className="flex justify-center mb-2">
                    {" "}
                    <ImageIcon
                      image={`/images/badgeIcon/${repIcon}.png`}
                      size="large"
                      shape="round"
                      borderStyle="none"
                    />
                  </div>
                  <div className="text-sm font-medium flex justify-center px-5 h-[50px] items-center">
                    {nickname}
                  </div>
                </div>
              </div>
            )
          }
        )}
        {teamMembers.length < 10 ? (
          <div
            onClick={() => setOpen(true)}
            className="hover:scale-110 cursor-pointer w-[10%] px-2"
          >
            <div
              className={
                "w-full h-full flex flex-col items-center rounded-3xl shadow-md py-8 border-2 border-gray-100"
              }
            >
              <div className="flex justify-center mb-2">
                <ImageIcon
                  image="http://cdn.onlinewebfonts.com/svg/img_356964.png"
                  size="large"
                  borderStyle="none"
                />
              </div>
              <div className="text-sm font-medium flex justify-center px-5 h-[50px] items-center">
                멤버 초대
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
