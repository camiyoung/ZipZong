import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import CollectedIcons from "../features/group/CollectedIcons"
import GroupSetInfo from "../features/group/GroupSetInfo"
import GroupSetMemberList from "../features/group/GroupSetMemberList"

import Button from "../components/button/Button"
import {
  registrationTeam,
  teamDelete,
  teamInfo,
  teamAllIcons,
} from "../features/group/groupReducer"
import Modal from "../components/modal/Modal"

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
        <div className="mx-5 pt-5 flex justify-end mb-20">
          <div
            className="shadow-md border-2 w-[120px] h-[40px] border-white font-semibold flex justify-center p-1 rounded-2xl text-lg text-white cursor-pointer bg-gradient-to-t from-gray-500 to-gray-300 hover:bg-gradient-to-t hover:from-gray-600 hover:to-gray-400"
            onClick={() => setOpen(true)}
          >
            그룹 삭제
          </div>
        </div>
        <Modal isOpen={isOpen} modalClose={modalClose}>
          <div>
            <p className="text-center text-xl font-semibold">
              정말 그룹을 삭제하시겠습니까?
            </p>
            <p className="text-center text-[11px] mt-1 text-gray-600">
              삭제된 그룹은 다시 복구할 수 없으며 멤버들이 모두 탈퇴됩니다.
            </p>
            <div className="flex justify-evenly mt-5">
              <div
                className="shadow-md border-2 w-[120px] h-[40px] border-white font-semibold flex justify-center py-1 rounded-2xl text-lg text-white cursor-pointer bg-gradient-to-t from-red-500 to-red-300 hover:bg-gradient-to-t hover:from-red-600 hover:to-red-400"
                onClick={deleteTeamFunction}
              >
                예
              </div>
              <div
                className="shadow-md border-2 w-[120px] h-[40px] border-white font-semibold flex justify-center p-1 rounded-2xl text-lg text-white cursor-pointer bg-gradient-to-t from-lgBlue-500 to-lgBlue-300 hover:bg-gradient-to-t hover:from-lgBlue-600 hover:to-lgBlue-400"
                onClick={modalClose}
              >
                아니오
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}
