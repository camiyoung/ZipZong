import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  changeYear,
  changeMonth,
  memberExerciseHistoryCheck,
  showYearChange,
  showMonthChange,
  showDayChange,
} from "../../features/myPage/myPageReducer"
import Calendar from "react-calendar"
import "./Calendar.css"
import moment from "moment"
const dailyRecord = ["18-07-2022", "17-07-2022", "16-07-2022"]

export default function CalendarForm() {
  const dispatch = useDispatch()
  const [date, setDate] = useState(new Date())
  const [activeDate, setActiveDate] = useState("")
  const { memberId } = useSelector((state) => state.member)
  const { memberDailyHistory, selectedMonth, selectedYear } = useSelector(
    (state) => state.mypage
  )

  function loadDate(currentDate) {
    const validDate = currentDate || date
    const month = validDate.getMonth() + 1
    const year = validDate.getFullYear()
    dispatch(changeYear(year))
    dispatch(changeMonth(month))
    dispatch(
      memberExerciseHistoryCheck({
        memberId: memberId,
        year: year,
        month: month,
      })
    )
  }
  useEffect(() => {
    loadDate(date)
    console.log("히스토리", memberDailyHistory)
  }, [activeDate])

  useEffect(() => {
    dispatch(showYearChange(date.getFullYear()))
    dispatch(showMonthChange(date.getMonth() + 1))
    dispatch(showDayChange(date.getDate()))
  }, [date])

  return (
    <div className="app w-1/4 ">
      <div className="calendar-container">
        <Calendar
          className="react-calendar p-5 h-[340px] rounded-3xl shadow-md"
          onChange={setDate} // 해당 날짜의 운동 현황 보여줘야 함
          value={date}
          onActiveStartDateChange={({ activeStartDate }) => {
            setActiveDate(activeStartDate)
            loadDate(activeStartDate)
          }}
          // 일요일 앞에 나오는 코드
          calendarType="Hebrew"
          // 연도는 못 보게 하는 코드
          minDetail="month"
          maxDetail="month"
          // 이전, 다음달 못보게 하는 코드
          showNeighboringMonth={false}
          // 달력에 '일' 빼는 코드
          formatDay={(locale, date) =>
            date.toLocaleString("en", { day: "numeric" })
          }
          tileClassName={({ date, view }) => {
            memberDailyHistory.map(
              ({ day, totalTime, state, performs }, index) => {
                // 달력에 칠하기
                return state === "success"
                  ? "highlight highlight-saturday"
                  : null
              }
            )

            // 달력에 색 칠하기
            if (memberDailyHistory[date.getDate() - 1] === 1) {
              // 토요일은 파란색
              return "highlight highlight-saturday"
            }
            if (
              dailyRecord.find((x) => x === moment(date).format("DD-MM-YYYY"))
            ) {
              if (moment(date).format("LLLL").split(",")[0] === "Saturday") {
                return "highlight highlight-saturday"
              } else if (
                moment(date).format("LLLL").split(",")[0] === "Sunday"
              ) {
                return "highlight highlight-sunday"
              }
              return "highlight"
            } else {
              if (moment(date).format("LLLL").split(",")[0] === "Saturday") {
                return "highlight-saturday"
              } else if (
                moment(date).format("LLLL").split(",")[0] === "Sunday"
              ) {
                return "highlight-sunday"
              }
            }
          }}
        ></Calendar>
      </div>
    </div>
  )
}
