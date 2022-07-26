import React from "react"
import Button from "../../components/button/Button"

export default function SetNickName() {
  return (
    <div className="w-6/12 flex justify-center items-center flex-col">
      <p className="text-3xl font-bold">
        집중에서 사용하실 닉네임을 입력해주세요.
      </p>
      <form action="" className="flex flex-col items-center">
        <input type="text" />
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
