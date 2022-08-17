import axios from "axios"
import {
  AccessTokenExpireCheck,
  RefreshTokenExpireCheck,
} from "../utils/TokenExpireCheck"
function Instance() {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
  })
  // request insterceptor 요청 전 헤더에 토큰 등록
  instance.interceptors.request.use(
    (config) => {
      // access token 만료 시
      if (AccessTokenExpireCheck()) {
        // refresh token 만료 시
        if (RefreshTokenExpireCheck()) {
          //access token & refresh token 둘 다 만료됐을 시
          console.log("토큰 만료됨 ")
          window.location.replace("/login")
        } else {
          // access token 만료 & refresh token 만료되지 않았을 시
          console.log("리프레쉬 토큰으로 요청 ")
          axios
            .get(`${process.env.REACT_APP_BASE_URL}oauth/refresh`, {
              headers: {
                refreshToken: localStorage.getItem("refreshToken"),
              },
            })
            .then((res) => {
              console.log("새로운 엑세스 토큰 받음 ", res.data)
              localStorage.setItem("accessToken", res.data.accessToken)
              localStorage.setItem(
                "accessTokenExpiration",
                res.data.accessTokenExpiration
              )
              config.headers["refreshToken"] =
                localStorage.getItem("refreshToken")
              config.headers["accessToken"] =
                localStorage.getItem("accessToken")

              console.log("새 엑세스 토큰 헤더에 등록 ")
              return config
            })
            .catch((err) => {
              console.log("엑세스 토큰 발급 요청 에러 ", err)
            })
        }
      } else {
        console.log("기존 엑세스 토큰 ")
        config.headers["accessToken"] = localStorage.getItem("accessToken")
        config.headers["refreshToken"] = localStorage.getItem("refreshToken")
        return config
      }
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // response interceptor 요청 응답 받은 후 데이터 가공
  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // 에러 코드 받기 E003 - 토큰 만료 오류
      console.log("Axios 에러입니다.", error)
      //로그아웃 후 login page로 리다이렉트
      // if (error.response.data.code === "E003") {
      //   localStorage.clear()
      //   window.location.replace("/")
      // }
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
