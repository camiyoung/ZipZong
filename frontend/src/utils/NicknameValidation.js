import { http } from "../api/axios"

export async function NicknameValidation(nickname) {
  console.log("여기")
  const res = await http.get(`member/duplicate/${nickname}`)
  console.log("나왔다")
  if (res.data.data === "NON-DUPLICATE") {
    return res.data.data
  } else if (res.data.data === "DUPLICATE") {
    return res.data.data
  }
}
