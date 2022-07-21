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

const players = [
  { name: "팀원1", res: "80%" },
  { name: "팀원2", res: "80%" },
  { name: "팀원3", res: "80%" },
  { name: "팀원4", res: "80%" },
  { name: "팀원5", res: "80%" },
]

const ResultCard = ({ name }) => {
  return (
    <div className="border w-40 bg-white m-1 h-64 p-3 rounded-2xl">
      <div className="border h-32 mb-2">운동이미지</div>
      <div className="space-y-2">
        <div className="border rounded-2xl text-center">{name}</div>
        <div className="border rounded-2xl text-center">목표 : 10회 </div>
        <div className="border rounded-2xl text-center">성공 : 8회</div>
      </div>
    </div>
  )
}

const OtherPlayerResult = ({ name, res }) => {
  return (
    <div className="w-24 h-24 border flex justify-center items-center flex-col m-1 rounded-lg">
      <div>{name}</div>
      <div>{res}</div>
    </div>
  )
}
export default function ExerciseResulPage() {
  return (
    <div className="w-full  ">
      <section className="w-full  flex justify-center items-center h-48 flex-col">
        <h1 className=" text-4xl font-bold my-4">운동이 종료되었습니다! </h1>
        <h2 className="font-semibold text-2xl mb-4">내 달성률 : 85%</h2>
      </section>
      <section className=" w-full overflow-x-auto p-3">
        <div className="flex w-full  items-center justify-between ">
          <div className=" p-2 ">
            <div className="flex">
              {tmp.map((item) => (
                <ResultCard name={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="w-full  flex justify-center items-center flex-col p-3">
        <h2 className="font-semibold text-2xl mb-12 mt-12">
          우리팀 평균 달성률 : 85%
        </h2>
        <div className="flex w-4/5 justify-center">
          {players.map((user) => (
            <OtherPlayerResult name={user.name} res={user.res} />
          ))}
        </div>
      </section>
    </div>
  )
}
