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
