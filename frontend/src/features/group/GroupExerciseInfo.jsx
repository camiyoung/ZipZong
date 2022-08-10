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
    <div className="flex mt-10">
      {console.log(performTeamTotals)}
      {performTeamTotals
        ? performTeamTotals.map(({ performName, performTotal }, idx) => {
            return (
              <div key={idx} className="flex">
                <ExerciseIcon
                  size="large"
                  shape="round"
                  image={performName}
                ></ExerciseIcon>
                <div className="flex flex-col mx-5">
                  <ChangeLanguage exercise={performName} />
                  <p>{performTotal}</p>
                </div>
              </div>
            )
          })
        : null}
    </div>
  )
}
