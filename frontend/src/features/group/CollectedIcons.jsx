import React from "react"
import Card from "../../components/card/Card"
import Button from "../../components/button/Button"
import ImageIcon from "../../components/icon/ImageIcon"
const prizes = [
  {
    imageUrl:
      "https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/9/6/4/0/9640a9aa5c9fd17dd1a3015756725789.jpg",
    prizeKey: 1,
  },
  {
    imageUrl:
      "https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/9/6/4/0/9640a9aa5c9fd17dd1a3015756725789.jpg",
    prizeKey: 2,
  },
  {
    imageUrl:
      "https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/9/6/4/0/9640a9aa5c9fd17dd1a3015756725789.jpg",
    prizeKey: 3,
  },
  {
    imageUrl:
      "https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/9/6/4/0/9640a9aa5c9fd17dd1a3015756725789.jpg",
    prizeKey: 4,
  },
  {
    imageUrl:
      "https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/9/6/4/0/9640a9aa5c9fd17dd1a3015756725789.jpg",
    prizeKey: 5,
  },
  {
    imageUrl:
      "https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/9/6/4/0/9640a9aa5c9fd17dd1a3015756725789.jpg",
    prizeKey: 6,
  },
  {
    imageUrl:
      "https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/9/6/4/0/9640a9aa5c9fd17dd1a3015756725789.jpg",
    prizeKey: 7,
  },
]

export default function CollectedIcons() {
  return (
    <Card
      className="flex justify-center flex-col mx-5 rounded-lg mt-5"
      size="100%"
    >
      <div className="flex justify-between">
        <p className="text-3xl font-semibold mb-1">획득 아이콘</p>
        <Button text="대표 아이콘 변경" height="h-9" width="w-48" />
      </div>
      <div className="flex">
        {prizes.map(({ imageUrl, prizeKey }) => {
          return (
            <div className="mr-3" key={prizeKey}>
              <ImageIcon
                image={imageUrl}
                shape="square"
                className="mx-1"
                size="middle"
              />
            </div>
          )
        })}
      </div>
    </Card>
  )
}
