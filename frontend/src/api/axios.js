import axios from "axios"

function Instance() {
  const instance = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
      "Content-type": "application/json",
    },
  })
  //request insterceptor 요청 전 헤더에 토큰 등록
  instance.interceptors.request.use(
    (config) => {
      // accessToken 만료시간 확인
      const accessTokenExpiration = localStorage.getItem(
        "accessTokenExpiration"
      )
      const refreshTokenExpiration = localStorage.getItem(
        "refreshTokenExpiration"
      )
      const accessDateList = accessTokenExpiration.split("-")
      const refreshDataList = refreshTokenExpiration.split("-")
      const today = new Date()

      // access token 만료 시
      if (
        today.getFullYear() > Number(accessDateList[0]) ||
        today.getMonth() + 1 > Number(accessDateList[1]) ||
        today.getDate() > Number(accessDateList[2]) ||
        today.getHours() * 60 * 60 +
          today.getMinutes() * 60 +
          today.getSeconds() >
          Number(accessDateList[3]) * 60 * 60 +
            Number(accessDateList[4]) * 60 +
            Number(accessDateList[5])
      ) {
        // refresh token 만료 시
        if (
          today.getFullYear() > Number(refreshDataList[0]) ||
          today.getMonth() + 1 > Number(refreshDataList[1]) ||
          today.getDate() > Number(refreshDataList[2]) ||
          today.getHours() * 60 * 60 +
            today.getMinutes() * 60 +
            today.getSeconds() >
            Number(refreshDataList[3]) * 60 * 60 +
              Number(refreshDataList[4]) * 60 +
              Number(refreshDataList[5])
        ) {
          //access token & refresh token 둘 다 만료됐을 시
          window.location.href("/login")
        }
        // access token 만료 & refresh token 만료되지 않았을 시
        // axios 요청 -> refresh/ ->

        // axios.get("http://localhost:8080/refresh").then((res) => {
        //   localStorage.setItem("accessToken", res.data.accessToken)
        //   localStorage.setItem(
        //     "accessTokenExpiration",
        //     res.data.accessTokenExpiration
        //   )
        // })

        // config.headers["refreshToken"] = localStorage.getItem("refreshToken")
      }
      config.headers["accessToken"] = localStorage.getItem("accessToken")
      return config
    },
    (error) => {
      console.log(error)
      return Promise.reject(error)
    }
  )
  // response interceptor 요청 응답 받은 후 데이터 가공
  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // 에러 코드 받기
      // E003 - 토큰 만료 오류
      //로그아웃 후 login page로 리다이렉트
      if (error.response.data.code === "E003") {
        localStorage.clear()
        window.location.href("/login")
      }
      // 응답 에러 : 에러코드로 처리 방법 지정
      //  ex) locaStorage에 토큰이 없음 -> 안내 메세지 후 로그인 페이지로 redirect
    }
  )
  return instance
}
export const http = Instance()
/**
 * 사용방법 :
 * 사용하고자 하는 파일에서 임포트 : ex) import { http } from "../api/index"
 * 원하는 요청 수행 : ex) http.get("url") , http.post("url",data)
 */
