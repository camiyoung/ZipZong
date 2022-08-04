import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  memberExerciseHistoryCheck,
  memberExerciseHistorySumCheck,
  registrationTeam,
} from "./myPageReducer"
import CalendarForm from "../../components/calendar/CalendarForm"
import ImageIcon from "../../components/icon/ImageIcon"

const dayExerciseInfo = [
  {
    exerciseType: "윗몸일으키기",
    exerciseIcon:
      "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    exerciseTime: 900,
    exerciseCount: 1000,
  },
  {
    exerciseType: "Test1",
    exerciseIcon:
      "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    exerciseTime: 780,
    exerciseCount: 1001,
  },
  {
    exerciseType: "Test2",
    exerciseIcon:
      "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    exerciseTime: 600,
    exerciseCount: 1004,
  },
  {
    exerciseType: "Test4",
    exerciseIcon:
      "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    exerciseTime: 600,
    exerciseCount: 1004,
  },
  {
    exerciseType: "Test3",
    exerciseIcon:
      "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    exerciseTime: 600,
    exerciseCount: 1004,
  },
]

export default function ExerciseInfo() {
  const dispatch = useDispatch()
  const memberExeriseHistories = useSelector(
    (state) => state.mypage.memberDailyHistory
  )
  const currentStreak = useSelector((state) => state.mypage.memberCurrentStrick)
  const memberId = useSelector((state) => state.member.memberId)
  const year = useSelector((state) => state.mypage.selectedYear)
  const month = useSelector((state) => state.mypage.selectedMonth)
  const registeredTeams = useSelector((state) => state.mypage.registeredTeam)
  useEffect(() => {
    dispatch(
      memberExerciseHistoryCheck({
        memberId: memberId,
        year: year,
        month: month,
      })
    )
    dispatch(memberExerciseHistorySumCheck(memberId))
    dispatch(registrationTeam(memberId))
  }, [])

  let totalTime = 9

  return (
    <div className="flex mt-10 flex-col">
      <div className="flex">
        <div className="flex">
          <CalendarForm />
          <div
            className="border mx-5 rounded-lg border-gray-400 min-w-min bg-white"
            style={{
              boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
              width: "270px",
              height: "295.94px",
            }}
          >
            <div className="p-3">
              <p className="text-xl flex justify-center">
                총 운동 시간: {totalTime} 시간
              </p>
              <p className="mt-1 text-md flex justify-center">
                연속 {currentStreak}일째!
              </p>
            </div>
            <div
              className="overflow-scroll scrollbar-hide"
              style={{ height: "200px" }}
            >
              {dayExerciseInfo.map(
                ({ exerciseIcon, exerciseTime, exerciseCount }, idx) => {
                  return (
                    <div key={idx} className="flex m-5">
                      <ImageIcon image={exerciseIcon} size="middle" />
                      <div>
                        <p>운동 개수: {exerciseCount}</p>
                        <p>운동 시간: {exerciseTime}</p>
                      </div>
                    </div>
                  )
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
