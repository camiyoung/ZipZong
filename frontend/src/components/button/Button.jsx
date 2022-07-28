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
const heightChart = {
  "h-3": "h-3",
  "h-4": "h-4",
  "h-5": "h-5",
  "h-6": "h-6",
  "h-7": "h-7",
  "h-8": "h-8",
  "h-9": "h-9",
  "h-10": "h-10",
}
const widthChart = {
  "w-20": "w-20",
  "w-24": "w-24",
  "w-28": "w-28",
  "w-32": "w-32",
  "w-36": "w-36",
  "w-40": "w-40",
  "w-44": "w-44",
  "w-48": "w-48",
  "w-52": "w-52",
  "w-56": "w-56",
  "w-64": "w-64",
  "w-72": "w-72",
  "w-full": "w-full",
}

export default function Button({
  text,
  bgColor,
  height,
  width,
  round,
  ...restProps
}) {
  const selectedBgColor = bgColor ? bgColorChart[bgColor] : bgColorChart.normal
  const roundType = round ? roundChart[round] : roundChart.roundMd
  const heightType = height ? heightChart[height] : heightChart["h-8"]
  const widthType = width ? widthChart[width] : widthChart["w-40"]
  return (
    /* 덜 round 한것 - Login, 회원가입, 취소, 확인 버튼 */
    <button
      className={`${selectedBgColor} ${roundType} ${heightType} ${widthType} px-5 font-semibold text-white `}
      {...restProps}
    >
      {text}
    </button>
  )
}
