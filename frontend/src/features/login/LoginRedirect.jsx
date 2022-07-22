import React from "react"
import { useLocation } from "react-router-dom"

export default function LoginRedirect(){
  const location = useLocation()
  const token = new URL(window.location.href).searchParams.get("token")
  const refreshToken = new URL(window.location.href).searchParams.get("refreshToken")
  const accessTokenExpiration = new URL(window.location.href).searchParams.get("accessTokenExpiration")
  const refreshTokenExpiration = new URL(window.location.href).searchParams.get("refreshTokenExpiration")
  console.log("Location", location)
  if (token) {
    localStorage.setItem("token", token)
    localStorage.setItem("refreshToken", refreshToken)
    localStorage.setItem("accessTokenExpiration", accessTokenExpiration)
    localStorage.setItem("refreshTokenExpiration", refreshTokenExpiration)
  }
  window.location.replace('/login')
}