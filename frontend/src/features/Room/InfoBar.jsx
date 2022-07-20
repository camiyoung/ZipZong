import React from "react"

const tmp = [
  "스쿼트",
  "런지",
  "버피",
  "스쿼트",
  "런지",
  "버피",
  "스쿼트",
  "런지",
  "버피",
  "스쿼트",
  "런지",
  "버피",
  "스쿼트",
  "런지",
  "버피",
  "스쿼트",
  "런지",
  "버피",
]
const Card = ({ children }) => {
  return <div className="border w-8 min-w-[100px]">{children}</div>
}
const ExampleImage = ({ name }) => {
  return (
    <div className=" w-1/3 border">
      예시 이미지 <br />
      {name}
    </div>
  )
}

const ExerciseCard = ({ list }) => {
  let cards = []
  cards.push(
    <div className="border w-24 min-w-[150px]" key="0">
      {list[0]}
    </div>
  )
  for (let i = 1; i < list.length; i++) {
    cards.push(<Card key={i}>{list[i]}</Card>)
  }
  return (
    <div className="flex  space-x-4 space-y-2  w-2/3 p-3 ml-32">{cards}</div>
  )
}
export default function InfoBar() {
  return (
    <div className="border h-1/6 flex overflow-x-hidden">
      <ExampleImage name={tmp[0]} />
      <ExerciseCard list={tmp} />
    </div>
  )
}
