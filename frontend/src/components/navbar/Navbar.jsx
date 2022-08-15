import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { registrationTeam, teamInfo } from "../../features/group/groupReducer"
import Modal from "../modal/Modal"
import { NicknameValidation } from "../../utils/NicknameValidation"
import { Button } from "flowbite-react"
import {
  nicknameChange,
  memberIconSelect,
  logout,
  memberRemove,
} from "../../features/login/memberReducer"
import Card from "../card/Card"
import ImageIcon from "../icon/ImageIcon"
import Logo from "../../assets/Logo.svg"

const NavItem = ({ children }) => {
  return <li className="m-2 flex justify-center items-center">{children}</li>
}

const GroupList = ({ setVisible, groups }) => {
  return (
    <div className="absolute z-30 top-[0.8rem] right-[-2.6rem]">
      <Card size="middle">
        {groups.length > 0 ? (
          <ul>
            {groups.map(({ teamName, icon, count, groupId }, idx) => {
              return (
                <NavLink key={idx} to={`/group/${groupId}`}>
                  <li className="flex justify-between mt-2 hover:text-red-400">
                    <div className="flex">
                      <ImageIcon
                        image={`/images/badgeIcon/${icon}.png`}
                        shape="round"
                        size="small"
                      />
                      <div className="ml-2 block truncate w-[140px]">
                        {teamName}
                      </div>
                    </div>
                    <p className="text-sm ml-2">
                      {count}/10<span className="text-[4px]"> 명</span>
                    </p>
                  </li>
                </NavLink>
              )
            })}
          </ul>
        ) : (
          <p>그룹에 가입해보세요!</p>
        )}
      </Card>
    </div>
  )
}

