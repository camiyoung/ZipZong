import React, { useState } from "react"
import { useDispatch } from "react-redux"
import Button from "../../components/button/Button"
import { nicknameValidation, selectNickname } from "./memberReducer"

export default function SetNickName() {
  const dispatch = useDispatch()
  const [nickname, setNickname] = useState("")
  const handleChange = ({ target: { value } }) => setNickname(value)
  const handleSubmit = (e) => {
    e.preventDefault()

    // 닉네임 유효성 검사
    dispatch(nicknameValidation({ nickname }))
    dispatch(selectNickname({ nickname }))
    console.log("끝!")
  }
  return (
    <div className="w-6/12 flex justify-center items-center flex-col">
      <p className="text-3xl font-bold">
        집중에서 사용하실 닉네임을 입력해주세요.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input type="text" onChange={handleChange} />
        <Button
          type="submit"
          text="회원가입"
          height="h-8"
          bgColor="bg-info"
          style={{ marginTop: "10px" }}
        />
      </form>
    </div>
  )
}
