import React, { useState } from "react"
import ImageIcon from "../../components/icon/ImageIcon"

const exerciseList = [
  {
    name: "푸쉬업",
    icon: "https://i1.sndcdn.com/artworks-erzOr48vb9Eirk8t-SUOCEg-t500x500.jpg",
  },
  {
    name: "버피",
    icon: "https://obj-kr.thewiki.kr/data/53637265656e73686f745f323031382d31302d32322d30302d35362d33337e322e706e67.png",
  },
  {
    name: "버피",
    icon: "https://obj-kr.thewiki.kr/data/53637265656e73686f745f323031382d31302d32322d30302d35362d33337e322e706e67.png",
  },
]

export default function ExerciseSelect() {
  const [idx, setIdx] = useState(0)

  return (
    <div className="flex">
      <div className="bg-primary-100 w-[1100px] h-[300px] rounded-2xl m-3 items-center flex overflow-hidden relative px-16">
        <div
          className="bg-primary-300 w-[50px] h-[300px] absolute left-0 hover:bg-mainBlue"
          onClick={() => {
            if (idx >= 1) {
              setIdx(idx - 1)
            }
          }}
        ></div>
        <div className="flex">
          {exerciseList.slice(idx, idx + 5).map(({ name, icon }) => {
            return (
              <div className="">
                <div className="bg-white w-[170px] h-[240px] rounded-3xl m-3 border-primary-200 flex items-center flex-col justify-center">
                  <div className="">
                    <ImageIcon
                      size="large"
                      shape="round"
                      image={icon}
                    ></ImageIcon>
                  </div>
                  <div className="p-3">{name}</div>
                  <div className="flex">
                    <div> - </div>
                    <div> 5 </div>
                    <div> + </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div
          className="bg-primary-300 w-[50px] h-[300px] absolute right-0 hover:bg-mainBlue"
          onClick={() => {
            if (idx <= exerciseList.length - 6 && exerciseList.length >= 6) {
              setIdx(idx + 1)
            }
          }}
        ></div>
      </div>
      <div className="bg-secondary-300 w-[200px] h-[300px] rounded-2xl m-3">
        <div>
          <div className="flex justify-center">
            <ImageIcon
              size="large"
              shape="round"
              image="http://kaka0.net/data/file/humor/2950631858_xklV5CvP_6.jpeg"
            ></ImageIcon>
          </div>
          <div className="flex justify-center "> 휴식</div>
          <div className="flex justify-center">
            <div> - </div>
            <div> 5 </div>
            <div> + </div>
          </div>
        </div>
      </div>
    </div>
  )
}