const InfoList = ({ setVisible, memberId, showInfo }) => {
  const dispatch = useDispatch()

  const { memberNickname, memberRepIcon } = useSelector((state) => state.member)
  const { basicIcons } = useSelector((state) => state.group)
  const { memberIconList } = useSelector((state) => state.mypage)

  const allIcons = [...basicIcons, ...memberIconList]

  const [nickname, setNickname] = useState(memberNickname)
  const [icon, setIcon] = useState(memberRepIcon)
  const [errorMessage, setErrorMessage] = useState("")

  // Modal
  const [isOpen, setOpen] = useState(false)
  const [isOpen2, setOpen2] = useState(false)
  const modalClose = () => setOpen(false)
  const modalClose2 = () => setOpen2(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // 닉네임이 존재하고
    if (nickname.length > 0) {
      // 본인 닉네임이면 아이콘만 붙여주고 닫기
      if (nickname === memberNickname) {
        dispatch(
          memberIconSelect({
            nickname: memberNickname,
            icon,
          })
        )
        modalClose()
        setErrorMessage("")
      }
      // 본인 닉네임이 아니라면 유효성 검사
      else {
        NicknameValidation(nickname).then((res) => {
          if (res === "NON-DUPLICATE") {
            dispatch(
              nicknameChange({
                origin: memberNickname,
                nickname: nickname,
                icon: memberRepIcon,
              })
            )
            dispatch(
              memberIconSelect({
                nickname: memberNickname,
                icon,
              })
            )
            modalClose()
            setVisible(false)
            setErrorMessage("")
          } else if (res === "DUPLICATE") {
            setErrorMessage("중복된 닉네임입니다.")
          }
        })
      }
    } else {
      setErrorMessage("닉네임을 한 글자 이상 작성해주세요.")
    }
  }

  return (
    <div
      onMouseOver={() => {
        setVisible(true)
      }}
      onMouseLeave={() => {
        setVisible(false)
      }}
    >
      {/* 개인 정보 수정 모달 시작 */}
      <Modal
        isOpen={isOpen}
        modalClose={() => {
          modalClose()
          setVisible(false)
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="text-xl flex justify-center pb-5 font-bold">
            프로필 수정
          </div>
          <div className="flex">
            <div className="pr-5">
              <div className="flex justify-center pb-3">대표 아이콘</div>
              <div>
                <ImageIcon
                  image={`/images/badgeIcon/${icon}.png`}
                  shape="round"
                  size="xLarge"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                <div className="">
                  <div className="pb-2">닉네임</div>
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
                      value={nickname}
                      onChange={(event) => {
                        setNickname(event.target.value)
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="pb-2 flex">
                  <span>아이콘 설정 </span>
                  <span className="text-sm ml-1 text-gray-300 flex items-center">
                    운동으로 아이콘을 모아보세요.
                  </span>
                </div>

                <div className="flex w-[300px] flex-wrap">
                  {allIcons
                    ? allIcons.map((icon, idx) => {
                        return (
                          <div
                            onClick={() => {
                              setIcon(icon)
                            }}
                            key={idx}
                            className="mr-1 mb-1 cursor-pointer"
                          >
                            <div className="hover:border-primary-400 border-2 border-white rounded-full ">
                              <ImageIcon
                                image={`/images/badgeIcon/${icon}.png`}
                                size="smmiddle"
                                shape="round"
                                borderStyle="none"
                              />
                            </div>
                          </div>
                        )
                      })
                    : null}
                </div>
              </div>
            </div>
          </div>

          <div className="py-3 flex mt-3">
            <div className="flex w-[322px] text-sm items-center text-red-600">
              {errorMessage}
            </div>
            <div className="r-0">
              <button
                type="submit"
                className="bg-lightBlue rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-gray-700 hover:bg-primary-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                정보 수정
              </button>
            </div>
          </div>
        </form>
      </Modal>
      {/* 개인 정보 수정 모달 끝 */}

      {/* 회원탈퇴 모달 시작 */}
      <Modal isOpen={isOpen2} modalClose={modalClose2} className="w-[100px]">
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl">
            정말 <span className="text-red-600">탈퇴</span>하시겠습니까?
          </p>
          <img
            src="/images/crying.png"
            alt="회원탈퇴 금지 이미지"
            className="max-w-[150px] text-center"
          />
          <div className="flex justify-center items-center mt-2">
            <Button
              size="xs"
              color="failure"
              onClick={() => {
                dispatch(memberRemove(memberId))
              }}
            >
              Yes
            </Button>
            <div className="mx-5"></div>
            <Button size="xl" onClick={modalClose2}>
              No
            </Button>
          </div>
        </div>
      </Modal>
      {/* 회원탈퇴 모달 끝 */}

      <div className="absolute z-30 top-[1.5rem]">
        <Card size="small">
          <ul>
            <NavLink to="/mypage" className="hover:text-red-400">
              My page
            </NavLink>
            <li
              onClick={() => setOpen(true)}
              className="hover:text-red-400 mt-2 cursor-pointer"
            >
              개인정보 수정
            </li>
            <li
              onClick={() => {
                localStorage.clear()
                window.location.replace("/")
              }}
              className="hover:text-red-400 mt-2 cursor-pointer"
            >
              로그아웃
            </li>

            <li
              className="hover:text-red-400 mt-2 cursor-pointer"
              onClick={() => setOpen2(true)}
            >
              회원 탈퇴
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}

export default function NavbarComponent() {
  const dispatch = useDispatch()
  const location = useLocation()

  const { memberId, memberRepIcon } = useSelector((state) => state.member)
  const { registeredTeam } = useSelector((state) => state.group)
  const [showGroup, setShowGroup] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  // 회원이 가입한 팀 정보
  useEffect(() => {
    dispatch(registrationTeam(memberId))
  }, [memberId])

  if (
    location.pathname.split("/")[1] === "room" ||
    location.pathname.split("/")[1] === "login" ||
    location.pathname.split("/")[1] === "invite"
  ) {
    return
  }

  return (
    <div className="flex justify-center py-3">
      <div className="w-screen flex justify-center">
        <nav className="flex justify-between py-3 w-4/5">
          <div>
            <NavLink to="/">
              <img src={Logo} style={{ height: "60px" }} alt="logo" />
            </NavLink>
          </div>
          <ul className="flex">
            <NavItem>
              <NavLink to="/tutorial" className="hover:text-red-400">
                튜토리얼
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/rank" className="hover:text-red-400">
                명예의 전당
              </NavLink>
            </NavItem>
            <NavItem>
              <div
                onMouseOver={() => {
                  setShowGroup(true)
                }}
                onMouseLeave={() => {
                  setShowGroup(false)
                }}
                className="hover:text-red-400"
              >
                그룹 목록
              </div>
              <div
                onMouseOver={() => {
                  setShowGroup(true)
                }}
                onMouseLeave={() => {
                  setShowGroup(false)
                }}
                className="relative"
              >
                {showGroup && (
                  <GroupList
                    setVisible={setShowGroup}
                    groups={registeredTeam}
                  />
                )}
              </div>
            </NavItem>

            <NavItem>
              <div
                onMouseOver={() => {
                  setShowInfo(true)
                }}
                onMouseLeave={() => {
                  setShowInfo(false)
                }}
                className="relative"
              >
                <ImageIcon
                  image={`/images/badgeIcon/${memberRepIcon}.png`}
                  size="small"
                  shape="round"
                />
                {showInfo && (
                  <InfoList
                    setVisible={setShowInfo}
                    memberId={memberId}
                    showInfo={showInfo}
                  />
                )}
              </div>
            </NavItem>
          </ul>
        </nav>
      </div>
    </div>
  )
}
