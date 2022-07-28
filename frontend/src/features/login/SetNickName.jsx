import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Button from "../../components/button/Button"
import { nicknameValidation, selectNickname } from "./memberReducer"
export default function SetNickName() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [nickname, setNickname] = useState("")
  const savedNickname = useSelector((state) => state.member.memberNickname)
  const handleChange = ({ target: { value } }) => setNickname(value)
  const handleSubmit = (e) => {
    e.preventDefault()
    // 닉네임 유효성 검사

    dispatch(nicknameValidation({ nickname }))
    setNickname(savedNickname)
    dispatch(selectNickname({ nickname }))
    navigate("/mypage")
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
