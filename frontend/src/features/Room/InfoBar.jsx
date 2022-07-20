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
  return (
    <div className="border w-8 min-w-[100px] bg-white rounded-2xl">
      {children}
    </div>
  )
}
const ExampleImage = ({ name }) => {
  return (
    <div className=" w-1/3  p-2">
      <div className=" bg-white w-4/5 h-full"></div>
    </div>
  )
}

const ExerciseCard = ({ list }) => {
  return (
    <div className="flex w-2/3 p-3 ml-32 space-x-2">
      {list.map((exercise, i) => (
        <Card key={i}>{exercise}</Card>
      ))}
    </div>
  )
}
export default function InfoBar() {
  return (
    <div className=" h-1/6 flex overflow-x-hidden bg-lgBlue-400">
      <ExampleImage name={tmp[0]} />
      <ExerciseCard list={tmp} />
    </div>
  )
}
