import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Button from "../../components/button/Button"
import { memberInfo, selectNickname, nicknamePush } from "./memberReducer"
import { NicknameValidation } from "../../utils/NicknameValidation"
import { http } from "../../api/axios"
export default function SetNickName() {
  // const dispatch = useDispatch()
  // const navigate = useNavigate()
  const [nickname, setNickname] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  // const memberId = useSelector((state) => state.member.memberId)

  const handleChange = ({ target: { value } }) => setNickname(value)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (nickname.length > 0) {
      // 닉네임 유효성 검사
      NicknameValidation(nickname).then(async (res) => {
        if (res === "NON-DUPLICATE") {
          const memberId = localStorage.getItem("memberId")
          const res = await http.post("member/nickname", { memberId, nickname })
          const res_nickname = res.data.data.nickname
          localStorage.setItem("nickname", res_nickname)
          window.location.replace("/")
        } else if (res === "DUPLICATE") {
          setErrorMessage("중복된 닉네임입니다.")
        }
      })
    } else {
      setErrorMessage("닉네임을 한 글자 이상 작성해주세요.")
    }
  }

  return (
    <div className="w-4/5 flex justify-start items-center flex-col">
      <p className="  text-lg  text-primary-500 mb-3 mt-[2.5rem]">
        집중에서 사용하실 닉네임을 입력해주세요.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <div className="relative z-0 mb-6 w-4/5 group">
          <input
            type="text"
            name="floating_last_name"
            id="floating_last_name"
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            maxLength="8"
            // required
          />
          <label
            htmlFor="floating_last_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            닉네임
          </label>
        </div>
        {/* <input
          type="text"
          onChange={handleChange}
          className="rounded-lg border-gray-300 h-8 w-4/5"
        /> */}
        <p className=" text-sm  text-red-400 my-3 h-4 align-top">
          {errorMessage ? errorMessage : " "}
        </p>
        <button
          type="submit"
          className="w-2/5 bg-gradient-to-r  from-lgBlue-400 to-mainBlue h-10 rounded-xl font-medium text-white focus:ring-4 focus:outline-none focus:ring-lgBlue-300"
        >
          회원 가입
        </button>
      </form>
    </div>
  )
}
