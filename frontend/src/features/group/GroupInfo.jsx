import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import Card from "../../components/card/Card"
import ImageIcon from "../../components/icon/ImageIcon"
import UserIcon from "../../components/icon/UserIcon"
import Button from "../../components/button/Button"
import Modal from "../../components/modal/Modal"
import SmallTextInput from "../../components/input/SmallTextInput"
import Select from "../../components/input/Select"
import Radio from "../../components/input/Radio"
import { teamInfo, teamResign } from "./groupReducer"
import { setRoutine } from "../room/exerciseReducer"

const MakeRoomForm = ({ teamId }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const teamRoutine = useSelector((state) => state.routine.routines)
  // console.log("팀아이디 : ", teamId)
  // console.log("팀 루틴 : ", teamRoutine)

  const [title, setTitle] = useState("")
  const [routineId, setRoutineId] = useState()
  const [errorMsg, setErrorMsg] = useState("")

  const enterRoom = () => {
    dispatch(setRoutine(routineId))
    navigate(`/room/${teamId}`)
  }

  const onSubmit = () => {
    console.log("제목", !!title, "선택된루틴", !!routineId)
    if (!!title && !!routineId) {
      console.log("완료")
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
  console.log(`탈퇴 모달 open 유저:${memberId}, 탈퇴할 팀 id:${teamId}`)
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
  const { teamLeader, teamMembers } = useSelector((state) => state.group)
  const [isLeader, setIsLeader] = useState(false)

  // 모달 관련 UseState
  const [isOpen, setOpen] = useState(false)
  const [modalContent, setModalContent] = useState("") // 모달 안에 들어갈 내용

  const modalClose = () => {
    setOpen(false)
    setModalContent("")
  }
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
    <div className="w-full ml-10">
      {/* 모달 영역 1 */}
      <Modal isOpen={isOpen} modalClose={modalClose}>
        {modalContent === "make" ? (
          <MakeRoomForm teamId={fetchTeamId} />
        ) : (
          <ResignTeam teamId={fetchTeamId} memberId={memberId} />
        )}
        {/*  */}
      </Modal>
      {/* 모달 영역 1 끝 */}

      {/* 카드 영역 */}
      <div className="">
        {/*  */}
        <Card>
          <div
            className="flex justify-center flex-col mb-1 hover:cursor-pointer"
            onClick={() => setModalContent("make")}
          >
            <p className="text-center text-xl font-semibold">
              아직 운동 방이 만들어지지 않았어요!
            </p>
            <p className="text-center text-md font-semibold">
              여기를 클릭하여 운동 방을 만들어 보세요
            </p>
          </div>
        </Card>
        <Card>
          <div
            className="flex justify-center flex-col mb-1 hover:cursor-pointer"
            onClick={() => setModalContent("make")}
          >
            <p className="text-center text-xl font-semibold">
              운동방이 만들어졌슴!! 제목
            </p>
            <p className="text-center text-md font-semibold">
              참여 인원, 참여자 목록
            </p>
            <p className="text-center text-md font-semibold">
              여기를 눌러 참여해보세요
            </p>
          </div>
        </Card>
      </div>
      <div className=" flex justify-evenly mt-5">
        <Button
          text="운동 루틴 관리"
          round="round3xl"
          height="h-10"
          width="w-full"
          // 그룹장만 운동관리
          onClick={() => navigate(`/routine/${fetchTeamId}`)}
        />
        {/*
        그룹장 ->그룹 설정 및 관리 보임
        그룹원 -> 그룹 탈퇴 보임
        */}
        {/* {isLeader && teamMembers.length > 2 ? ( */}

        {/* 지영: 그룹 탈퇴 버튼 누르면 나오는 모달 테스트 위해서 탈퇴버튼만 보이게 해뒀습니다. 원래 버전은 아래 주석 부분 */}
        <Button
          text="그룹 탈퇴"
          round="round3xl"
          height="h-10"
          width="w-full"
          onClick={() => setModalContent("resign")}
        />
        <Button
          text="그룹 설정 및 관리"
          round="round3xl"
          height="h-10"
          width="w-full"
          onClick={() => navigate(`/groupset/${fetchTeamId}`)}
        />
        {/* {isLeader ? (
          <Button
            text="그룹 설정 및 관리"
            round="round3xl"
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
        )} */}
      </div>
    </div>
  )
}

export default function GroupInfo() {
  const { teamName, teamMembers, teamContent, teamLeader, teamRepIcons } =
    useSelector((state) => state.group)
  return (
    <div className="w-full flex mt-5">
      <Card size="100%">
        <div className="flex">
          <ImageIcon
            image={`/images/badgeIcon/${teamRepIcons}.png`}
            size="middle"
            shape="round"
          />

          <div className="flex flex-col ml-10">
            <p className="text-xl">
              <strong>{teamName}</strong>
            </p>

            <div className="flex" style={{ fontSize: "11px" }}>
              <p>그룹장: {teamLeader.nickname}</p>
              <p className="flex">
                <UserIcon />
                {teamMembers.length} / 10
              </p>
            </div>
          </div>
        </div>
        <hr className="mb-3 mt-2" />
        <p className="text-md">{teamContent}</p>
      </Card>

      <GroupManagement />
    </div>
  )
}
