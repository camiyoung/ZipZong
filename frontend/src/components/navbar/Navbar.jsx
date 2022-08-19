import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { registrationTeam, teamInfo } from "../../features/group/groupReducer"
import Modal from "../modal/Modal"
import { NicknameValidation } from "../../utils/NicknameValidation"

import {
  nicknameChange,
  memberIconSelect,
  logout,
  memberRemove,
} from "../../features/login/memberReducer"
import ImageIcon from "../icon/ImageIcon"
import Logo from "../../assets/Logo.svg"
import "./Navbar.css"
import "../../components/button/NegativeBtn.css"
import "../../components/button/PositiveBtn.css"

const NavItem = ({ children }) => {
  return <li className="m-2 flex justify-center items-center">{children}</li>
}

export default function NavbarComponent() {
  const dispatch = useDispatch()
  const location = useLocation()

  const member = useSelector((state) => state.member)
  const { memberId, memberRepIcon, memberNickname } = member
  const { registeredTeam, basicIcons } = useSelector((state) => state.group)
  const { memberIconList } = useSelector((state) => state.mypage)
  const allIcons = [...basicIcons]

  const [nickname, setNickname] = useState("")
  const [icon, setIcon] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if (memberNickname && memberRepIcon) {
      setNickname(memberNickname)
      setIcon(memberRepIcon)
    }
  }, [member, memberRepIcon])

  // Modal
  const [isOpen, setOpen] = useState(false) // 개인정보 수정
  const [isOpen2, setOpen2] = useState(false) // 회원탈퇴
  const modalClose = () => setOpen(false) // 개인정보 수정
  const modalClose2 = () => setOpen2(false) // 회원탈퇴

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

  // 회원이 가입한 팀 정보
  useEffect(() => {
    if (memberId) {
      dispatch(registrationTeam(memberId))
    }
  }, [memberId])

  if (
    location.pathname.split("/")[1] === "room" ||
    location.pathname.split("/")[1] === "login" ||
    location.pathname.split("/")[1] === "invite" ||
    location.pathname.split("/")[1] === "logincheck"
  ) {
    return
  }

  return (
    <div className="flex justify-center py-3">
      {/* 개인 정보 수정 모달 시작 */}
      <Modal
        isOpen={isOpen}
        modalClose={() => {
          modalClose()
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
                      maxLength="8"
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
                className="bg-lightBlue rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-primary-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
          <p className="text-xl mb-5">
            정말 <span className="text-red-600">탈퇴</span>하시겠습니까?
          </p>
          <img
            src="/images/crying.png"
            alt="회원탈퇴 금지 이미지"
            className="max-w-[150px] text-center"
          />
          <div className="flex justify-center items-center my-5">
            <button
              className="negative-btn mr-10"
              role="button"
              onClick={() => dispatch(memberRemove(memberId))}
            >
              예
            </button>
            <button
              className="positive-btn"
              role="button"
              onClick={modalClose2}
            >
              아니오
            </button>
          </div>
        </div>
      </Modal>
      {/* 회원탈퇴 모달 끝 */}

      <div className="w-screen flex justify-center">
        <nav className="flex justify-between py-3 w-4/5 items-center">
          <NavLink to="/">
            <img src={Logo} style={{ height: "60px" }} alt="logo" />
          </NavLink>
          <ul className="flex navbar-links">
            <NavItem>
              <NavLink to="/tutorial" className="navlink">
                튜토리얼
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/rank" className="navlink">
                명예의 전당
              </NavLink>
            </NavItem>
            <li className="navbar-dropdown my-auto">
              <p className="navlink">그룹 목록</p>
              <div className="dropdown">
                <p className="font-semibold text-xl ml-5 mb-5">
                  내가 가입한 그룹 목록
                </p>
                <hr className="mb-4" />
                {registeredTeam &&
                  registeredTeam.map(
                    ({ count, groupId, icon, teamName }, idx) => {
                      return (
                        <NavLink
                          key={idx}
                          to={`/group/${groupId}`}
                          className="navlink mb-2"
                        >
                          <div className="flex items-center">
                            <ImageIcon
                              image={`/images/badgeIcon/${icon}.png`}
                              shape="round"
                              size="small"
                            />
                            <div className="ml-2 block truncate w-[160px]">
                              {teamName}
                            </div>
                            <p>
                              {count}/10<span className="text-[1rem]"> 명</span>
                            </p>
                          </div>
                        </NavLink>
                      )
                    }
                  )}
                {!registeredTeam ? (
                  <p className="navlink">그룹에 가입해보세요!</p>
                ) : null}
              </div>
            </li>

            <ul className="navbar-dropdown my-auto">
              <img
                src={`/images/badgeIcon/${memberRepIcon}.png`}
                alt="멤버 아이콘"
                className="max-w-[100px] rounded-full navlink ml-[20px]"
              />

              <div className="dropdown" style={{ width: "177px" }}>
                <NavLink to="/mypage" className="navlink ml-4">
                  <div
                    onClick={() => {
                      modalClose()
                    }}
                  >
                    My page
                  </div>
                </NavLink>
                <li
                  onClick={() => {
                    setOpen(true)
                  }}
                  className="navlink ml-4"
                >
                  개인정보 수정
                </li>
                <li
                  onClick={() => {
                    localStorage.clear()
                    window.location.replace("/")
                  }}
                  className="navlink ml-4"
                >
                  로그아웃
                </li>
                <hr />
                <li
                  onClick={() => {
                    setOpen2(true)
                  }}
                  className="navlink ml-4"
                  style={{ color: "red" }}
                >
                  회원 탈퇴
                </li>
              </div>
            </ul>
          </ul>
        </nav>
      </div>
    </div>
  )
}
