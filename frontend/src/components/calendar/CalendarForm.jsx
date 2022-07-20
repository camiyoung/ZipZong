import React, { useState } from "react"
import Calendar from "react-calendar"
import "./Calendar.css"
import moment from "moment"
const dailyRecord = ["18-07-2022", "17-07-2022", "16-07-2022"]

export default function CalendarForm() {
  const [date, setDate] = useState(new Date())

  return (
    <div className="app">
      <div className="calendar-container">
        <Calendar
          className="react-calendar"
          onChange={setDate} // 해당 날짜의 운동 현황 보여줘야 함
          value={date}
          // 일요일 앞에 나오는 코드
          calendarType="Hebrew"
          // 연도는 못 보게 하는 코드
          minDetail="month"
          maxDetail="month"
          // 달력에 '일' 빼는 코드
          formatDay={(locale, date) =>
            date.toLocaleString("en", { day: "numeric" })
          }
          // 운동을 한 날짜는 하이라이트 칠하는 코드
          tileClassName={({ date, view }) => {
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
        />
      </div>
    </div>
  )
}
