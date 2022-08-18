import "./Group.css"

import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation, Link } from "react-router-dom"
import ImageIcon from "../../components/icon/ImageIcon"
import UserIcon from "../../components/icon/UserIcon"
import Button from "../../components/button/Button"
import Modal from "../../components/modal/Modal"
import { teamInfo, teamResign, registrationTeam } from "./groupReducer"
import { setRoutine, setRoomTitle } from "../room/exerciseReducer"
import "../../components/button/PositiveBtn.css"
import "../../components/button/NegativeBtn.css"

const MakeRoomForm = ({ teamId }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const teamRoutine = useSelector((state) => state.routine.routines)

  const [title, setTitle] = useState("")

  const [errorMsg, setErrorMsg] = useState("")

  const enterRoom = () => {
    dispatch(setRoomTitle(title))
    navigate(`/room/${teamId}`)
  }

  const onSubmit = () => {
    if (!!title) {
      enterRoom()
    } else {
      setErrorMsg("방 제목은 필수입니다.")
    }
  }

  useEffect(() => {
    if (title) setErrorMsg("")
  }, [title])

  return (
    <div className=" w-full p-4 ">
      <h1 className="text-xl font-semibold text-center mb-2">운동방 만들기</h1>
      {teamRoutine?.length === 0 ? (
        <div className="w-full ">
          <div className=" my-3 p-5">
            <p className="text-center">그룹의 운동 루틴이 없습니다!</p>
            <p className="text-center">
              운동 시작을 위해서는 1개 이상의 루틴이 필요합니다.
            </p>
          </div>
          <Link to={`/routine/${teamId}`}>
            <div className="flex pt-2 text-lgBlue-600 justify-center font-bold text-md">
              <button className="bg-lgBlue-200 border border-white w-[250px]   font-bold text-xl rounded-2xl p-3 shadow-lg">
                루틴 만들기
              </button>
            </div>
          </Link>
        </div>
      ) : (
        <form
          action=""
          className="w-full flex flex-col items-center justify-center p-12 pb-4"
        >
          <p className="text-center mb-4">
            {" "}
            새로운 운동방의 제목을 입력해주세요.
          </p>

          <div className="relative z-0 mb-4 mt-2  w-4/5  group ">
            <input
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              maxLength="20"
              onChange={(event) => setTitle(event.target.value)}
              // required
            />
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              방 제목
            </label>
          </div>

          <div>
            <p className="text-red-500 h-12">
              {errorMsg && <div>{errorMsg}</div>}
            </p>
          </div>
          <div className="flex pt-2 text-lgBlue-600 justify-center font-bold text-md">
            <button
              type="button"
              onClick={onSubmit}
              className="bg-lgBlue-200 border border-white w-[250px]   font-bold text-xl rounded-2xl p-3 shadow-lg"
            >
              방 만들기
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

const ResignTeam = ({ teamId, memberId, modalClose }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div>
      <p className="text-center text-xl font-semibold mt-[1rem]">
        정말 그룹을 탈퇴하시겠습니까?
      </p>
      <p className="text-center text-[11px] mt-1 text-gray-600">
        탈퇴하시면 운동 기록 및 달성 아이콘들이 삭제됩니다.
      </p>
      <div className="flex justify-evenly mt-5 mb-[1rem]">
        <button
          className="negative-btn"
          role="button"
          onClick={() => {
            dispatch(teamResign({ teamId, memberId }))
            dispatch(registrationTeam(memberId))
            navigate("/mypage")
          }}
        >
          탈퇴
        </button>
        <button className="positive-btn" role="button" onClick={modalClose}>
          취소
        </button>
      </div>
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
  const [isOpen, setRealOpen] = useState(false)
  const [modalContent, setModalContent] = useState("") // 모달 안에 들어갈 내용

  const setOpen = async (value) => {
    await setRealOpen(value)
  }

  const modalClose = async () => {
    await setOpen(false)
    setModalContent("")
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
    // dispatch(teamInfo(fetchTeamId))
    if (teamLeader && teamLeader.nickname === memberNickname) {
      setIsLeader(true)
    } else {
      setIsLeader(false)
    }
  }, [teamLeader])

  useEffect(() => {
    // 모달 오픈 상태 확인후 모달창 열기
    if (modalContent) setOpen(true)
  }, [modalContent])

  return (
    <div className="w-1/2 ml-10">
      {/* 모달 영역 1 */}
      {modalContent && (
        <Modal isOpen={isOpen} modalClose={modalClose}>
          {modalContent === "make" && (
            <MakeRoomForm teamId={fetchTeamId} modalClose={modalClose} />
          )}
          {modalContent === "resign" && (
            <ResignTeam
              teamId={fetchTeamId}
              memberId={memberId}
              modalClose={modalClose}
            />
          )}
        </Modal>
      )}
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
          <div
            className="shadow-md border-2 border-white font-semibold flex justify-center p-2 rounded-2xl text-lg text-white cursor-pointer bg-gradient-to-t from-lgBlue-500 to-lgBlue-300 hover:bg-gradient-to-t hover:from-lgBlue-600 hover:to-lgBlue-400"
            onClick={() => navigate(`/routine/${fetchTeamId}`)}
          >
            운동 루틴 관리
          </div>
        </div>
        <div className="w-full pl-2">
          {isLeader ? (
            <div
              className="shadow-md border-2 border-white font-semibold flex justify-center p-2 rounded-2xl text-lg text-white cursor-pointer bg-gradient-to-t from-lgBlue-500 to-lgBlue-300 hover:bg-gradient-to-t hover:from-lgBlue-600 hover:to-lgBlue-400"
              onClick={() => navigate(`/groupset/${fetchTeamId}`)}
            >
              그룹 설정 및 관리
            </div>
          ) : (
            <div
              className="shadow-md border-2 border-white font-semibold flex justify-center p-2 rounded-2xl text-lg text-white cursor-pointer bg-gradient-to-t from-lgBlue-500 to-lgBlue-300 hover:bg-gradient-to-t hover:from-lgBlue-600 hover:to-lgBlue-400"
              onClick={() => setModalContent("resign")}
            >
              그룹 탈퇴
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function GroupInfo() {
  const {
    teamName,
    teamMembers,
    teamContent,
    teamLeader,
    teamRepIcons,
    teamCurrentStreak,
  } = useSelector((state) => state.group)

  return (
    <div className="w-4/5 flex mt-5 px-3">
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
            <div className="text-3xl font-semibold mb-1 flex items-center">
              {teamName}
              <div className="flex justify-center ml-2">
                <span className="text-sm grad p-1 rounded-full px-2 flex justify-center">
                  🔥 {teamCurrentStreak}일 다 같이 운동중!🔥
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <p className="mr-1">그룹장:</p>{" "}
              {teamLeader ? (
                <p className="mr-2"> {teamLeader.nickname}</p>
              ) : null}
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
