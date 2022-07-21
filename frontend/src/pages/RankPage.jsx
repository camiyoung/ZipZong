import React from "react"
import prize1 from "../assets/prize_first.png"
import prize2 from "../assets/prize_second.png"
import prize3 from "../assets/prize_third.png"

const rankList = [
  "그룹1",
  "그룹2",
  "그룹3",
  "그룹4",
  "그룹5",
  "그룹6",
  "그룹7",
  "그룹8",
  "그룹9",
  "그룹10",
]

const ListItem = ({ text, rank }) => {
  return (
    <li
      className=" w-9/12 flex m-2 bg-lgBlue-100 rounded-full p-1 pl-5"
      key={rank}
    >
      <div className="w-2/12">{rank + 1}등 </div>
      <div className="w-10/12 text-center">{text}</div>
    </li>
  )
}

const ListItemSamll = ({ text }) => {
  return (
    <li className="w-1/3  " key={text}>
      <div className="m-2 rounded-full text-center border border-primary-200">
        {text}
      </div>
    </li>
  )
}

export default function RankPage() {
  return (
    <div className="flex  justify-center items-center flex-col w-full">
      <div className="w-6/12 p-4 ">
        <div className="border w-full mt-7 mb-12 p-4 rounded-xl border-primary-100 shadow-md">
          <div className=" h-20 flex items-center justify-center">
            <h1 className="text-center font-extrabold text-white text-4xl p-3 px-20 rounded-3xl bg-gradient-to-r from-lgBlue-400  to-primary-400">
              명예의 전당
            </h1>
          </div>
          <div className="h-24 p-3">
            <div className="flex  h-full justify-evenly">
              <div className=" flex items-center">
                <img src={prize1} alt="" />
                <div className="text-lg font-semibold">그룹A</div>
              </div>
              <div className=" flex items-center">
                <img src={prize2} alt="" />
                <div className="text-lg font-semibold">그룹B</div>
              </div>
              <div className=" flex items-center">
                <img src={prize3} alt="" />
                <div className="text-lg font-semibold">그룹C</div>
              </div>
            </div>
          </div>
          <div className=" p-2">
            <ul className="flex  w-full flex-wrap">
              {rankList.map((gruop) => (
                <ListItemSamll text={gruop} />
              ))}
            </ul>
          </div>
        </div>
        <div className=" w-full flex ">
          <div className=" w-1/2 flex flex-col justify-center items-center">
            <h2 className="text-center  text-xl p-2 rounded-3xl m-2 w-4/6 bg-primary-300 font-bold">
              타임랭킹
            </h2>
            <p className=" font-semibold">실시간으로 갱신됩니다.</p>
            <div className="w-full">
              <ul className=" flex flex-col justify-center items-center">
                {rankList.map((group, i) => (
                  <ListItem text={group} rank={i} />
                ))}
              </ul>
            </div>
          </div>
          <div className=" w-1/2 flex flex-col justify-center items-center">
            <h2 className="text-center  text-xl p-2 rounded-3xl  m-2 w-4/6 bg-primary-300 font-bold">
              컨티뉴 랭킹
            </h2>
            <p className=" font-semibold">AM 4:00을 기준으로 갱신됩니다.</p>
            <div className="w-full">
              <ul className=" flex flex-col justify-center items-center">
                {rankList.map((group, i) => (
                  <ListItem text={group} rank={i} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
