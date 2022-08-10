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

    // 그룹 삭제 후 렌더링 하는 코드
    dispatch(registrationTeam(memberId))
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
        <div className="mx-5 pt-5 flex justify-end">
          <Button
            text="그룹 삭제"
            height="h-10"
            bgColor="bg-danger"
            onClick={() => {
              setOpen(true)
            }}
          />
        </div>
        <Modal isOpen={isOpen} modalClose={modalClose}>
          <div className="mt-3 mb-3">
            <div className="flex justify-center mb-1">
              정말 그룹을 삭제하시겠습니까?
            </div>
            <div className="mb-3 text-red-600 text-sm flex justify-center">
              삭제된 그룹은 다시 복구할 수 없으며 멤버들이 모두 탈퇴됩니다.
            </div>
            <div className="flex justify-center pt-3">
              <div>
                <Button
                  text="아니오"
                  width="w-32"
                  bgColor="bg-info"
                  onClick={modalClose}
                />
              </div>
              <div className="ml-3">
                <Button
                  text="예"
                  bgColor="bg-danger"
                  width="w-32"
                  onClick={deleteTeamFunction}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}
