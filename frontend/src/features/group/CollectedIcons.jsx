import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import Card from "../../components/card/Card"
import Button from "../../components/button/Button"
import ImageIcon from "../../components/icon/ImageIcon"
import { Tooltip } from "flowbite-react"

const prizes = [
  "bee",
  "elephant",
  "basic",
  "ferret",
  "frog",
  "pandaBear",
  "pig",
  "rabbit",
  "walrus",
  "yak",
]

export default function CollectedIcons() {
  const dispatch = useDispatch()
  const location = useLocation()
  const fetchTeamId = location.pathname.split("/")[2]
  const { icons, teamRepIcons } = useSelector((state) => state.group)

  return (
    <div className="flex justify-center flex-col mx-5 rounded-lg mt-14">
      <span className="text-3xl font-semibold mb-3">
        <span className="text-md mr-2">🎨</span>획득 아이콘
        <span className="text-base mb-3  font-medium ml-3">
          아이콘을 클릭하면 그룹 대표 아이콘이 변경됩니다.
        </span>
      </span>

      <div className="flex items-center rounded-3xl mt-5 shadow-md p-5 from-white custom-border2">
        <div className="flex flex-wrap">
          {prizes.map((imageUrl, idx) => {
            return (
              <Tooltip
                content="여기에 아이콘 어떻게 얻은건지 설명 들어갔으면 좋겠어요"
                placement="bottom"
              >
                <div className="m-2.5 cursor-pointer" key={idx}>
                  <ImageIcon
                    image={`images/badgeIcon/${imageUrl}.png`}
                    shape="round"
                    className="mx-1"
                    size="mdlarge"
                  />
                </div>
              </Tooltip>
            )
          })}
        </div>
      </div>
    </div>
  )
}
