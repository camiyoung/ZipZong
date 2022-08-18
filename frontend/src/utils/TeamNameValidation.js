import { http } from "../api/axios"

export async function TeamNameValidation(teamName) {
  const res = await http.get(`team/duplicate/${teamName}`)
  return res
}
