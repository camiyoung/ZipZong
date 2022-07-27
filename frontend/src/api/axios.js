import axios from "axios"
import { useDispatch } from "react-redux"
import { logout } from "../features/login/memberReducer"

export const http = function Instance() {
  const dispatch = useDispatch()
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
      const dateList = accessTokenExpiration.split("-")
      const today = new Date()
      if (
        today.getFullYear() > Number(dateList[0]) ||
        today.getMonth() + 1 > Number(dateList[1]) ||
        today.getDate() > Number(dateList[2]) ||
        today.getHours() * 60 * 60 +
          today.getMinutes() * 60 +
          today.getSeconds() >
          Number(dateList[3]) * 60 * 60 +
            Number(dateList[4]) * 60 +
            Number(dateList[5])
      ) {
        // 만료시 refresh token 같이 보냄
        config.headers["refresh-token"] = localStorage.getItem("refreshToken")
      }
      config.headers["access-token"] = localStorage.getItem("accessToken")
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
      console.log(error)
      // 에러 코드 받기
      console.log(error)
      // E003 - 토큰 만료 오류
      //로그아웃 후 login page로 리다이렉트
      if (error.code === "E003") {
        dispatch(logout())
        window.location.href("/login")
      }
      // 응답 에러 : 에러코드로 처리 방법 지정
      //  ex) locaStorage에 토큰이 없음 -> 안내 메세지 후 로그인 페이지로 redirect
    }
  )
  return instance
}

/**
 * 사용방법 :
 * 사용하고자 하는 파일에서 임포트 : ex) import { http } from "../api/index"
 * 원하는 요청 수행 : ex) http.get("url") , http.post("url",data)
 */
