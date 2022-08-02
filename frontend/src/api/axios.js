import { toHaveDescription } from "@testing-library/jest-dom/dist/matchers"
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
      const accessYMD = `${accessDateList[0]}-${accessDateList[1]}-${accessDateList[2]}`
      const refreshDataList = refreshTokenExpiration.split("-")
      const refreshYMD = `${refreshDataList[0]}-${refreshDataList[1]}-${refreshDataList[2]}`
      const today = new Date()
      const year = today.getFullYear()
      const tmpMonth = today.getMonth() + 1
      const month = tmpMonth + 1 < 10 ? "0" + tmpMonth : "" + tmpMonth
      const tmpDay = today.getDate()
      const day = tmpDay < 10 ? "0" + tmpDay : "" + tmpDay
      const hour = today.getHours()
      const minute = today.getMinutes()
      const seconds = today.getSeconds()
      const todayYMD = `${year}-${month}-${day}`

      // access token 만료 시 함수
      const accessTokenExpireCheck = () => {
        if (todayYMD > accessYMD) {
          return true
        } else if (
          todayYMD == accessYMD &&
          hour * 60 * 60 + minute * 60 + seconds >
            Number(accessDateList[3]) * 60 * 60 +
              Number(accessDateList[4]) * 60 +
              Number(accessDateList[5])
        ) {
          return true
        } else {
          return false
        }
      }

      // refresh token 만료 시 함수
      const refreshTokenExpireCheck = () => {
        if (todayYMD > refreshYMD) {
          return true
        } else if (
          todayYMD == refreshYMD &&
          hour * 60 * 60 + minute * 60 + seconds >
            Number(refreshDataList[3]) * 60 * 60 +
              Number(refreshDataList[4]) * 60 +
              Number(refreshDataList[5])
        ) {
          return true
        } else {
          return false
        }
      }
      // access token 만료 시
      if (accessTokenExpireCheck()) {
        // refresh token 만료 시
        if (refreshTokenExpireCheck()) {
          //access token & refresh token 둘 다 만료됐을 시
          window.location.replace("/login")
        } else {
          // access token 만료 & refresh token 만료되지 않았을 시
          axios
            .get("http://localhost:8080/oauth/refresh", {
              headers: {
                refreshToken: localStorage.getItem("refreshToken"),
              },
            })
            .then((res) => {
              console.log("여기 나와야 함", res.data)
              localStorage.setItem("accessToken", res.data.accessToken)
              localStorage.setItem(
                "accessTokenExpiration",
                res.data.accessTokenExpiration
              )
            })

          config.headers["refreshToken"] = localStorage.getItem("refreshToken")
        }
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
