import React from "react"
const bgColorChart = {
  normal: "bg-lightBlue hover:bg-mainBlue",
  "bg-info": "bg-info",
  "bg-danger": "bg-danger",
}
const roundChart = {
  roundMd: "rounded-md",
  round3xl: "rounded-3xl",
}

export default function Button({ text, bgColor, round }) {
  const selectedBgColor = bgColor ? bgColorChart[bgColor] : bgColorChart.normal
  const roundType = round ? roundChart[round] : roundChart.roundMd
  return (
    <div>
      {/* 덜 round 한것 - Login, 회원가입, 취소, 확인 버튼 */}
      <button
        className={`${selectedBgColor} ${roundType} py-2 px-4 font-semibold text-white `}
      >
        {text}
      </button>
    </div>
  )
}
