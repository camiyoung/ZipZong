import React, { useEffect, useRef, useState } from "react"

import bg_rank2 from "../assets/bg_rank2.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faVolumeXmark, faVolumeUp } from "@fortawesome/free-solid-svg-icons"

import AOS from "aos"
import "aos/dist/aos.css"
import { RankList } from "../features/rank/RankList"
import { TopRank } from "../features/rank/TopRank"
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
    <div className=" w-full flex justify-center pt-10 pb-20 ">
      <div className="w-4/5 relative flex justify-center  items-center flex-col">
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
        <section className=" w-full h-[80vh] relative flex justify-center items-center rounded-3xl ">
          <TopRank />
        </section>

        {/* 랭킹 섹션 */}
        <section className=" w-full flex mt-20 bg-white rounded-3xl pb-10">
          <div className=" w-1/2 flex flex-col justify-center items-center">
            <RankList
              title={"타임 랭킹"}
              description={"실시간으로 갱신됩니다."}
            />
          </div>
          <div className=" w-1/2 flex flex-col justify-center items-center">
            <RankList
              title={"컨티뉴 랭킹"}
              description={"AM 12:00을 기준으로 갱신됩니다."}
            />
          </div>
        </section>
      </div>
    </div>
  )
}
