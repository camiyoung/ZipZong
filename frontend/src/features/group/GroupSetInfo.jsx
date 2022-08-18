import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import Button from "../../components/button/Button"
import ImageIcon from "../../components/icon/ImageIcon"
import Modal from "../../components/modal/Modal"
import { teamInfoModify } from "./groupReducer"
import { TeamNameValidation } from "../../utils/TeamNameValidation"

export default function GroupSetInfo() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { teamName, teamContent, teamRepIcons } = useSelector(
    (state) => state.group
  )
  const fetchTeamId = location.pathname.split("/")[2]

  // 그룹 프로필 수정
  const [groupName, setGroupName] = useState("")
  const [groupContent, setGroupContent] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  // Modal
  const [isOpen, setOpen] = useState(false)
  const modalClose = () => setOpen(false)

  useEffect(() => {
    if (teamName) setGroupName(teamName)
    if (teamContent) setGroupContent(teamContent)
  }, [teamName, teamContent])

  const onSubmit = () => {
    if (groupName) {
      TeamNameValidation(groupName).then(async (res) => {
        dispatch(
          teamInfoModify({
            teamId: fetchTeamId,
            name: groupName,
            content: groupContent,
          })
        )
        modalClose()
        setErrorMessage("")
      })
    } else {
      setErrorMessage("그룹명을 한 글자 이상 작성해주세요.")
    }
  }

  return (
    <div className="mx-5">
      {/* 모달 영역 */}
      <Modal isOpen={isOpen} modalClose={modalClose}>
        <div className="text-xl flex justify-center pb-5 font-bold">
          그룹 프로필 변경
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
                onChange={(e) => setGroupName(e.target.value)}
                maxLength="8"
                value={groupName}
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
                onChange={(e) => setGroupContent(e.target.value)}
                value={groupContent}
              />
            </div>
          </div>
        </div>
        <div className="pb-3 flex justify-end mt-3">
          <div className="flex w-[322px] text-sm items-center text-red-600">
            {errorMessage}
          </div>
          <div className="r-0">
            <button
              onClick={onSubmit}
              type="button"
              className="bg-lightBlue rounded-md border border-gray-300 shadow-sm text-base font-medium text-white hover:bg-primary-300 sm:mt-0 sm:py-2 sm:px-[0.3rem] w-[8rem] sm:text-sm"
            >
              그룹 프로필 수정
            </button>
          </div>
        </div>
      </Modal>
      {/* 모달 영역 끝 */}

      <p className="text-3xl font-semibold mt-5 mb-5">
        <span className="text-md mr-[7px]">🤸‍♂️</span>그룹 프로필
      </p>
      <div className="flex items-center rounded-3xl bg-gradient-to-r from-white to-lgBlue-200 py-8 px-5 custom-border">
        <div className="w-1/5 flex justify-center items-center">
          {teamRepIcons ? (
            <ImageIcon
              size="large"
              image={`/images/badgeIcon/${teamRepIcons}.png`}
              shape="round"
            />
          ) : null}
        </div>
        <div className="w-4/5 pl-4">
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
            <p className="pr-2"> {teamContent} </p>
          </div>
        </div>
      </div>
    </div>
  )
}
