import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import Card from "../../components/card/Card"
import Button from "../../components/button/Button"
import ImageIcon from "../../components/icon/ImageIcon"
import { Tooltip } from "flowbite-react"
import ShowExpression from "./ShowExpression"

import { teamRepIconModify } from "./groupReducer"

export default function CollectedIcons() {
  const dispatch = useDispatch()
  const location = useLocation()
  const fetchTeamId = location.pathname.split("/")[2]
  const { basicTeamIcons, icons } = useSelector((state) => state.group)
  const [allGroupIcons, setAllGroupIcons] = useState("")
  useEffect(() => {
    setAllGroupIcons([...icons, ...basicTeamIcons])
  }, [icons])

  return (
    <div className="flex justify-center flex-col mx-5 rounded-lg mt-14">
      <span className="text-3xl font-semibold mb-3">
        <span className="text-md mr-2">π¨</span>νλ μμ΄μ½
        <span className="text-base mb-3  font-medium ml-3">
          μμ΄μ½μ ν΄λ¦­νλ©΄ κ·Έλ£Ή λν μμ΄μ½μ΄ λ³κ²½λ©λλ€.
        </span>
      </span>

      <div className="flex items-center rounded-3xl mt-5 shadow-md p-5 from-white custom-border2">
        <div className="flex flex-wrap">
          {allGroupIcons
            ? allGroupIcons.map((imageName, idx) => {
                return (
                  <Tooltip
                    content={<ShowExpression imageUrl={imageName} />}
                    placement="bottom"
                    key={idx}
                  >
                    <div
                      className="m-2.5 cursor-pointer"
                      onClick={() => {
                        dispatch(
                          teamRepIconModify({
                            teamId: fetchTeamId,
                            iconName: imageName,
                          })
                        )
                      }}
                    >
                      <ImageIcon
                        image={`/images/badgeIcon/${imageName}.png`}
                        shape="round"
                        className="mx-1"
                        size="mdlarge"
                      />
                    </div>
                  </Tooltip>
                )
              })
            : null}
        </div>
      </div>
    </div>
  )
}
