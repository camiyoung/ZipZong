import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { checkMemberId, nicknamePush } from "../features/login/memberReducer"
import NotLoggedInYet from "../features/login/NotLoggedInYet"
import SetNickName from "../features/login/SetNickName"
import { registrationTeam } from "../features/group/groupReducer"
import Logo from "../assets/Logo.svg"
import { Carousel } from "flowbite-react"
export default function Login() {
  const [showMakeNickname, setMakeNickname] = useState(false)
  let accessToken,
    refreshToken,
    accessTokenExpiration,
    refreshTokenExpiration,
    hasNickname,
    collectedMemberId,
    nickname
  useEffect(() => {
    accessToken = new URL(window.location.href).searchParams.get("accessToken")
    refreshToken = new URL(window.location.href).searchParams.get(
      "refreshToken"
    )
    accessTokenExpiration = new URL(window.location.href).searchParams.get(
      "accessTokenExpiration"
    )
    refreshTokenExpiration = new URL(window.location.href).searchParams.get(
      "refreshTokenExpiration"
    )
    hasNickname = new URL(window.location.href).searchParams.get("hasNickname")
    collectedMemberId = new URL(window.location.href).searchParams.get(
      "memberId"
    )
    nickname = new URL(window.location.href).searchParams.get("nickname")

    if (!!accessToken && nickname !== "") {
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      localStorage.setItem("accessTokenExpiration", accessTokenExpiration)
      localStorage.setItem("refreshTokenExpiration", refreshTokenExpiration)
      localStorage.setItem("memberId", Number(collectedMemberId))
      localStorage.setItem("nickname", nickname)

      window.location.replace("/")
    }

    if (accessToken && !nickname) {
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      localStorage.setItem("accessTokenExpiration", accessTokenExpiration)
      localStorage.setItem("refreshTokenExpiration", refreshTokenExpiration)
      localStorage.setItem("memberId", Number(collectedMemberId))
      setMakeNickname(true)
    }
  }, [])

  return (
    <div className=" w-full h-screen  bg-gradient-to-tl from-begie to-lightBlue flex justify-center items-center  ">
      <div className="flex  w-4/5 bg-white h-4/5  max-w-[1000px] min-w-[700px] rounded-2xl p-4 shadow-xl ">
        <div className="w-1/2 h-full bg-primary-500 rounded-2xl">
          <Carousel leftControl=" " rightControl=" ">
            <div className="w-full flex justify-center">
              집에서 운동중 가입 환영
            </div>
            <div className="w-full flex justify-center">SNS 로그인</div>
            <div className="w-full flex justify-center">
              네이버, 카카오, 구글 모두 가능
            </div>
          </Carousel>
        </div>
        <div className="w-1/2  h-full  p-4 flex justify-center items-center flex-col relative ">
          <img
            src={Logo}
            style={{ height: "60px" }}
            alt="logo"
            className="absolute top-4 right-6"
          />
          {showMakeNickname ? <SetNickName /> : <NotLoggedInYet />}
        </div>
      </div>
    </div>
  )
}
