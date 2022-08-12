import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import {
  changeYear,
  changeMonth,
  memberExerciseHistoryCheck,
  showYearChange,
  showMonthChange,
  showDayChange,
  setDailyHistory,
} from "../../features/myPage/myPageReducer"
import { teamMonthHistoryCheck } from "../../features/group/groupReducer"
import Calendar from "react-calendar"
import "./Calendar.css"
import moment from "moment"
const dailyRecord = ["18-08-2022", "17-08-2022", "16-08-2022"]

export default function CalendarForm() {
  const dispatch = useDispatch()
  const location = useLocation()
  const [date, setDate] = useState(new Date())
  const [activeDate, setActiveDate] = useState("")
  const { memberId } = useSelector((state) => state.member)
  const { memberDailyHistory, selectedMonth, selectedYear } = useSelector(
    (state) => state.mypage
  )
  const [dayExercised, setDayExercised] = useState("")

  const isGroup = useState(location.pathname.split("/")[1])

  function loadDate(currentDate) {
    const validDate = currentDate || date
    const month = validDate.getMonth() + 1
    const year = validDate.getFullYear()
    dispatch(changeYear(year))
    dispatch(changeMonth(month))
    if (isGroup[0] === "group") {
      let teamId = location.pathname.split("/")[2]
      dispatch(
        teamMonthHistoryCheck({
          teamId: teamId,
          year: year,
          month: month,
        })
      )
    } else {
      if (!memberId) return
      console.log("year, month", year, month)
      dispatch(
        memberExerciseHistoryCheck({
          memberId: memberId,
          year: year,
          month: month,
        })
      )

      console.log("memberDailyHistory", memberDailyHistory)
    }
  }
  useEffect(() => {
    loadDate(activeDate)
  }, [activeDate])

  useEffect(() => {
    const tmpDay = date.getDate()
    dispatch(showYearChange(date.getFullYear()))
    dispatch(showMonthChange(date.getMonth() + 1))
    dispatch(showDayChange(tmpDay))
    if (memberDailyHistory.length !== 0) {
      dispatch(setDailyHistory(memberDailyHistory[tmpDay - 1].performs))
    }
    setDayExercised(
      memberDailyHistory.filter(({ state }) => {
        if (state === "SUCCESS") return true
      })
    )
  }, [])

  useEffect(() => {
    const tmpDay = date.getDate()
    dispatch(showYearChange(date.getFullYear()))
    dispatch(showMonthChange(date.getMonth() + 1))
    dispatch(showDayChange(tmpDay))

    // 값이 있을때만 performs 객체 접근
    if (memberDailyHistory.length !== 0) {
      dispatch(setDailyHistory(memberDailyHistory[tmpDay - 1].performs))
    }
    setDayExercised(
      memberDailyHistory.filter((e) => {
        if (e.state === "SUCCESS") return true
      })
    )
  }, [date, activeDate])

  console.log("하루 기록", dayExercised)
  return (
    <div className="app w-1/4 min-w-[285px]">
      <div className="calendar-container">
        <Calendar
          className="react-calendar p-5 h-[340px] rounded-3xl shadow-md"
          onChange={setDate} // 해당 날짜의 운동 현황 보여줘야 함
          value={date}
          onActiveStartDateChange={({ activeStartDate }) => {
            setActiveDate(activeStartDate)
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
          tileClassName={({ date }) => {
            for (let i = 0; i < dayExercised.length; ++i) {
              if (date.getDate() === dayExercised[i].day) {
                return "highlight"
              }
            }

            // 토요일: 파란색, 일요일: 빨간색
            if (moment(date).format("LLLL").split(",")[0] === "Saturday") {
              return "highlight-saturday"
            } else if (moment(date).format("LLLL").split(",")[0] === "Sunday") {
              return "highlight-sunday"
            }
          }}
        ></Calendar>
      </div>
    </div>
  )
}
