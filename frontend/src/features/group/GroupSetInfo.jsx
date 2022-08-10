import React, { useState } from "react"
import Button from "../../components/button/Button"
import ImageIcon from "../../components/icon/ImageIcon"
import Modal from "../../components/modal/Modal"
import { useSelector } from "react-redux"

export default function GroupSetInfo() {
  const { teamName, teamContent, teamRepIcons } = useSelector(
    (state) => state.group
  )

  const [isOpen, setOpen] = useState(false)
  const modalClose = () => setOpen(false)

  return (
    <div className="mx-5">
      {/* 모달 영역 */}
      <Modal isOpen={isOpen} modalClose={modalClose}>
        <div className="text-xl flex justify-center pb-5 font-bold">
          그룹 프로필 수정
        </div>
        <div className="flex flex-col">
          <div>
            <div className="pb-1">그룹 이름</div>
            <div className="w-full">
              <input
                type="text"
                className="w-full 
                    mb-3
                      h-9
                      block
                      bg-gray-50
                      rounded-lg
                      text-sm
                      border
                      border-gray-300
                      focus:ring-primary-400
                      focus:border-primary-400
                    "
                onChange={(e) => {
                  // 여기에 그룹 이름 변하는거 넣어주세요
                }}
              />
            </div>
            <div className="pb-1">그룹 설명</div>
            <div className="w-full">
              <textarea
                className="w-full 
                    mb-3
                      h-20
                      block
                      bg-gray-50
                      rounded-lg
                      text-sm
                      border
                      border-gray-300
                      focus:ring-primary-400
                      focus:border-primary-400
                    "
                onChange={(e) => {
                  // 여기에 그룹 설명 변하는거 넣어주세요
                }}
              />
            </div>
          </div>
        </div>
        <div className="pb-3 flex justify-end mt-3">
          <div className="r-0">
            <button
              // onClick= 여기가 제출
              type="button"
              className="bg-lightBlue rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-gray-700 hover:bg-primary-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              그룹 프로필 수정
            </button>
          </div>
        </div>
      </Modal>
      {/* 모달 영역 끝 */}

      <p className="text-3xl font-semibold mt-5 mb-5">
        <span className="text-md text-">🤸‍♂️</span>그룹 프로필
      </p>
      <div className="flex items-center rounded-3xl bg-gradient-to-r from-white to-lgBlue-200 py-8 px-5 custom-border">
        <div className="w-1/5 flex justify-center items-center">
          <ImageIcon
            size="large"
            image={`images/badgeIcon/${teamRepIcons}.png`}
            shape="round"
          />
        </div>
        <div className="w-4/5">
          <div className="flex mb-2">
            <p className="text-3xl font-semibold mr-5">{teamName}</p>
            <Button
              onClick={() => setOpen(true)}
              text="그룹 프로필 변경"
              height="h-9"
              width=""
            />
          </div>
          <div>
            <p className="w-96"> {teamContent} </p>
          </div>
        </div>
      </div>
    </div>
  )
}
