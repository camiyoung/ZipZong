import React, { useEffect, useLayoutEffect, useMemo, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
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
import {
  teamMonthHistoryCheck,
  setTeamDailyHistory,
} from "../../features/group/groupReducer"
import Calendar from "react-calendar"
import "./Calendar.css"
import moment from "moment"

export default function CalendarForm() {
  const dispatch = useDispatch()
  const location = useLocation()
  const [date, setDate] = useState(new Date())
  const [activeDate, setActiveDate] = useState(new Date())
  const { memberId } = useSelector((state) => state.member)
  const { memberDailyHistory } = useSelector((state) => state.mypage)
  const { teamDailyHistory, showDate } = useSelector((state) => state.group)
  const [dayExercised, setDayExercised] = useState("")
  const [dayShield, setDayShield] = useState("")

  const [isGroup] = useState(location.pathname.split("/")[1])
  const [groupIdChanged, setGroupIdChanged] = useState("")

  useEffect(() => {
    setGroupIdChanged(location.pathname)
  }, [location.pathname])

  const loadDate = (currentDate) => {
    const validDate = currentDate || date
    const month = validDate.getMonth() + 1
    const year = validDate.getFullYear()
    dispatch(changeYear(year))
    dispatch(changeMonth(month))
    if (isGroup === "group") {
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
      dispatch(
        memberExerciseHistoryCheck({
          memberId: memberId,
          year: year,
          month: month,
        })
      )
    }
  }

  useEffect(() => {
    loadDate(activeDate)

    const tmpDay = date.getDate()
    dispatch(showYearChange(date.getFullYear()))
    dispatch(showMonthChange(date.getMonth() + 1))
    dispatch(showDayChange(tmpDay))

    if (isGroup === "group") {
      if (teamDailyHistory.length !== 0) {
        dispatch(setTeamDailyHistory(teamDailyHistory[tmpDay - 1].performs))
      }

      setDayExercised(
        teamDailyHistory.filter((e) => {
          if (e.state === "SUCCESS") return true
        })
      )
      setDayShield(
        teamDailyHistory.filter(({ state }) => {
          if (state === "SHIELD") return true
        })
      )
    } else {
      if (memberDailyHistory.length !== 0) {
        dispatch(setDailyHistory(memberDailyHistory[tmpDay - 1].performs))
      }
      setDayExercised(
        memberDailyHistory.filter((e) => {
          if (e.state === "SUCCESS") return true
        })
      )
      setDayShield("")
    }
  }, [date, activeDate, groupIdChanged])

  useEffect(() => {
    setDayExercised(
      memberDailyHistory.filter((e) => {
        if (e.state === "SUCCESS") return true
      })
    )
    setDayShield("")
  }, [memberDailyHistory])

  useEffect(() => {
    setDayExercised(
      teamDailyHistory.filter((e) => {
        if (e.state === "SUCCESS") return true
      })
    )
    setDayShield(
      teamDailyHistory.filter(({ state }) => {
        if (state === "SHIELD") return true
      })
    )
  }, [teamDailyHistory, groupIdChanged])

  return (
    <div className="app">
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

            for (let j = 0; j < dayShield.length; ++j) {
              if (date.getDate() === dayShield[j].day) {
                return "shield"
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
