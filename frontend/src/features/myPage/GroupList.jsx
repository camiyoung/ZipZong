import React, { useState } from "react"

import Icon from "../../components/icon/ImageIcon"
import Card from "../../components/card/Card"
import Modal from "../../components/modal/Modal"
import SmallTextInput from "../../components/input/SmallTextInput"
import LargeTextInput from "../../components/input/LargeTextInput"

const Groups = [
  {
    groupName: "집에서 운동중",
    icon: "https://pbs.twimg.com/profile_images/980421048498716672/LZsqP0kf_400x400.jpg",
  },
  {
    groupName: "작심삼일",
    icon: "https://t1.daumcdn.net/cfile/tistory/1906E7334F22D2583F",
  },
]

export default function Group() {
  const [isOpen, setOpen] = useState(false)
  const modalClose = () => setOpen(false)

  return (
    // 모달
    <div className="flex justify-center sm:flex-row-reverse">
      <Modal isOpen={isOpen} modalClose={modalClose}>
        <div className="text-xl flex justify-center pb-5 font-bold">
          그룹 생성
        </div>
        <div className="flex">
          <div className="pr-5">
            <div className="flex justify-center">그룹 아이콘</div>
            <div>
              <Icon size="xLarge" />
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <div className="">
                그룹 명
                <div className="w-[280px]">
                  <input
                    type="text"
                    className="
                    mb-3
                      h-9
                      w-[280px]
                      block
                      bg-gray-50
                      rounded-lg
                      text-sm
                      border
                      border-gray-300
                      focus:ring-primary-400
                      focus:border-primary-400
                    "
                  />
                </div>
              </div>
            </div>
            <div>
              그룹 설명
              <div className="w-[280px]">
                <LargeTextInput />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse mt-4">
          <button
            type="button"
            className="bg-lightBlue rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-gray-700 hover:bg-primary-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            그룹 생성
          </button>
        </div>
      </Modal>

      {Groups.map(({ groupName, icon }, idx) => {
        return (
          <div className="flex p-3" key={idx}>
            <Card size="middle">
              <div className="flex justify-center p-3">
                <Icon image={icon} size="xLarge" />
              </div>
              <p className="p-4 font-bold flex justify-center text-lg">
                {" "}
                {groupName}{" "}
              </p>
            </Card>
          </div>
        )
      })}
      <div onClick={() => setOpen(true)} className="flex p-3">
        <Card size="middle">
          <div className="flex justify-center p-3">
            <Icon
              image="https://icons-for-free.com/download-icon-circle+more+plus+icon-1320183136549593898_512.png"
              size="xLarge"
            />
          </div>
          <p className="p-4 font-bold flex justify-center text-lg">
            그룹을 추가해보세요.
          </p>
        </Card>
      </div>
    </div>
  )
}
