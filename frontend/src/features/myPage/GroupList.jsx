import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { teamCreate, registrationTeam } from "./myPageReducer"
import Icon from "../../components/icon/ImageIcon"
import Card from "../../components/card/Card"
import Modal from "../../components/modal/Modal"
import UserIcon from "../../components/icon/UserIcon"
import SmallTextInput from "../../components/input/SmallTextInput"
import LargeTextInput from "../../components/input/LargeTextInput"
import { NavLink } from "react-router-dom"

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
  const dispatch = useDispatch()
  const [isOpen, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const modalClose = () => setOpen(false)
  const memberId = useSelector((state) => state.member.memberId)

  // 회원이 가입한 팀 정보
  const memberInfoTeam = useSelector((state) => state.mypage.registeredTeam)

  const [teamName, setTeamName] = useState("")
  const [teamContent, setTeamContent] = useState("")

  const teamCreateButton = () => {
    if (teamName) {
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
    } else {
      setErrorMessage("그룹 명을 한 글자 이상 작성해주세요.")
    }
  }
  useEffect(() => {
    dispatch(registrationTeam(memberId))
  }, [])

  const icon1 = "diamond"

  return (
    // 모달
    <div className="flex justify-center sm:flex-row-reverse w-full">
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

      <div className="w-4/5 flex">
        {memberInfoTeam.map(({ teamName, icon, count, groupId }, idx) => {
          return (
            <div className="flex w-1/5 h-[140px] justify-center">
              <div
                className="w-11/12 shadow-md flex justify-center items-center bg-cover rounded-3xl"
                style={{
                  backgroundImage: `url(/images/rankPage/${icon1}.png)`,
                }}
              >
                <div className="w-full h-full backdrop-blur-lg rounded-3xl">
                  <NavLink key={idx} to={`/group/${groupId}`}>
                    <div className="flex justify-center items-center w-full h-full">
                      <div className="flex w-4/5">
                        <Icon
                          image={`/images/rankPage/${icon1}.png`}
                          size="large"
                          shape="round"
                        />
                        <div className="flex flex-col justify-center pl-3">
                          <div className="font-bold text-xl pb-1">
                            {teamName}
                          </div>
                          <div className="flex">
                            <UserIcon />
                            <span className="pl-1 text-sm">{count} / 10</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                </div>
              </div>
            </div>
          )
        })}
        <div
          onClick={() => setOpen(true)}
          className="flex w-1/5 justify-center"
        >
          <div className="w-11/12 shadow-md flex justify-center items-center rounded-3xl">
            <div className="flex justify-center items-center w-full h-full  bg-white rounded-3xl">
              <div className="flex w-4/5 ">
                <Icon
                  image="https://icons-for-free.com/download-icon-circle+more+plus+icon-1320183136549593898_512.png"
                  size="large"
                  borderStyle="none"
                />
                <div className="flex flex-col justify-center pl-3">
                  <span className="pl-1 text-md">그룹을</span>
                  <span className="pl-1 text-md">만들어보세요.</span>
                </div>
              </div>
              {/* <div className="flex justify-center p-3">
                <Icon
                  image="https://icons-for-free.com/download-icon-circle+more+plus+icon-1320183136549593898_512.png"
                  size="large"
                />
              </div>
              <p className="p-4 font-bold flex justify-center text-lg">
                그룹을 추가해보세요.
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
