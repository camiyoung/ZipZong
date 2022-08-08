import React, { useEffect, useState } from "react"
import ImageIcon from "../../components/icon/ImageIcon"
import Modal from "../../components/modal/Modal"
import { memberIconSelect } from "./myPageReducer"
import { NicknameValidation } from "../../utils/NicknameValidation"
import { nicknameChange } from "../login/memberReducer"
import { useDispatch, useSelector } from "react-redux"
import { checkMemberId } from "./myPageReducer"
import "./Profile.css"

export default function Profile() {
  const dispatch = useDispatch()
  const { memberNickname, memberRepIcon } = useSelector((state) => state.member)
  const { memberCurrentStrick } = useSelector((state) => state.mypage)

  return (
    // 모달
    <div className="w-4/5 mt-5">
      <div className="flex">
        <div className="w-3/6 m-3 p-5 rounded-3xl bg-white shadow-md flex justify-center items-center">
          <div className="flex m-3 justify-center items-center w-full h-full ">
            <ImageIcon
              image={`images/animalIcon/${memberRepIcon}.png`}
              size="smmiddle"
              shape="round"
              borderStyle="none"
            />{" "}
            <p className=" ml-3 text-2xl">
              {" "}
              <span className="font-semibold">{memberNickname} </span> 님,
              오늘도 즐거운 운동 되세요!{" "}
            </p>
          </div>
        </div>
        <div className="w-3/6 m-3 h-[120px] moving-grad rounded-3xl flex items-center justify-center shadow-md">
          {/* <div className="w-3/6 m-3 h-[120px] bg-gradient-to-l from-blue-200 shadow-md to-lgBlue-300 rounded-3xl flex items-center justify-center"> */}
          <div>
            <div className="flex justify-center text-3xl font-semibold moving-grad__txt">
              🔥 오늘로{" "}
              <span className="mx-2 text-red-700">
                {" "}
                {memberCurrentStrick}일 째
              </span>{" "}
              운동 중이에요!
            </div>
            <div className="flex justify-center mt-2 text-lg">
              오늘로 총 2시간 30분 째 집에서 운동중!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
