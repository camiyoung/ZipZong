import React, { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import Card from "../card/Card"
import ImageIcon from "../icon/ImageIcon"
import Logo from "../../assets/Logo.svg"

const NavItem = ({ children }) => {
  return <li className="m-2 flex justify-center items-center">{children}</li>
}

const GroupList = ({ setVisible }) => {
  return (
    <div className="absolute z-30 top-[4rem] right-[2.5em] ">
      <Card size="middle">
        <div onClick={() => setVisible(false)}>닫기 </div>
        <ul>
          <NavLink to="/group">
            <li>그룹 페이지</li>
          </NavLink>
          <NavLink to="/groupset">
            <li>그룹 설정 페이지</li>
          </NavLink>
          <li>그룹 3 1/10(명)</li>
        </ul>
      </Card>
    </div>
  )
}

const InfoList = ({ setVisible }) => {
  return (
    <div className="absolute z-30 top-[4rem] right-[2.5em] border">
      <Card size="middle">
        <div onClick={() => setVisible(false)}>닫기</div>
        <ul>
          <li>log out</li>
        </ul>
      </Card>
    </div>
  )
}

export default function Navbar() {
  const [showGroup, setShowGroup] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const location = useLocation()

  if (
    location.pathname.split("/")[1] === "room" ||
    location.pathname.split("/")[1] === "login"
  )
    return
  return (
    <nav className="flex justify-between p-3 border">
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
          {showGroup && <GroupList setVisible={setShowGroup} />}
        </NavItem>
        <NavItem>
          <div
            onClick={() => {
              setShowInfo(true)
            }}
          >
            <ImageIcon
              image="https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg"
              size="small"
              shape="round"
            />
          </div>
          {showInfo && <InfoList setVisible={setShowInfo} />}
        </NavItem>
      </ul>
    </nav>
  )
}
