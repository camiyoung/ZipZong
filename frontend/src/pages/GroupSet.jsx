import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import CollectedIcons from "../features/group/CollectedIcons"
import GroupSetInfo from "../features/group/GroupSetInfo"
import GroupSetMemberList from "../features/group/GroupSetMemberList"

import {
  registrationTeam,
  teamDelete,
  teamInfo,
  teamAllIcons,
} from "../features/group/groupReducer"
import Modal from "../components/modal/Modal"
import "../components/button/PositiveBtn.css"
import "../components/button/NegativeBtn.css"
import "../components/button/NeutralBtn.css"

export default function GroupSet() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const fetchTeamId = location.pathname.split("/")[2]
  const { memberId } = useSelector((state) => state.member)
  const { registeredTeam } = useSelector((state) => state.mypage)
  useEffect(() => {
    dispatch(teamInfo(fetchTeamId))
    dispatch(teamAllIcons(fetchTeamId))
    // 그룹 삭제 후 렌더링 하는 코드
    if (memberId) {
      dispatch(registrationTeam(memberId))
    }
  }, [])

  const deleteTeamFunction = () => {
    dispatch(teamDelete({ teamId: fetchTeamId, memberId: memberId }))
    navigate("/mypage")
  }
  // 모달
  const [isOpen, setOpen] = useState(false)
  const modalClose = () => setOpen(false)

  return (
    <div className="w-full flex justify-center mt-5">
      <div className="w-4/5">
        <div className="w-full flex">
          <div className="w-[50%] pr-2">
            <GroupSetInfo />
            <CollectedIcons />
          </div>
          <div className="w-[50%]">
            <GroupSetMemberList />
          </div>
        </div>
        <div className="pt-5 flex justify-end mb-6">
          <button
            className="neutral-btn mr-6"
            role="button"
            onClick={() => navigate(`/group/${fetchTeamId}`)}
          >
            <p className="mb-1">그룹 페이지</p>
            <p>돌아가기</p>
          </button>
          <button
            className="negative-btn"
            role="button"
            onClick={() => setOpen(true)}
          >
            그룹 삭제
          </button>
        </div>
        <Modal isOpen={isOpen} modalClose={modalClose}>
          <div className="mt-5">
            <p className="text-center text-xl font-semibold">
              정말 그룹을 삭제하시겠습니까?
            </p>
            <p className="text-center text-[11px] mt-1 text-gray-600">
              삭제된 그룹은 다시 복구할 수 없으며 멤버들이 모두 탈퇴됩니다.
            </p>
            <div className="flex justify-evenly my-5">
              <button
                className="negative-btn mr-10"
                role="button"
                onClick={deleteTeamFunction}
              >
                예
              </button>
              <button
                className="positive-btn"
                role="button"
                onClick={modalClose}
              >
                아니오
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}
