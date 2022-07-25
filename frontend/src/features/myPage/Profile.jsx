import React, { useState } from "react"
import Button from "../../components/button/Button"
import ImageIcon from "../../components/icon/ImageIcon"
import Modal from "../../components/modal/Modal"
import SmallTextInput from "../../components/input/SmallTextInput"

const User = {
  Name: "신슬기",
  Profic: "https://i1.sndcdn.com/artworks-CDyMPstbky5qw7oe-NfF8Pg-t240x240.jpg",
}

export default function Profile() {
  const [isOpen, setOpen] = useState(false)
  const modalClose = () => setOpen(false)

  return (
    // 모달
    <div>
      <Modal isOpen={isOpen} modalClose={modalClose}>
        <SmallTextInput inputName="닉네임"></SmallTextInput>
        <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button type="button" className="bg-lightBlue ">
            정보 수정
          </button>
        </div>
      </Modal>

      <div className="flex items-center justify-center">
        <div className="w-[600px] h-12 bg-lightBlue border-2 m-2 rounded-3xl">
          <div div className="flex items-center justify-center h-full w-full">
            <ImageIcon image={User.Profic} size="small"></ImageIcon>
            <p className="text-sm p-2">
              <span className="font-semibold">{User.Name} </span> 님, 오늘도
              즐거운 운동 되세요!
            </p>
            <Button
              onClick={() => setOpen(true)}
              text="수정"
              height="h-12"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  )
}
