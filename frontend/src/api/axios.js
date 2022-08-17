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
      config.headers["accessToken"] = localStorage.getItem("accessToken")
      config.headers["refreshToken"] = localStorage.getItem("refreshToken")
      return config
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
    async (error) => {
      const {
        config,
        response: { status },
      } = error
      if (status === 401) {
        const originalRequest = config
        // token refresh 요청
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}oauth/refresh`, // token refresh api
          {
            headers: {
              refreshToken: localStorage.getItem("refreshToken"),
            },
          }
        )
        // 새로운 토큰 저장
        const {
          accessToken: newAccessToken,

          accessTokenExpiration,
        } = data

        localStorage.setItem("accessToken", newAccessToken)

        localStorage.setItem("accessTokenExpiration", accessTokenExpiration)

        instance.defaults.headers["refreshToken"] =
          localStorage.getItem("refreshToken")
        originalRequest.headers["accessToken"] = newAccessToken
        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return axios(originalRequest)
      }
      return Promise.reject(error)
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
