import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Button from "../../components/button/Button"
import { memberInfo, selectNickname, nicknamePush } from "./memberReducer"
import { NicknameValidation } from "../../utils/NicknameValidation"
export default function SetNickName() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [nickname, setNickname] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const memberId = useSelector((state) => state.member.memberId)
  const handleChange = ({ target: { value } }) => setNickname(value)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (nickname.length > 0) {
      // 닉네임 유효성 검사
      NicknameValidation(nickname).then((res) => {
        if (res === "NON-DUPLICATE") {
          dispatch(nicknamePush({ memberId: memberId, nickname: nickname }))
          navigate("/mypage")
        } else if (res === "DUPLICATE") {
          setErrorMessage("중복된 닉네임입니다.")
        }
      })
    } else {
      setErrorMessage("닉네임을 한 글자 이상 작성해주세요.")
    }
  }

  return (
    <div className="w-6/12 flex justify-center items-center flex-col">
      <p className="text-3xl font-bold">
        집중에서 사용하실 닉네임을 입력해주세요.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input type="text" onChange={handleChange} />
        <div className="flex w-[322px] text-sm items-center text-red-600">
          {errorMessage}
        </div>
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
