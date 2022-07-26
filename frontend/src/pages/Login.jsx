import React from "react"
// import { useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { checkMemberId } from "../features/login/memberReducer"

import NotLoggedInYet from "../features/login/NotLoggedInYet"
import SetNickName from "../features/login/SetNickName"

export default function Login() {
  const dispatch = useDispatch()
  const memberId = useSelector((state) => state.memberId)
  // const location = useLocation()
  const accessToken = new URL(window.location.href).searchParams.get(
    "accessToken"
  )
  const refreshToken = new URL(window.location.href).searchParams.get(
    "refreshToken"
  )
  const accessTokenExpiration = new URL(window.location.href).searchParams.get(
    "accessTokenExpiration"
  )
  const refreshTokenExpiration = new URL(window.location.href).searchParams.get(
    "refreshTokenExpiration"
  )
  const hasNickName = new URL(window.location.href).searchParams.get(
    "hasNickName"
  )
  const collectedMemberId = new URL(window.location.href).searchParams.get(
    "memberId"
  )
  dispatch(checkMemberId(collectedMemberId))
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
    localStorage.setItem("accessTokenExpiration", accessTokenExpiration)
    localStorage.setItem("refreshTokenExpiration", refreshTokenExpiration)
    localStorage.setItem("memberId", memberId)
  }

  return (
    <div className="flex">
      <div className="w-6/12 h-screen">
        <img
          src="https://ahopsi.com/wp-content/uploads/2022/03/%EC%97%90%ED%8E%A0%ED%83%91%EA%B3%BC-%EC%9C%A0%EB%A6%AC-%ED%94%BC%EB%9D%BC%EB%AF%B8%EB%93%9C%EA%B0%80-%EB%B9%9B%EB%82%98%EB%8A%94-%E2%80%98%EB%AF%B8%EB%93%9C%EB%82%98%EC%9E%87-%EC%9D%B8-%ED%8C%8C%EB%A6%AC.jpg"
          style={{ height: "100%" }}
          alt="에펠타워"
        />
      </div>
      {/* 로그인되면 버튼들이 보이지 않음 */}
      {accessToken ? <SetNickName /> : <NotLoggedInYet />}
      {hasNickName ? window.location.href("/mypage") : null}
    </div>
  )
}
