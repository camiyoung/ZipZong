import React, { useState, useEffect } from "react"
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
  initializeIsMemberGroupLeader,
  memberRemove,
} from "../../features/login/memberReducer"
import Card from "../card/Card"
import ImageIcon from "../icon/ImageIcon"
import Logo from "../../assets/Logo.svg"

const Icons = [
  "basic",
  "bee",
  "elephant",
  "basic",
  "ferret",
  "frog",
  "pandaBear",
  "pig",
  "rabbit",
  "walrus",
  "yak",
]

const NavItem = ({ children }) => {
  return <li className="m-2 flex justify-center items-center">{children}</li>
}

const GroupList = ({ setVisible, groups }) => {
  return (
    <div className="absolute z-30 top-[4rem] right-[2.5em]">
      <Card size="middle">
        <div onClick={() => setVisible(false)}>닫기 </div>
        <ul>
          {groups.map(({ teamName, icon, count, groupId }, idx) => {
            return (
              <NavLink key={idx} to={`/group/${groupId}`}>
                <li className="flex">
                  <p className="text-sm">팀 아이콘: {icon}</p>
                  <p className="text-sm">팀 이름: {teamName}</p>
                  <p className="text-sm ml-2">{count}/10 명</p>
                </li>
              </NavLink>
            )
          })}
          <NavLink to="/group">
            <li>그룹 페이지</li>
          </NavLink>
          <NavLink to="/groupset">
            <li>그룹 설정 페이지</li>
          </NavLink>
          <NavLink to="/routine">
            <li>루틴 페이지</li>
          </NavLink>
        </ul>
      </Card>
    </div>
  )
}

const InfoList = ({ setVisible, memberId }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { memberNickname, memberRepIcon, isMemberGroupLeader } = useSelector(
    (state) => state.member
  )

  const memberIconList = useSelector((state) => state.mypage.memberIconList)
  const allIcons = [...Icons]

  memberIconList.forEach((icon) => {
    if (!allIcons.includes(icon)) allIcons.push(icon)
  })

  const [nickname, setNickname] = useState(memberNickname)
  const [icon, setIcon] = useState(memberRepIcon)
  const { basicIcons } = useSelector((state) => state.group)
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

  // 아이콘 목록 기본 아이콘과 회원이 가진 아이콘들 합치기
  // if (memberIconList) {
  //   setAllIcons([...Icons, ...memberIconList])
  // }

  return (
    <div>
      {/* 개인 정보 수정 모달 시작 */}
      <Modal isOpen={isOpen} modalClose={modalClose}>
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
      <Modal isOpen={isOpen2} modalClose={modalClose2}>
        <p>정말 탈퇴하시겠습니까?</p>
        <div className="flex">
          <Button
            size="xs"
            onClick={() => {
              dispatch(memberRemove(memberId))

              if (
                isMemberGroupLeader === true ||
                isMemberGroupLeader === false
              ) {
                if (isMemberGroupLeader === true) {
                  dispatch(initializeIsMemberGroupLeader())
                  navigate("/login")
                } else {
                  modalClose2()
                  alert(
                    "회원님이 그룹장인 그룹이 있습니다. 그룹장을 위임한 후 회원탈퇴를 진행해주세요!"
                  )
                }
              }
            }}
          >
            Yes
          </Button>
          <Button size="xl" color="failure" onClick={modalClose2}>
            No
          </Button>
        </div>
      </Modal>
      {/* 회원탈퇴 모달 끝 */}

      <div className="absolute z-30 top-[4rem] right-[2.5em] border">
        <Card size="middle">
          <div onClick={() => setVisible(false)}>닫기</div>
          <ul>
            <li onClick={() => setOpen(true)}>개인정보 수정</li>
            <li
              onClick={() => {
                localStorage.clear()
                window.location.replace("/")
              }}
            >
              log out
            </li>

            {/* 회원 탈퇴 */}
            <li
              className="text-xs"
              style={{ color: "red", cursor: "pointer" }}
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

export default function Navbar() {
  const dispatch = useDispatch()
  const { memberId, memberRepIcon } = useSelector((state) => state.member)
  const { registeredTeam } = useSelector((state) => state.group)
  const [showGroup, setShowGroup] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const location = useLocation()

  // 회원이 가입한 팀 정보
  // useEffect(() => {
  //   dispatch(registrationTeam(memberId))
  //   return () => console.log("회원이 가입한 팀", registeredTeam)
  // }, [])

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
              <NavLink to="/login" style={{ color: "red" }}>
                로그인
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/mypage">My page</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/room">운동방</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/result">운동 결과</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/rank">명예의 전당</NavLink>
            </NavItem>
            <NavItem>
              <div
                onClick={() => {
                  setShowGroup(true)
                }}
              >
                그룹 목록
              </div>
              {showGroup && (
                <GroupList setVisible={setShowGroup} groups={registeredTeam} />
              )}
            </NavItem>
            <NavItem>
              <div
                onClick={() => {
                  setShowInfo(true)
                }}
              >
                <ImageIcon
                  image={`/images/badgeIcon/${memberRepIcon}.png`}
                  size="small"
                  shape="round"
                />
              </div>
              {showInfo && (
                <InfoList setVisible={setShowInfo} memberId={memberId} />
              )}
            </NavItem>
          </ul>
        </nav>
      </div>
    </div>
  )
}
