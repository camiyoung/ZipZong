import React, { useEffect, useState } from "react"
import Calendar from "react-calendar"
//import "react-calendar/dist/Calendar.css"
import "./Calendar.css"

export default function CalendarForm() {
  const [value, setValue] = useState(new Date())
  console.log(value) // 날짜 + 시간까지

  return (
    <Calendar className="react-calendar" onChange={setValue} value={value} />
  )
}
