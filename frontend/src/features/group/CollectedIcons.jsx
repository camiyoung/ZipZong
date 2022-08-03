import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import Card from "../../components/card/Card"
import Button from "../../components/button/Button"
import ImageIcon from "../../components/icon/ImageIcon"

// 동물 사진들
import bee from "../../assets/animalIcon/bee.png"
import elephant from "../../assets/animalIcon/elephant.png"
import basic from "../../assets/animalIcon/basic.png"
import ferret from "../../assets/animalIcon/ferret.png"
import frog from "../../assets/animalIcon/frog.png"
import pandaBear from "../../assets/animalIcon/panda-bear.png"
import pig from "../../assets/animalIcon/pig.png"
import rabbit from "../../assets/animalIcon/rabbit.png"
import walrus from "../../assets/animalIcon/walrus.png"
import yak from "../../assets/animalIcon/yak.png"

const prizes = [
  bee,
  elephant,
  basic,
  ferret,
  frog,
  pandaBear,
  pig,
  rabbit,
  walrus,
  yak,
]

export default function CollectedIcons() {
  const dispatch = useDispatch()
  const location = useLocation()
  const fetchTeamId = location.pathname.split("/")[2]
  const { icons, teamRepIcons } = useSelector((state) => state.group)

  useEffect(() => {
    // dispatch()
  }, [])

  return (
    <Card
      className="flex justify-center flex-col mx-5 rounded-lg mt-5"
      size="100%"
    >
      <p className="text-3xl font-semibold mb-1">획득 아이콘</p>
      <div className="flex overflow-scroll">
        {prizes.map((imageUrl, idx) => {
          return (
            <div className="mr-5 mt-5 cursor-pointer" key={idx}>
              <ImageIcon
                image={imageUrl}
                shape="round"
                className="mx-1"
                size="large"
              />
            </div>
          )
        })}
      </div>
    </Card>
  )
}
