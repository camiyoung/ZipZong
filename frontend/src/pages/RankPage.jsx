import React, { useEffect, useRef, useState } from "react"

import bg_rank2 from "../assets/bg_rank2.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faVolumeXmark, faVolumeUp } from "@fortawesome/free-solid-svg-icons"

import AOS from "aos"
import "aos/dist/aos.css"
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
      className=" w-9/12 flex m-2 bg-lgBlue-100  p-4 pl-5 h-16"
      key={rank}
      data-aos="flip-down"
    >
      <div className="w-2/12">{rank + 1}등 </div>
      <div className="w-10/12 text-center">{text}</div>
    </li>
  )
}

const ListItemSamll = ({ text }) => {
  return (
    <li className="w-1/3  " key={text}>
      <div className="m-2  text-center bg-white">{text}</div>
    </li>
  )
}

export default function RankPage() {
  const [musicPlay, setMusicPlay] = useState(true)
  const audioRef = useRef()
  useEffect(() => {
    audioRef.current.volume = 0.6
    AOS.init()
  }, [])
  const playMusic = () => {
    if (musicPlay) {
      audioRef.current.pause()
      setMusicPlay(false)
    } else {
      audioRef.current.play()
      setMusicPlay(true)
    }
  }

  return (
    <div className="flex  justify-center items-center flex-col w-full ">
      <div className="w-full relative">
        <audio autoPlay ref={audioRef} loop>
          <source src="music/rank2.m4a" type="audio/x-m4a" />
        </audio>

        <div
          className="absolute z-30 p-3 right-5 top-3 w-14 h-14 bg-white rounded-full justify-center items-center"
          onClick={playMusic}
        >
          {musicPlay ? (
            <FontAwesomeIcon
              icon={faVolumeXmark}
              className="w-full h-full text-red-300"
            />
          ) : (
            <FontAwesomeIcon
              icon={faVolumeUp}
              className="w-full h-full text-red-300"
            />
          )}
        </div>
        <section
          className=" w-full h-screen relative flex justify-center items-center "
          style={{
            backgroundImage: `url(${bg_rank2})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className=" relative top-28 w-4/6 py-10 rounded-lg h-1/2">
            <div className="  w-full p-3 max-h-60 ">
              <div className="flex  h-full w-full justify-evenly ">
                <div className="w-[33%] h-full  flex items-center animate-prize-silver relative bottom-10">
                  <img
                    src="/images/rankPage/ruby.png"
                    alt=""
                    className=" w-[80%] h-[80%] "
                  />
                  <div className="text-lg font-semibold absolute  flex justify-center items-center w-[80%] h-[80%]  ">
                    그룹B
                  </div>
                </div>
                <div className="w-[33%] h-full flex items-center animate-prize-gold relative bottom-24">
                  <img
                    src="/images/rankPage/diamond.png"
                    alt=""
                    className=" w-full h-full"
                  />
                  <div className="text-lg font-semibold  absolute  flex justify-center items-center w-full h-full ">
                    그룹A
                  </div>
                </div>

                <div className="w-[33%] h-full flex items-center animate-prize-bronze relative bottom-4 left-4">
                  <img
                    src="/images/rankPage/gold.png"
                    alt=""
                    className=" w-[75%] h-[75%]"
                  />
                  <div className="text-lg font-semibold absolute  flex justify-center items-center w-[75%] h-[75%] ">
                    그룹C
                  </div>
                </div>
              </div>
            </div>
            <div className=" h-2/5 w-full p-2  m-auto">
              <ul className="flex  w-full flex-wrap items-center ">
                {rankList.map((group, idx) => (
                  <ListItemSamll text={group} key={idx} />
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 랭킹 섹션 */}
        <section className=" w-full flex  ">
          <div className=" w-1/2 flex flex-col justify-center items-center">
            <h2 className="text-center  text-2xl p-2 rounded-3xl m-2 w-4/6  font-bold">
              타임랭킹
            </h2>
            <p className=" font-semibold">실시간으로 갱신됩니다.</p>
            <div className="w-full">
              <ul className=" flex flex-col justify-center items-center ">
                {rankList.map((group, i) => (
                  <ListItem text={group} rank={i} key={i} />
                ))}
              </ul>
            </div>
          </div>
          <div className=" w-1/2 flex flex-col justify-center items-center">
            <h2 className="text-center  text-2xl p-2 rounded-3xl  m-2 w-4/6  font-bold">
              컨티뉴 랭킹
            </h2>
            <p className=" font-semibold">AM 4:00을 기준으로 갱신됩니다.</p>
            <div className="w-full">
              <ul className=" flex flex-col justify-center items-center">
                {rankList.map((group, i) => (
                  <ListItem text={group} rank={i} key={i} />
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
