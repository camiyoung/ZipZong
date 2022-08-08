import React, { useEffect, useRef, useState } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { RankList } from "../features/rank/RankList"
import { TopRank } from "../features/rank/TopRank"
import { MusicPlayer } from "../features/rank/MusicPlayer"

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

        <MusicPlayer isPlaying={musicPlay} clickButton={playMusic} />
        <section className=" w-full h-[80vh] relative flex justify-center items-center rounded-3xl ">
          <TopRank />
        </section>

        {/* 랭킹 섹션 */}
        <section className=" w-full flex mt-20 bg-white rounded-3xl pb-10 shadow-md">
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
