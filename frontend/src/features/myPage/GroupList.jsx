import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { teamCreate } from "../group/groupReducer"
import { registrationTeam } from "./myPageReducer"
import Icon from "../../components/icon/ImageIcon"
import Card from "../../components/card/Card"
import Modal from "../../components/modal/Modal"
import UserIcon from "../../components/icon/UserIcon"
import SmallTextInput from "../../components/input/SmallTextInput"
import LargeTextInput from "../../components/input/LargeTextInput"
import { NavLink } from "react-router-dom"
import { TeamNameValidation } from "../../utils/TeamNameValidation"

export default function Group() {
  const dispatch = useDispatch()
  const [isOpen, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const modalClose = () => setOpen(false)
  const memberId = useSelector((state) => state.member.memberId)

  // 회원이 가입한 팀 정보
  const { registeredTeam } = useSelector((state) => state.group)

  const [teamName, setTeamName] = useState("")
  const [teamContent, setTeamContent] = useState("")

  // 그룹 생성하는 코드
  const teamCreateButton = () => {
    console.log(3)
    if (teamName) {
      // 팀 명 중복체크
      TeamNameValidation(teamName).then(async (res) => {
        if (res.data.data === "NON-DUPLICATE") {
          dispatch(
            teamCreate({
              name: teamName,
              content: teamContent,
              repIcon: "basic",
              memberId: memberId,
            })
          )
          modalClose()
          setErrorMessage("")
        } else if (res.data.data === "DUPLICATE") {
          setErrorMessage("중복된 그룹명입니다.")
        }
      })
    } else {
      setErrorMessage("그룹명을 한 글자 이상 작성해주세요.")
    }
  }

  // 그룹 생성시 재랜더링 하는 코드

  const icon1 = "sea.jpg"

  return (
    // 모달
    <div className="w-4/5">
      <Modal isOpen={isOpen} modalClose={modalClose}>
        <div className="text-xl flex justify-center pb-5 font-bold">
          그룹 생성
        </div>
        <div className="flex flex-col">
          <div>
            <div className="pb-1">그룹 명</div>
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
                maxLength="8"
                onChange={(e) => {
                  setTeamName(e.target.value)
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
                  setTeamContent(e.target.value)
                }}
              />
            </div>
          </div>
        </div>
        <div className="pb-3 flex mt-3">
          <div className="flex w-[322px] text-sm items-center text-red-600">
            {errorMessage}
          </div>
          <div className="r-0">
            <button
              onClick={teamCreateButton}
              type="button"
              className="bg-lightBlue rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-gray-700 hover:bg-primary-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              그룹 생성
            </button>
          </div>
        </div>
      </Modal>

      <span className="flex justify-center mb-5 font-bold text-3xl p-2">
        GROUP
      </span>
      <div className="flex">
        {registeredTeam.map(({ teamName, icon, count, groupId }, idx) => {
          return (
            <div
              className="hover:scale-110 flex w-1/5 h-[270px] justify-center"
              key={idx}
            >
              <div
                className="w-11/12 shadow-md flex justify-center items-center bg-cover rounded-3xl"
                style={{
                  backgroundImage: `url(/images/badgeIcon/${icon}.png)`,
                }}
              >
                <div className="w-full h-full backdrop-blur-xl rounded-3xl flex flex-col items-center">
                  <div className="flex items-center justify-center w-full h-full">
                    <NavLink to={`/group/${groupId}`}>
                      <Icon
                        image={`/images/badgeIcon/${icon}.png`}
                        size="xLarge2"
                        shape="round"
                      />
                      <div className="flex flex-col justify-center">
                        <div className="font-bold text-xl pt-3 pb-1 flex justify-center">
                          {teamName}
                        </div>
                        <div className="flex justify-center">
                          <UserIcon />
                          <span className="pl-1 text-sm">{count} / 10</span>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        {registeredTeam.length < 5 ? (
          <div
            onClick={() => setOpen(true)}
            className="flex w-1/5 justify-center"
          >
            <div className="hover:scale-110 border w-11/12 shadow-lg flex justify-center items-center rounded-3xl cursor-pointer bg-white/20 hover:bg-white/40">
              <div className="flex justify-center items-center w-full rounded-3xl h-[270px]">
                <div className="flex flex-col jusitfy-center items-center">
                  <img
                    src="/images/plus.png"
                    alt="플러스 아이콘"
                    className="w-[8.5rem] border-4 border-black rounded-full p-4"
                  />
                  <div className="flex flex-col justify-center pt-5">
                    <span className="pl-1 text-md text-center">그룹을</span>
                    <span className="pl-1 text-md text-center">
                      만들어보세요.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
