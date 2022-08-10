import "./GroupSetMemberList.css"

import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import ImageIcon from "../../components/icon/ImageIcon"
import UserIcon from "../../components/icon/UserIcon"
import Modal from "../../components/modal/Modal"
import Button from "../../components/button/Button"

const members = [
  {
    name: "신슬기",
    date: "2022.05.10",
    imageUrl: "bee",
    isLeader: true,
  },
  {
    name: "김준우",
    date: "2022.06.01",
    imageUrl: "frog",
    isLeader: false,
  },
  {
    name: "박종민",
    date: "2022.06.16",
    imageUrl: "ferret",
    isLeader: false,
  },
  {
    name: "안지영",
    date: "2022.06.11",
    imageUrl: "elephant",
    isLeader: false,
  },
  {
    name: "채송지",
    date: "2022.07.14",
    imageUrl: "yak",
    isLeader: false,
  },
  {
    name: "황승주",
    date: "2022.06.15",
    imageUrl: "walrus",
    isLeader: false,
  },
  // {
  //   name: "박종민",
  //   date: "2022.06.16",
  //   imageUrl: "ferret",
  //   isLeader: false,
  // },
  // {
  //   name: "안지영",
  //   date: "2022.06.11",
  //   imageUrl: "elephant",
  //   isLeader: false,
  // },
  // {
  //   name: "채송지",
  //   date: "2022.07.14",
  //   imageUrl: "yak",
  //   isLeader: false,
  // },
  // {
  //   name: "황승주",
  //   date: "2022.06.15",
  //   imageUrl: "walrus",
  //   isLeader: false,
  // },
]
export default function GroupSetMemberList() {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const fetchTeamId = location.pathname.split("/")[2]
  const { teamMembers, teamLeader } = useSelector((state) => state.group)
  const { memberId } = useSelector((state) => state.member)
  const [user, setUser] = useState()

  const [isExpulsionOpen, setExpulsionOpen] = useState(false)
  const modalExpulsionClose = () => setExpulsionOpen(false)
  const [isMandateOpen, setMandateOpen] = useState(false)
  const modalMandateClose = () => setMandateOpen(false)

  const GroupHover = ({ name, date, isLeader, imageUrl, idx }) => {
    return (
      <div key={idx} className="flex mb-4">
        <div className="flex p-4 rounded-tr-full rounded-br-full container w-[55%] shadow-md bg-white border-[#4abaee88] border-l-[20px]">
          <div className="flex image items-center px-2">
            <ImageIcon image={imageUrl} size="smmiddle" shape="round" />
            <span className="ml-3">{name}</span>
            <span className="mx-2">({date} 가입)</span>
            {isLeader ? <span className="w-min">👑</span> : null}
            {isLeader ? null : (
              <div class="overlay rounded-tr-full rounded-br-full">
                <div class="text">
                  <button
                    className="textBtn hover:bg-mainBlue px-3 py-1 rounded-xl text-white shadow-sm"
                    onClick={() => {
                      setMandateOpen(true)
                      setUser(name)
                    }}
                  >
                    그룹장 위임
                  </button>
                  <button
                    className="textBtn hover:bg-mainBlue px-3 py-1 ml-3 rounded-xl text-white shadow-sm"
                    onClick={() => {
                      setExpulsionOpen(true)
                      setUser(name)
                    }}
                  >
                    그룹원 강퇴
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  console.log("리더", teamLeader)
  return (
    <div className="ml-10 mt-5">
      {/* 회원 강퇴 모달 */}
      <Modal isOpen={isExpulsionOpen} modalClose={modalExpulsionClose}>
        <div className="mt-3 mb-3">
          <div className="flex justify-center mb-1">
            {user} 회원님을 정말 그룹에서 탈퇴 시키시겠습니까?
          </div>
          <div className="mb-3 text-red-600 text-sm flex justify-center">
            탈퇴된 회원의 누적 운동 정보는 사라지지 않습니다.
          </div>
          <div className="flex justify-center pt-3">
            <div>
              <Button
                text="아니오"
                width="w-32"
                bgColor="bg-info"
                onClick={() => setExpulsionOpen(false)}
              />
            </div>
            <div className="ml-3">
              <Button
                text="예"
                bgColor="bg-danger"
                width="w-32"
                // 회원 강퇴 로직
                // onClick={() =>
                //   dispatch(
                //     teamExpel({
                //       leaderId: leaderId,
                //       followerId: memberId,
                //       teamId: fetchTeamId,
                //     })
                //   )
                // }
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* 그룹장 위임 모달 */}
      <Modal isOpen={isMandateOpen} modalClose={modalMandateClose}>
        <div className="mt-3 mb-3">
          <div className="flex justify-center mb-1">
            {user} 회원님께 그룹장 직위를 넘기시겠습니까?
          </div>
          <div className="mb-3 text-gray-600 text-sm flex justify-center">
            위임 후 즉시 그룹 페이지로 이동됩니다.
          </div>
          <div className="flex justify-center pt-3">
            <div>
              <Button
                text="아니오"
                width="w-32"
                bgColor="bg-info"
                onClick={() => setMandateOpen(false)}
              />
            </div>
            <div className="ml-3">
              <Button
                text="예"
                bgColor="bg-danger"
                width="w-32"
                // 여기는 그룹장 위임 로직
                // 위임 후 그룹 페이지로 리다이렉트 시켜주세요 (일반 멤버의 그룹 설정 접근 불가)
                // onClick={() =>
                // }
              />
            </div>
          </div>
        </div>
      </Modal>
      {/* 그룹장 위임 모달 끝 */}

      <div className="flex items-center mb-6">
        <p className="text-3xl font-semibold">
          <span className="text-md mr-1">📝</span>회원 명단
        </p>
        <p className="flex items-center ml-3">
          <UserIcon />
          <span className="ml-1">
            {teamMembers.length}명 / {10}명
          </span>
          <span className="ml-4 text-gray-500">
            그룹장 위임 또는 멤버 강퇴가 가능합니다.
          </span>
        </p>
      </div>
      {members.map(({ name, date, isLeader, imageUrl }, idx) => {
        return (
          <GroupHover
            key={idx}
            name={name}
            date={date}
            isLeader={isLeader}
            imageUrl={`images/badgeIcon/${imageUrl}.png`}
          />
        )
      })}
    </div>
  )
}

// 회원 명단 클릭하였을떄 그룹장 위임 및 강퇴 메뉴가 나타나야 함! - 미구현
