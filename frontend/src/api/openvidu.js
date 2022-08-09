import axios from "axios"

function Instance() {
  const instance = axios.create({
    baseURL: "https://i7a805.p.ssafy.io:8443/openvidu/api/sessions",
    headers: {
      "Content-type": "application/json",
      Authorization: "Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU", //SessionA 인증
    },
  })
  return instance
}

export const openvidu = Instance()
