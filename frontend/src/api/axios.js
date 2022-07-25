import axios from "axios"

function Instance() {
  const instance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-type": "application/json",
    },
  })

  instance.interceptors.request.use(
    (config) => {
      config.headers["access-token"] = localStorage.getItem("access-token")
      return config
    },
    (error) => {
      console.log(error)
      return Promise.reject(error)
    }
  )
  console.log("생성")
  return instance
}

export const http = Instance()

/**
 * 사용방법 :
 * 사용하고자 하는 파일에서 임포트 : ex) import { http } from "../api/index"
 * 원하는 요청 수행 : ex) http.get("url") , http.post("url",data)
 */
