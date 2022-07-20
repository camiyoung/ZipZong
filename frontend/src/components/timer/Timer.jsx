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
    <div className="flex w-56 h-56 relative justify-center items-center ">
      <span className="text-4xl text font-semibold z-30">
        {min} : {sec}
      </span>
      <img
        src={TimerImage}
        alt=""
        className=" absolute w-full h-full flex-grow-0"
      />
    </div>
  )
}
