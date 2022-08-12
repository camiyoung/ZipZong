import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router"
import CalendarForm from "../../components/calendar/CalendarForm"
import ImageIcon from "../../components/icon/ImageIcon"
import { teamTotalExerciseCount, rankingTeam } from "./groupReducer"

// const dayExerciseInfo = [
//   {
//     exerciseType: "윗몸일으키기",
//     exerciseIcon:
//       "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
//     exerciseTime: 900,
//     exerciseCount: 1000,
//   },
//   {
//     exerciseType: "Test1",
//     exerciseIcon:
//       "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
//     exerciseTime: 780,
//     exerciseCount: 1001,
//   },
//   {
//     exerciseType: "Test2",
//     exerciseIcon:
//       "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
//     exerciseTime: 600,
//     exerciseCount: 1004,
//   },
//   {
//     exerciseType: "Test4",
//     exerciseIcon:
//       "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
//     exerciseTime: 600,
//     exerciseCount: 1004,
//   },
//   {
//     exerciseType: "Test3",
//     exerciseIcon:
//       "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
//     exerciseTime: 600,
//     exerciseCount: 1004,
//   },
// ]
function Ranking() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { strickRank, timeRank } = useSelector((state) => state.group)
  const fetchTeamId = location.pathname.split("/")[2]
  useEffect(() => {
    dispatch(rankingTeam(fetchTeamId))
  }, [])
  console.log("랭크", timeRank, strickRank)
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
    teamCurrentStreak,
    shieldCount,
    teamDailyHistory,
    stateGroupDailyHistory,
  } = useSelector((state) => state.group)
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
    <div className="flex mt-10 flex-col flex-wrap">
      <div className="flex">
        <div className="flex">
          <CalendarForm />
          <div
            className="border mx-5 rounded-lg border-gray-400 min-w-min"
            style={{
              boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
              width: "270px",
              height: "295.94px",
            }}
          >
            <div className="flex items-center justify-center mt-1">
              <p className="text-[14px] mr-1">다같이 운동한 시간:</p>
              {teamDailyTotalTime && teamDailyTotalTime >= 60 ? (
                <p className="text-[18px]">
                  {parseInt(teamDailyTotalTime / 60)} 시간{" "}
                  {teamDailyTotalTime % 60} 분
                </p>
              ) : (
                <p className="text-[18px]">{teamDailyTotalTime} 분</p>
              )}
            </div>
            <p className="mt-1 text-md">연속 {teamCurrentStreak}일째!</p>
            <div
              className="overflow-scroll scrollbar-hide"
              style={{
                // 달력의 높이에 따라 변하게 만들어야 함
                height: "235px",
              }}
            >
              {stateGroupDailyHistory.map(
                ({ performName, performTime, performNum }, idx) => {
                  return (
                    <div key={idx} className="flex m-5">
                      <ImageIcon
                        image={`/images/exercise/${performName}.png`}
                        size="middle"
                        shape="round"
                      />
                      <div>
                        <p>운동 개수: {performNum}</p>
                        <p>운동 시간: {performTime}</p>
                      </div>
                    </div>
                  )
                }
              )}
            </div>
          </div>
        </div>
      </div>
      <br />
      <p>현재 스트릭 쉴드를 {shieldCount}개 소지 중입니다.</p>
      <Ranking />
    </div>
  )
}
