import React, { useEffect, useRef, useState } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { RankList } from "../features/rank/RankList"
import { TopRank } from "../features/rank/TopRank"
import { MusicPlayer } from "../features/rank/MusicPlayer"
import { http } from "../api/axios"

export default function RankPage() {
  const [musicPlay, setMusicPlay] = useState(true)
  const audioRef = useRef()
  const [rankingInfo, setRankingInfo] = useState()
  useEffect(() => {
    audioRef.current.volume = 0.1
    AOS.init()

    http.get("ranking/info").then((res) => {
      // console.log(res)
      setRankingInfo(res.data.data)
    })
  }, [])
  // console.log(rankingInfo)

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
          {rankingInfo && <TopRank list={rankingInfo.hallOfFames} />}
        </section>

        {/* 랭킹 섹션 */}
        <section className=" w-full flex  flex-col mt-20  pb-16 bg-gradient-to-r from-[#e5d1ed] to-[#c6f2ef] rounded-3xl  shadow-md">
          <p className="text-center mb-6 bg-[#ffffffeb] rounded-t-3xl py-3  font-medium text-sm">
            모든 랭킹은 AM 12:00에 갱신됩니다.
          </p>
          <div className="flex">
            <div className=" w-1/2 flex flex-col justify-center items-center ">
              {rankingInfo && (
                <RankList
                  title={"⏰ 타임 랭킹 ⏰ "}
                  description={[
                    "누적 운동 시간으로 집계됩니다.",
                    "AM 12:00을 기준으로 갱신됩니다.",
                  ]}
                  list={rankingInfo.timeRanks}
                />
              )}
            </div>
            <div className=" w-1/2 flex flex-col justify-center items-center ">
              {rankingInfo && (
                <RankList
                  title={"🗓️ 컨티뉴 랭킹 🗓️"}
                  description={[
                    "최대 연속 운동 일수를 기준으로 집계됩니다.",
                    "AM 12:00을 기준으로 갱신됩니다.",
                  ]}
                  list={rankingInfo.strickRanks}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
