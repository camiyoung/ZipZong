import React from "react"
import Logo from "../assets/Logo.svg"
import { useNavigate } from "react-router-dom"
const Forbidden = () => {
  const navigate = useNavigate()
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-secondary-100 to-lgBlue-200 fixed top-0 flex justify-center items-center ">
      <img src="/images/forbidden/forbidden.png" />
      <div className="flex flex-col items-center">
        <img src={Logo} />
        <h1 className=" text-2xl font-medium text-gray-500 my-5">
          권한이 없습니다.
        </h1>
        <button
          type="button"
          onClick={() => {
            navigate("/")
          }}
          className="text-white bg-gradient-to-r from-primary-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          메인페이지로 이동하기
        </button>
      </div>
    </div>
  )
}

export default Forbidden
