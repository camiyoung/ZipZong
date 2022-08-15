import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import ExerciseIcon from "../../components/icon/ExerciseIcon"
import { teamTotalExerciseCount } from "./groupReducer"
import ChangeLanguage from "../routine/ChangeLanguage"

const groupInfo = [
  {
    groupExerciseIcon:
      "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    groupExerciseName: "레그 레이즈",
    groupExerciseCount: "120",
  },
  {
    groupExerciseIcon:
      "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    groupExerciseName: "스쿼트",
    groupExerciseCount: "200",
  },
  {
    groupExerciseIcon:
      "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    groupExerciseName: "런지",
    groupExerciseCount: "130",
  },
  {
    groupExerciseIcon:
      "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    groupExerciseName: "팔굽혀펴기",
    groupExerciseCount: "380",
  },
  {
    groupExerciseIcon:
      "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    groupExerciseName: "마운틴 클라이밍",
    groupExerciseCount: "140",
  },
]

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
    <div className="flex flex-wrap mt-12 mb-20 w-full p-1">
      {performTeamTotals
        ? performTeamTotals.map(({ performName, performTotal }, idx) => {
            return (
              <div key={idx} className="w-[33.33%] p-3">
                <div className="flex text-lg items-center  bg-white rounded-2xl p-3 shadow-md w-full">
                  <div className="flex items-center w-[45%] ml-2">
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
  )
}
