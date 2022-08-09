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
  const [isOpen2, setOpen2] = useState(false)
  const modalClose2 = () => setOpen2(false)
  const modalClose = () => setOpen(false)

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

  return (
    <div className="w-full ml-10">
      {/* 모달 영역 1 */}
      <Modal isOpen={isOpen} modalClose={modalClose}>
        <form action="">
          <SmallTextInput inputName="방 제목"></SmallTextInput>
          <div className="flex">
            <p
              className="
                text-sm
                font-medium
                block
                w-24
                my-auto
                mr-6
              "
            >
              모드 설정
            </p>
            <Radio />
          </div>
          <Select
            selectName="루틴 설정"
            options="옵션의 value들"
            optionName="출력되는 값들"
          />
        </form>

        <div className="flex justify-end mt-5">
          <div className="mr-3">
            <Button text="개설" bgColor="bg-info" height="h-8" />
          </div>
          <div className="mr-3">
            <Button
              height="h-8"
              text="닫기"
              bgColor="bg-danger"
              onClick={() => modalClose()}
            />
          </div>
        </div>
      </Modal>
      {/* 모달 영역 1 끝 */}
      {/* 모달 영역 2 시작 */}
      <Modal isOpen={isOpen2} modalClose={modalClose2}>
        <p style={{ color: "red" }}>정말 그룹을 탈퇴하시겠습니까?</p>
        <Button
          text="탈퇴"
          onClick={() => {
            dispatch(teamResign({ teamId: fetchTeamId, memberId: memberId }))
            navigate("/mypage")
          }}
        />
        <Button text="취소" onClick={() => modalClose()} />
      </Modal>
      {/* 모달 영역 2 끝 */}
      {/* 카드 영역 */}
      <div className="">
        <Card>
          <div
            className="flex justify-center flex-col mb-1 hover:cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <p className="text-center text-xl font-semibold">
              아직 운동 방이 만들어지지 않았어요!
            </p>
            <p className="text-center text-md font-semibold">
              여기를 클릭하여 운동 방을 만들어 보세요
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
        {isLeader ? (
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
            onClick={() => setOpen2(true)}
          />
        )}
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
            image={`images/badgeIcon/${teamRepIcons}.png`}
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
