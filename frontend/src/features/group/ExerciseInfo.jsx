import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router"
import CalendarForm from "../../components/calendar/CalendarForm"
import ImageIcon from "../../components/icon/ImageIcon"
import { teamTotalExerciseCount, rankingTeam } from "./groupReducer"
import ChangeLanguage from "../routine/ChangeLanguage"
import ExerciseIcon from "../../components/icon/ExerciseIcon"

function Ranking() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { strickRank, timeRank } = useSelector((state) => state.group)
  const fetchTeamId = location.pathname.split("/")[2]
  useEffect(() => {
    dispatch(rankingTeam(fetchTeamId))
  }, [])
  return (
    <div className="w-full flex justify-evenly">
      {timeRank && Object.keys(timeRank).length > 0 ? (
        <div>
          <p className="text-xl text-center">
            <strong>Time Ranking</strong>
          </p>
          {/* Time Ranking ul */}
          <ul className="flex flex-col items-center">
            {/* Time Ranking 내 그룹 위의 5개 */}
            {timeRank.over
              ? timeRank.over.map(({ rank, teamIcon, teamName, totalTime }) => {
                  return (
                    <li className="flex items-center mb-5">
                      <p>{rank}</p>
                      <ImageIcon
                        image={`/images/badgeIcon/${teamIcon}.png`}
                        size="small"
                        shape="round"
                      />
                      <p className="mx-3">{teamName}</p>
                      {totalTime >= 60 ? (
                        <p>
                          {parseInt(totalTime / 60)}시간 {totalTime % 60}분
                        </p>
                      ) : (
                        <p>{totalTime} 분</p>
                      )}
                    </li>
                  )
                })
              : null}

            {/* Time Ranking 본인의 그룹 */}
            <li className="flex items-center mb-5" style={{ color: "red" }}>
              <p>{timeRank.me.rank}</p>
              <ImageIcon
                image={`/images/badgeIcon/${timeRank.me.teamIcon}.png`}
                size="small"
                shape="round"
              />
              <p className="mx-3">{timeRank.me.teamName}</p>
              {timeRank.me.totalTime >= 60 ? (
                <p>
                  {parseInt(timeRank.me.totalTime / 60)}시간{" "}
                  {timeRank.me.totalTime % 60}분
                </p>
              ) : (
                <p>{timeRank.me.totalTime} 분</p>
              )}
            </li>

            {/* Time Ranking 내 그룹 밑의 5개 */}
            {timeRank.under
              ? timeRank.under.map(
                  ({ rank, teamIcon, teamName, totalTime }) => {
                    return (
                      <li className="flex items-center mb-5">
                        <p>{rank}</p>
                        <ImageIcon
                          image={`/images/badgeIcon/${teamIcon}.png`}
                          size="small"
                          shape="round"
                        />
                        <p className="mx-3">{teamName}</p>
                        {totalTime >= 60 ? (
                          <p>
                            {parseInt(totalTime / 60)}시간 {totalTime % 60}분
                          </p>
                        ) : (
                          <p>{totalTime} 분</p>
                        )}
                      </li>
                    )
                  }
                )
              : null}
          </ul>
        </div>
      ) : (
        <p>랭킹이 존재하지 않습니다.</p>
      )}
      {strickRank && Object.keys(strickRank).length > 0 ? (
        <div>
          <p className="text-xl text-center">
            <strong>Continue Ranking</strong>
          </p>
          {/* Continue Ranking ul */}
          <ul className="flex flex-col items-center">
            {/* Time Ranking 내 그룹 위의 5개 */}
            {strickRank.over
              ? strickRank.over.map(
                  ({ rank, teamIcon, teamName, maxStrick }) => {
                    return (
                      <li className="flex items-center mb-5">
                        <p>{rank}</p>
                        <ImageIcon
                          image={`/images/badgeIcon/${teamIcon}.png`}
                          size="small"
                          shape="round"
                        />
                        <p className="mx-3">{teamName}</p>
                        <p>{maxStrick}</p>
                      </li>
                    )
                  }
                )
              : null}

            {/* Time Ranking 본인의 그룹 */}
            <li className="flex items-center mb-5" style={{ color: "red" }}>
              <p>{strickRank.me.rank}</p>
              <ImageIcon
                image={`/images/badgeIcon/${strickRank.me.teamIcon}.png`}
                size="small"
                shape="round"
              />
              <p className="mx-3">{strickRank.me.teamName}</p>
              <p>{strickRank.me.maxStrick}</p>
            </li>

            {/* Time Ranking 내 그룹 밑의 5개 */}
            {strickRank.under
              ? strickRank.under.map(
                  ({ rank, teamIcon, teamName, maxStrick }) => {
                    return (
                      <li className="flex items-center mb-5">
                        <p>{rank}</p>
                        <ImageIcon
                          image={`/images/badgeIcon/${teamIcon}.png`}
                          size="small"
                          shape="round"
                        />
                        <p className="mx-3">{teamName}</p>
                        <p>{maxStrick}</p>
                      </li>
                    )
                  }
                )
              : null}
          </ul>
        </div>
      ) : (
        <p>랭킹이 존재하지 않습니다.</p>
      )}
    </div>
  )
}
export default function ExerciseInfo() {
  const location = useLocation()
  const fetchTeamId = location.pathname.split("/")[2]
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(teamTotalExerciseCount(fetchTeamId))
  }, [])
  const {
    teamName,
    teamCurrentStreak,
    shieldCount,
    teamDailyHistory,
    stateGroupDailyHistory,
  } = useSelector((state) => state.group)
  const { showYear, showMonth, showDay } = useSelector((state) => state.mypage)
  const [teamDailyTotalTime, setTeamDailyTotalTime] = useState(0)

  // 팀 하루 동안의 운동 총 시간
  useEffect(() => {
    setTeamDailyTotalTime(
      stateGroupDailyHistory.reduce(function add(sum, { performTime }) {
        return sum + performTime
      }, 0)
    )
  }, [stateGroupDailyHistory])

  return (
    <div className="flex flex-col flex-wrap w-4/5">
      <div className="flex w-full justify-center mt-10">
        <div className="w-1/4">
          <CalendarForm />
        </div>

        <div className="ml-10 rounded-3xl bg-white min-w-min h-[340px] w-[70%] flex shadow-md">
          <div
            className="w-1/4 bg-lgBlue-400 h-full bg-gradient-to-t from-lgBlue-500 to-secondary-300 flex flex-col justify-center items-center"
            style={{
              borderRadius: "1rem 0px 0px 1rem",
            }}
          >
            <p className="text-5xl text-white font-bold mb-3">
              {showYear}
              <span className="text-4xl">년</span>
            </p>
            <p className="text-5xl text-white font-bold mb-5">
              {showMonth}
              <span className="text-4xl">월</span> {showDay}
              <span className="text-4xl">일</span>
            </p>
            <p className="text-lg text-white font-normal"> {teamName}</p>
            <span className="text-sm mt-0.5 text-gray-100">
              스트릭 쉴드 : {shieldCount}개
            </span>
          </div>
          <div className="w-3/4 h-full flex items-center justify-center">
            <div className="flex flex-col justify-center w-10/12">
              <div className="h-[50px] flex items-center justify-center">
                <div className="flex items-center justify-center mt-10">
                  {stateGroupDailyHistory === null ||
                  stateGroupDailyHistory.length === 0 ? null : (
                    <p className="text-[20px] font-semibold mr-1">
                      다같이 운동한 시간:
                    </p>
                  )}
                  {teamDailyTotalTime && teamDailyTotalTime >= 60 ? (
                    <p className="text-[24px] font-semibold">
                      {parseInt(teamDailyTotalTime / 60)} 시간{" "}
                      {teamDailyTotalTime % 60} 분
                    </p>
                  ) : stateGroupDailyHistory === null ||
                    stateGroupDailyHistory.length === 0 ? null : (
                    <p className="text-[24px] font-semibold">
                      {teamDailyTotalTime} 분
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap w-full justify-start items-center h-[290px] pb-7">
                {stateGroupDailyHistory === null ||
                stateGroupDailyHistory.length === 0 ? (
                  // true, false 순서를 바꾸면 정상적으로 작동함 -> 운동을 하면 결과, 없으면 운동 안했다는 메시지 출력
                  <p className="text-lg font-normal text-center w-full">
                    운동 기록이 존재하지 않습니다!
                  </p>
                ) : (
                  stateGroupDailyHistory.map(
                    ({ performName, performNum, performTime }, idx) => {
                      return (
                        <div key={idx} className="flex items-center w-[33.33%]">
                          <ExerciseIcon
                            size="ltlarge"
                            shape="round"
                            image={performName}
                          ></ExerciseIcon>
                          <div className="flex flex-col ml-3">
                            <div className="font-semibold">
                              {" "}
                              <ChangeLanguage exercise={performName} />
                            </div>
                            <p>
                              {" "}
                              {performNum}회 / {performTime}분{" "}
                            </p>
                          </div>
                        </div>
                      )
                    }
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>

      {/* <Ranking /> */}
    </div>
  )
}
