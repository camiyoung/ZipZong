import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { teamInfo } from "../../features/group/groupReducer"
import Card from "../card/Card"
import ImageIcon from "../icon/ImageIcon"
import Logo from "../../assets/Logo.svg"

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
          <NavLink to="/login">
            <li style={{ color: "red" }}>드디어 로그인 버튼 만들었습니다</li>
          </NavLink>
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

// 로그아웃 버튼 눌렀을 시 발동
const Logout = () => {
  const navigate = useNavigate()
  // 로그아웃 버튼을 누르면 로컬스토리지 비우고 navigate을 하고 싶지만 동작 안함
  localStorage.clear()
  navigate("/login")
}

const InfoList = ({ setVisible }) => {
  return (
    <div className="absolute z-30 top-[4rem] right-[2.5em] border">
      <Card size="middle">
        <div onClick={() => setVisible(false)}>닫기</div>
        <ul>
          <li onClick={() => <Logout />}>log out</li>
        </ul>
      </Card>
    </div>
  )
}

export default function Navbar() {
  // 회원이 가입한 팀 정보
  const memberId = useSelector((state) => state.member.memberId)
  const memberInfoTeam = useSelector((state) => state.mypage.registeredTeam)

  const [showGroup, setShowGroup] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const location = useLocation()

  if (
    location.pathname.split("/")[1] === "room" ||
    location.pathname.split("/")[1] === "login"
  ) {
    return
  }

  return (
    <div className="flex justify-center mt-3">
      <div className="w-screen flex justify-center">
        <nav className="flex justify-between py-3 w-4/5">
          <div>
            <NavLink to="/">
              <img src={Logo} style={{ height: "60px" }} alt="logo" />
            </NavLink>
          </div>
          <ul className="flex">
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
                <GroupList setVisible={setShowGroup} groups={memberInfoTeam} />
              )}
            </NavItem>
            <NavItem>
              <div
                onClick={() => {
                  setShowInfo(true)
                }}
              >
                <NavLink to="/mypage">
                  <ImageIcon
                    image="https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg"
                    size="small"
                    shape="round"
                  />
                </NavLink>
              </div>
              {showInfo && <InfoList setVisible={setShowInfo} />}
            </NavItem>
          </ul>
        </nav>
      </div>
    </div>
  )
}
