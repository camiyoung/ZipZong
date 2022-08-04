import React, { useEffect, useState } from "react"
import ImageIcon from "../../components/icon/ImageIcon"
import Modal from "../../components/modal/Modal"
import Card from "../../components/card/Card"
import { memberIconSelect } from "./myPageReducer"
import { nicknameValidation, nicknameChange } from "../login/memberReducer"
import { useDispatch, useSelector } from "react-redux"
import { checkMemberId } from "./myPageReducer"

// 동물 사진들
import bee from "../../assets/animalIcon/bee.png"
import elephant from "../../assets/animalIcon/elephant.png"
import basic from "../../assets/animalIcon/basic.png"
import ferret from "../../assets/animalIcon/ferret.png"
import frog from "../../assets/animalIcon/frog.png"
import pandaBear from "../../assets/animalIcon/panda-bear.png"
import pig from "../../assets/animalIcon/pig.png"
import rabbit from "../../assets/animalIcon/rabbit.png"
import walrus from "../../assets/animalIcon/walrus.png"
import yak from "../../assets/animalIcon/yak.png"

const User = {
  Name: "신슬기",
  Profic: "https://i1.sndcdn.com/artworks-CDyMPstbky5qw7oe-NfF8Pg-t240x240.jpg",
  Icons: [
    bee,
    elephant,
    basic,
    ferret,
    frog,
    pandaBear,
    pig,
    rabbit,
    walrus,
    yak,
  ],
}

export default function Profile() {
  const dispatch = useDispatch()
  const [isOpen, setOpen] = useState(false)
  const modalClose = () => setOpen(false)
  const [nickname, setNickname] = useState("")
  const [icon, setIcon] = useState(rabbit)
  const [errorMessage, setErrorMessage] = useState("")
  const stateNickname = useSelector((state) => state.member.memberNickname)
  useEffect(() => {
    // setNickname(stateNickname)
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    if (nickname) {
      const validationResult = dispatch(nicknameValidation(nickname))
      if (validationResult) {
        dispatch(
          nicknameChange({
            origin: stateNickname,
            nickname: nickname,
            icon: icon,
          })
        )
        // dispatch(memberIconSelect({ nickname: nickname, icon: icon }))
        modalClose()
        setErrorMessage("")
      } else {
        setErrorMessage("중복된 닉네임입니다.")
      }
    } else {
      setErrorMessage("닉네임을 한 글자 이상 작성해주세요.")
    }
  }
  return (
    // 모달
    <div className="w-4/5 mt-5">
      <Modal isOpen={isOpen} modalClose={modalClose}>
        <form onSubmit={handleSubmit}>
          <div className="text-xl flex justify-center pb-5 font-bold">
            프로필 수정
          </div>
          <div className="flex">
            <div className="pr-5">
              <div className="flex justify-center pb-3">대표 아이콘</div>
              <div>
                <ImageIcon image={icon} shape="round" size="xLarge" />
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                <div className="">
                  <div className="pb-2">닉네임</div>
                  <div className="w-[280px]">
                    <input
                      type="text"
                      className="
                    mb-3
                      h-9
                      w-[280px]
                      block
                      bg-gray-50
                      rounded-lg
                      text-sm
                      border
                      border-gray-300
                      focus:ring-primary-400
                      focus:border-primary-400
                    "
                      onChange={(event) => {
                        setNickname(event.target.value)
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="pb-2 flex">
                  <span>아이콘 설정 </span>
                  <span className="text-sm ml-1 text-gray-300 flex items-center">
                    운동으로 아이콘을 모아보세요.
                  </span>
                </div>

                <div className="flex w-[300px] flex-wrap">
                  {User.Icons.map((icon, idx) => {
                    return (
                      <div
                        onClick={() => {
                          setIcon(icon)
                        }}
                        key={idx}
                        className="mr-1 mb-1 cursor-pointer"
                      >
                        <div className="hover:border-primary-400 border-[2px] border-white border rounded-full ">
                          <ImageIcon
                            image={icon}
                            size="smmiddle"
                            shape="round"
                            borderStyle="none"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="py-3 flex mt-3">
            <div className="flex w-[322px] text-sm items-center text-red-600">
              {errorMessage}
            </div>
            <div className="r-0">
              <button
                type="submit"
                className="bg-lightBlue rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-gray-700 hover:bg-primary-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                정보 수정
              </button>
            </div>
          </div>
        </form>
      </Modal>
      <div className="flex">
        <div className="w-3/6 m-3 p-5 bg-white rounded-3xl bg-opacity-75">
          <div className="flex justify-center m-3">
            <ImageIcon
              image={icon}
              size="smmiddle"
              shape="round"
              borderStyle="none"
            />{" "}
            <p className=" ml-3 text-2xl font-semibold">
              {" "}
              <span className="font-semibold">{stateNickname} </span> 님, 오늘도
              즐거운 운동 되세요!{" "}
            </p>
          </div>
          <div className="flex justify-center mb-3">수정 버튼</div>
        </div>
        <div className="w-3/6 m-3 p-5 bg-lgBlue-200 rounded-3xl bg-opacity-75 flex flex-col item-center">
          <div className="flex justify-center font-semibold text-3xl font-semibold">
            🔥 오늘로 <span className="mx-2 text-red-500"> 7일 째</span> 운동
            중이에요!
          </div>
          <div className="flex justify-center mt-1">
            집중에서 총 7시간 운동을 했어요.
          </div>
        </div>
      </div>

      {/* <div className="flex items-center justify-center">
        <div className="w-[600px] h-12 bg-lightBlue border-2 m-2 rounded-3xl">
          <div className="flex items-center justify-center h-full w-full">
            <ImageIcon
              image={icon}
              size="small"
              shape="round"
              borderStyle="none"
            />
            <p className="text-sm p-2">
              <span className="font-semibold">{stateNickname} </span> 님, 오늘도
              즐거운 운동 되세요!
            </p>
            <Button
              onClick={() => setOpen(true)}
              text="수정"
              height="h-12"
            ></Button>
          </div>
        </div>
      </div> */}
    </div>
  )
}
