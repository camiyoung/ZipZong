import { http } from "../api/axios"

export async function NicknameValidation(nickname) {
  const res = await http.get(`member/duplicate/${nickname}`)
  if (res.data.data === "NON-DUPLICATE") {
    return res.data.data
  } else if (res.data.data === "DUPLICATE") {
    return res.data.data
  }
}
