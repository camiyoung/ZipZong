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
    // console.log(accessToken, "닉넴:", nickname)

    if (!!accessToken && nickname !== "") {
      // console.log("토큰 있고 닉넴 있음  ")
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      localStorage.setItem("accessTokenExpiration", accessTokenExpiration)
      localStorage.setItem("refreshTokenExpiration", refreshTokenExpiration)
      localStorage.setItem("memberId", Number(collectedMemberId))
      localStorage.setItem("nickname", nickname)

      console.log(nickname, accessToken, refreshToken)
      window.location.replace("/")
    }

    if (accessToken && !nickname) {
      // console.log(
      //   "토큰 있고 닉넴 없음 , id=",
      //   Number(collectedMemberId),
      //   refreshTokenExpiration,
      //   accessToken
      // )
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
        <div className="w-1/2 h-full  rounded-2xl">
          <Carousel leftControl=" " rightControl=" ">
            <div
              className="w-full flex justify-center h-full bg-cover"
              style={{ backgroundImage: "url(/images/Login/icons2.png)" }}
            ></div>
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
