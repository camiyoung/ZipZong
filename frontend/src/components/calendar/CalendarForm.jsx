import React, { useEffect, useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
export default function CalendarForm() {
  const [value, onChange] = useState(new Date())

  return (
    <Calendar
      className="
        my-auto
        w-3/5
        min-w-min
        max-width
        bg-white
        rounded-lg
        bg-opacity-90
        border
        border-solid
        border-black
        leading-5
      "
      onChange={onChange}
      value={value}
    />
  )
}
