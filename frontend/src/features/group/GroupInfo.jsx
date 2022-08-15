import "./Group.css"

import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import ImageIcon from "../../components/icon/ImageIcon"
import UserIcon from "../../components/icon/UserIcon"
import Button from "../../components/button/Button"
import Modal from "../../components/modal/Modal"
import { teamInfo, teamResign } from "./groupReducer"
import { setRoutine } from "../room/exerciseReducer"

const MakeRoomForm = ({ teamId }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const teamRoutine = useSelector((state) => state.routine.routines)

  const [title, setTitle] = useState("")
  const [routineId, setRoutineId] = useState()
  const [errorMsg, setErrorMsg] = useState("")

  const enterRoom = () => {
    dispatch(setRoutine(routineId))
    navigate(`/room/${teamId}`)
  }

  const onSubmit = () => {
    if (!!title && !!routineId) {
      enterRoom()
    } else {
      setErrorMsg("제목과 루틴 선택은 필수입니다.")
    }
  }

  return (
    <div>
      <form action="">
        <div>
          <label htmlFor="title">방 제목</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            id="title"
          />
        </div>
        <div>
          <label htmlFor="routine">루틴</label>
          <select
            onChange={(event) => setRoutineId(event.target.value)}
            value={routineId}
            id="routine"
          >
            <option value="">루틴을 선택하세요 </option>
            {teamRoutine.map((routine) => (
              <option value={routine.routineId} key={routine.routineId}>
                {routine.routineName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-red-500">{errorMsg}</p>
        </div>
        <button type="button" onClick={onSubmit}>
          생성
        </button>
      </form>
    </div>
  )
}

const ResignTeam = ({ teamId, memberId }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div>
      <p style={{ color: "red" }}>정말 그룹을 탈퇴하시겠습니까?</p>
      <Button
        text="탈퇴"
        onClick={() => {
          dispatch(teamResign({ teamId, memberId }))
          navigate("/mypage")
        }}
      />
    </div>
  )
}

function GroupManagement() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const fetchTeamId = location.pathname.split("/")[2]
  const { memberId, memberNickname } = useSelector((state) => state.member)
  const { teamLeader, teamMembers, roomStatus, roomParticipant, roomName } =
    useSelector((state) => state.group)
  const [isLeader, setIsLeader] = useState(false)

  // 모달 관련 UseState
  const [isOpen, setOpen] = useState(false)
  const [modalContent, setModalContent] = useState("") // 모달 안에 들어갈 내용

  const modalClose = () => {
    setModalContent("")
    setOpen(false)
  }

  const enterRoom = () => {
    if (!fetchTeamId) {
      window.alert("올바른 그룹 페이지가 아닙니다")
      return
    }
    navigate(`/room/${fetchTeamId}`)
  }

  const memberList = roomParticipant ? roomParticipant.join(" ") : null

  // useEffect
  useEffect(() => {
    dispatch(teamInfo(fetchTeamId))
    if (teamLeader.nickname === memberNickname) {
      setIsLeader(true)
    } else {
      // 실험적으로 그룹장으로 승급
      setIsLeader(true)
    }
  }, [])

  useEffect(() => {
    // 모달 오픈 상태 확인후 모달창 열기
    if (modalContent) setOpen(true)
  }, [modalContent])

  return (
    <div className="w-1/2 ml-10">
      {/* 모달 영역 1 */}
      <Modal isOpen={isOpen} modalClose={modalClose}>
        {modalContent === "make" && <MakeRoomForm teamId={fetchTeamId} />}
        {modalContent === "resign" && (
          <ResignTeam teamId={fetchTeamId} memberId={memberId} />
        )}
      </Modal>
      {/* 모달 영역 1 끝 */}

      {/* 카드 영역 */}
      <div className="">
        {roomStatus === "EMPTY" && (
          <div
            className="btn rounded-3xl bg-gradient-to-r from-gray-100 to-gray-200 py-6 cursor-pointer shadow-md border-2 border-white grad3"
            onClick={() => setModalContent("make")}
          >
            <div className="flex justify-center flex-col mb-1 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              <p className="text-center text-3xl font-semibold mb-2">
                아직 운동 방이 만들어지지 않았어요!
              </p>
              <p className="text-center text-md font-semibold">
                여기를 클릭하여 운동 방을 만들어 보세요
              </p>
            </div>
          </div>
        )}
        {roomStatus === "READY" && (
          <div
            className="btn rounded-3xl bg-gradient-to-br py-6 cursor-pointer shadow-md border-2 border-white grad"
            onClick={enterRoom}
          >
            <div className="flex justify-center flex-col mb-1">
              <p className="text-center text-3xl font-semibold mb-2 ">
                🔥 {roomName} 🔥
              </p>
              <p className="text-center font-semibold flex justify-center items-center text-gray-700">
                <UserIcon /> {roomParticipant.length} / 10{" "}
                <span className="ml-2 font-medium">{memberList}</span>
              </p>
            </div>
          </div>
        )}
        {roomStatus === "EXERCISING" && (
          <div className="btn rounded-3xl bg-gradient-to-br py-6 shadow-md border-2 border-white grad2">
            <div className="flex justify-center flex-col mb-1">
              <p className="text-center text-3xl font-semibold mb-2 ">
                운동을 이미 시작한 방입니다.
              </p>
              <p className="text-center font-semibold flex justify-center items-center text-gray-700">
                <UserIcon /> {roomParticipant.length} / 10{" "}
                <span className="ml-2 font-medium">{memberList}</span>
              </p>
            </div>
          </div>
        )}
      </div>
      <div className=" flex justify-evenly mt-4">
        <div className="w-full pr-2">
          <Button
            text="운동 루틴 관리"
            height="h-10"
            width="w-full"
            // 그룹장만 운동관리
            onClick={() => navigate(`/routine/${fetchTeamId}`)}
          />
        </div>
        <div className="w-full pl-2">
          {isLeader ? (
            <Button
              text="그룹 설정 및 관리"
              height="h-10"
              width="w-full"
              onClick={() => navigate(`/groupset/${fetchTeamId}`)}
            />
          ) : (
            <Button
              text="그룹 탈퇴"
              round="round3xl"
              height="h-10"
              width="w-full"
              onClick={() => setModalContent("resign")}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default function GroupInfo() {
  const { teamName, teamMembers, teamContent, teamLeader, teamRepIcons } =
    useSelector((state) => state.group)

  return (
    <div className="w-full flex mt-5">
      <div className="w-1/2 flex items-center rounded-3xl py-8 px-8 custom-border">
        <div className="flex justify-center items-center mr-5">
          {teamRepIcons ? (
            <ImageIcon
              size="large"
              image={`/images/badgeIcon/${teamRepIcons}.png`}
              shape="round"
            />
          ) : null}
        </div>
        <div className="w-4/5">
          <div className="mb-2">
            <p className="text-3xl font-semibold mb-1">{teamName}</p>
            <div className="flex items-center">
              <p className="mr-1">그룹장:</p>{" "}
              <p className="mr-2"> {teamLeader.nickname}</p>
              <p className="flex items-center">
                <UserIcon />
                {teamMembers.length} / 10
              </p>
            </div>
          </div>
          <div>
            <p className=""> {teamContent} </p>
          </div>
        </div>
      </div>

      <GroupManagement />
    </div>
  )
}
