import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import ExerciseIcon from "../../components/icon/ExerciseIcon"
import { teamTotalExerciseCount } from "./groupReducer"
import ChangeLanguage from "../routine/ChangeLanguage"

export default function GroupExerciseInfo() {
  const dispatch = useDispatch()
  const location = useLocation()
  const fetchTeamId = location.pathname.split("/")[2]
  const { performTeamTotals, teamCurrentStreak } = useSelector(
    (state) => state.group
  )

  useEffect(() => {
    dispatch(teamTotalExerciseCount(fetchTeamId))
  }, [])

  return (
    <div className="flex mb-20 w-4/5 p-1">
      <div className="flex w-full flex-wrap ">
        {performTeamTotals
          ? performTeamTotals.map(({ performName, performTotal }, idx) => {
              return (
                <div key={idx} className="w-[33.33%] p-3">
                  <div className="flex text-lg items-center  bg-white rounded-2xl p-3 shadow-md w-full">
                    <div className="flex items-center w-[50%] ml-2">
                      <ExerciseIcon
                        size="middle"
                        shape="round"
                        image={performName}
                      ></ExerciseIcon>
                      <span className="font-bold ml-4">
                        <ChangeLanguage exercise={performName} />
                      </span>
                    </div>
                    총 <p className="mx-1">{performTotal}</p>회 했어요!
                  </div>
                </div>
              )
            })
          : null}
      </div>
    </div>
  )
}
