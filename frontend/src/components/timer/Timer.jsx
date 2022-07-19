import React, { useState, useRef, useEffect } from "react"
import TimerImage from "./TimerImage.png"

const padNumber = (num, length) => {
  return String(num).padStart(length, "0")
}

export default function Timer({ time }) {
  const initialTime = useRef(time)
  const interval = useRef(null)

  const tempMin = parseInt(time / 60)
  const tempSec = time - tempMin * 60

  const [min, setMin] = useState(padNumber(tempMin, 2))
  const [sec, setSec] = useState(padNumber(tempSec, 2))

  useEffect(() => {
    interval.current = setInterval(() => {
      initialTime.current -= 1
      setSec(padNumber(initialTime.current % 60, 2))
      setMin(padNumber(parseInt(initialTime.current / 60), 2))
    }, 1000)
    return () => clearInterval(interval.current)
  }, [])

  useEffect(() => {
    if (initialTime.current <= 0) {
      clearInterval(interval.current)
    }
  }, [sec])

  return (
    <div
      style={{
        width: "280px",
        height: "280px",
        backgroundImage: `url(${TimerImage})`,
      }}
      className="bg-cover flex justify-center items-center"
    >
      <span className="text-4xl font-semibold">
        {min} : {sec}
      </span>
    </div>
  )
}
