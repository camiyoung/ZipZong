import React, { useState, useRef, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router"

import Modal from "../../components/modal/Modal"
import ImageIcon from "../../components/icon/ImageIcon"
import Button from "../../components/button/Button"
import { http } from "../../api/axios"
import { useParams } from "react-router"

const MemberInfo = ({ onClose, info }) => {
  return (
    <div className="absolute bg-white  z-30  " onClick={onClose}>
      <p>{info.nickname}</p>
      <p>{info.registrationDate}</p>
      <p>{info.lastExercised}</p>
      <p>{info.currentStrick}</p>
      <p>{info.maximumStrick}</p>
      <p>{info.totalTime}</p>
    </div>
  )
}

export default function MemberList() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { inviteLink, teamMembers, teamCurrentStreak } = useSelector(
    (state) => state.group
  )
  const [isOpen, setOpen] = useState(false)
  const modalClose = () => setOpen(false)
  const copyLinkRef = useRef()
  const [link, setLink] = useState("")

  const copyTextUrl = () => {
    copyLinkRef.current.focus()
    copyLinkRef.current.select()

    navigator.clipboard.writeText(copyLinkRef.current.value).then(() => {
      alert("링크를 복사했습니다.")
      modalClose()
    })
  }

  const [memberInfo, setMemberInfo] = useState()
  const [clicked, setClicked] = useState()
  const { teamId } = useParams()
  const currentMemberId = useSelector((state) => state.member.memberId)
  const { memberRepIcon, memberNickname } = useSelector((state) => state.member)
  const getMemberInfo = useCallback(async (memberId, idx) => {
    const {
      data: { data },
    } = await http.get(`information/member/${teamId}/${memberId}`)

    setMemberInfo(data)
  }, [])
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0)
  }, [])

  return (
    // group 원들의 정보를 받아야 함
    <div className="mt-10 w-4/5">
      {/* 초대 링크 모달 영역 시작 */}
      <Modal isOpen={isOpen} modalClose={modalClose}>
        <div className="flex justify-center flex-col items-center">
          <p className="text-3xl font-semibold text-center mb-2">초대링크</p>
          <img
            src="/images/inviteIcon/invite1.png"
            alt="초대링크 아이콘1"
            className="max-h-[100px] mb-4"
          />
          <p className="text-center text-secondary-800 mb-5">
            같이 운동할 사람을 초대해 보세요!
          </p>
          <div className="flex justify-center items-center">
            <input
              type="text"
              ref={copyLinkRef}
              value={`https://i7a805.p.ssafy.io/invite?groundId=${inviteLink}`}
              className="py-3 rounded-l-md"
              readOnly
            />
            <button
              className="text-white bg-blue-400 hover:bg-blue-600 h-[50px] w-[50px] rounded-r-md"
              onClick={() => copyTextUrl()}
            >
              복사
            </button>
            {/* <Button
            onClick={() => copyTextUrl()}
            text="복사"
            width="w-20"
          ></Button> */}
          </div>
        </div>
      </Modal>
      {/* 초대 링크 모달 영역 끝 */}
      {memberInfo && (
        <Modal isOpen={memberInfo} modalClose={() => setMemberInfo()}>
          <div className=" bg-white  z-30  w-30 flex flex-col justify-center items-center space-y-3 py-8 text-medium font-medium">
            <div>
              <ImageIcon
                image={`/images/badgeIcon/${memberInfo.memberIcon}.png`}
                size="large"
                shape="round"
                borderStyle="none"
              />
            </div>

            <div className=" text-xl my-4">{memberInfo.nickname}</div>
            <div className="border-t-2 border-t-lgBlue-400 pt-2 ">
              우리 팀 가입일 : {memberInfo.registrationDate[0]}년{" "}
              {memberInfo.registrationDate[1]}월{" "}
              {memberInfo.registrationDate[2]}일
            </div>
            {memberInfo.lastExercised && (
              <div className=" ">
                마지막 운동일 : {memberInfo.lastExercised[0]}년{" "}
                {memberInfo.lastExercised[1]}월 {memberInfo.lastExercised[2]}일
              </div>
            )}
            <div className=" ">현재 스트릭 : {memberInfo.currentStrick} 일</div>
            <div className=" ">최대 스트릭 : {memberInfo.maximumStrick} 일</div>
            <div className=" ">총 운동시간 : {memberInfo.totalTime} 분</div>
          </div>
        </Modal>
      )}

      <div className="flex w-full flex-wrap">
        {teamMembers.map(
          ({ nickname, repIcon, hasExercised, memberId }, idx) => {
            return (
              <div
                className="hover:scale-110 cursor-pointer w-[10%] px-2  relative"
                key={idx}
                onClick={() => {
                  getMemberInfo(memberId, idx)
                }}
              >
                <div
                  className={
                    hasExercised
                      ? "w-full h-full flex flex-col items-center rounded-3xl shadow-md py-8 bg-gradient-to-b from-teal-50 to-teal-200 border-2 border-white "
                      : "w-full h-full flex flex-col items-center rounded-3xl shadow-md py-8 border-2 border-gray-100 bg-gradient-to-b from-white to-gray-100"
                  }
                >
                  <div className="flex justify-center mb-2">
                    {" "}
                    {currentMemberId == memberId ? (
                      <ImageIcon
                        image={`/images/badgeIcon/${memberRepIcon}.png`}
                        size="large"
                        shape="round"
                        borderStyle="none"
                      />
                    ) : (
                      <ImageIcon
                        image={`/images/badgeIcon/${repIcon}.png`}
                        size="large"
                        shape="round"
                        borderStyle="none"
                      />
                    )}
                  </div>
                  <div className="text-sm font-medium flex justify-center px-5 h-[50px] items-center">
                    {currentMemberId == memberId ? memberNickname : nickname}
                  </div>
                </div>
              </div>
            )
          }
        )}

        {teamMembers.length < 10 ? (
          <div
            onClick={() => setOpen(true)}
            className="hover:scale-110 cursor-pointer w-[10%] px-2"
          >
            <div
              className={
                "w-full h-full flex flex-col items-center rounded-3xl shadow-md py-8 border-2 bg-white/20 hover:bg-white/40"
              }
            >
              <div className="flex justify-center mb-2">
                <img
                  src="/images/plus.png"
                  alt="플러스 아이콘"
                  className="w-[6rem] border-4 border-black rounded-full p-4"
                />
              </div>

              <div className="text-sm font-medium flex justify-center px-5 h-[50px] items-center">
                멤버 초대
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
