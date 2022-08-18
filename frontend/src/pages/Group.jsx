import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import {
  teamInfo,
  teamTotalExerciseCount,
  roomInfoGet,
} from "../features/group/groupReducer"
import { getRoutine } from "../features/routine/routineReducer"
import GroupInfo from "../features/group/GroupInfo"
import GroupRank from "../features/group/GroupRank"
import MemberList from "../features/group/MemberList"
import Line from "../components/Line"
import ExerciseInfo from "../features/group/ExerciseInfo"
import GroupExerciseInfo from "../features/group/GroupExerciseInfo"

import { Carousel } from "flowbite-react"

export default function Group() {
  const dispatch = useDispatch()
  const location = useLocation()
  const fetchTeamId = location.pathname.split("/")[2]
  useEffect(() => {
    dispatch(teamInfo(fetchTeamId))
    dispatch(teamTotalExerciseCount(fetchTeamId))
    dispatch(getRoutine(fetchTeamId))
    dispatch(roomInfoGet(fetchTeamId))
  }, [fetchTeamId])

  const { inviteLink } = useSelector((state) => state.group)

  return (
    <div className="pb-10">
      <div className="flex justify-center mt-5">
        <GroupInfo />
      </div>
      <div className="flex justify-center mt-5">
        {/* <div className="text-center">
          <p className="flex justify-center mb-5 font-bold text-3xl">
            🧑‍🤝‍🧑 멤버 리스트
          </p>
        </div> */}
        <MemberList inviteLink={inviteLink} />
      </div>
      <div className="flex justify-center flex-col items-center mt-20">
        <div className="text-center">
          <p className="flex justify-center mb-5 font-bold text-3xl">
            🧑‍🤝‍🧑 그룹 운동 정보
          </p>
        </div>
      </div>

      <div className="flex justify-center pb-10 w-full  h-[30rem]">
        <div className="w-full flex justify-center ">
          <Carousel slide={false}>
            <div className="w-full  justify-center h-full flex">
              <ExerciseInfo />
            </div>

            <div className="w-full justify-center h-full flex px-6">
              <GroupRank />
            </div>
          </Carousel>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <GroupExerciseInfo />
      </div>
    </div>
  )
}
