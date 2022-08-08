import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  memberExerciseHistoryCheck,
  memberExerciseHistorySumCheck,
} from "./myPageReducer"
import { registrationTeam } from "../group/groupReducer"
import CalendarForm from "../../components/calendar/CalendarForm"
import ExerciseIcon from "../../components/icon/ExerciseIcon"
import ChangeLanguage from "../routine/ChangeLanguage"

const dayExerciseInfo = [
  {
    performName: "PUSHUP",
    performNum: 18,
    performTime: 1,
  },
  {
    performName: "LEGRAISE",
    performNum: 30,
    performTime: 2,
  },
  {
    performName: "MOUNTAINCLIMING",
    performNum: 30,
    performTime: 2,
  },
  {
    performName: "BURPEE",
    performNum: 30,
    performTime: 2,
  },
  {
    performName: "SQUAT",
    performNum: 30,
    performTime: 2,
  },
]

export default function ExerciseInfo() {
  const dispatch = useDispatch()
  const { memberId, memberNickname } = useSelector((state) => state.member)

  const {
    selectedMonth,
    selectedYear,
    showYear,
    showMonth,
    showDay,
    registeredTeam,
    memberCurrentStrick,
    memberDailyHistory,
    stateDailyHistory,
  } = useSelector((state) => state.mypage)
  useEffect(() => {
    dispatch(
      memberExerciseHistoryCheck({
        memberId: memberId,
        year: selectedYear,
        month: selectedMonth,
      })
    )
    dispatch(memberExerciseHistorySumCheck(memberId))
    dispatch(registrationTeam(memberId))
  }, [])

  // stateDailyHistory는 performs   -------->  dayExerciseInfo와 같은 방법으로 옵니다
  console.log(stateDailyHistory)
  let totalTime = 9

  return (
    <div className="flex mt-10 flex-col w-4/5">
      <div className="flex">
        <div className="flex w-full justify-center">
          <CalendarForm />
          <div className="ml-10 rounded-3xl bg-white min-w-min h-[340px] w-[70%] flex shadow-md">
            <div
              className="w-1/4 bg-lgBlue-400 h-full bg-gradient-to-b from-lgBlue-500 to-secondary-300 flex flex-col justify-center items-center"
              style={{
                borderRadius: "1rem 0px 0px 1rem",
              }}
            >
              <p className="text-5xl text-white font-bold mb-3">{showYear}년</p>
              <p className="text-5xl text-white font-bold mb-5">
                {showMonth}월 {showDay}일
              </p>
              <p className="text-lg text-white font-normal">
                {" "}
                {memberNickname} 님의 운동 기록
              </p>
            </div>
            <div className="w-3/4 h-full flex items-center justify-center">
              <div className="flex justify-center w-10/12">
                <div className="flex flex-wrap w-full justify-start">
                  {console.log("여기서 운동 종목 및 개수 출력")}
                  {stateDailyHistory ? (
                    // true, false 순서를 바꾸면 정상적으로 작동함 -> 운동을 하면 결과, 없으면 운동 안했다는 메시지 출력
                    <p>이 날은 운동을 하지 않았습니다!</p>
                  ) : (
                    dayExerciseInfo.map(
                      ({ performName, performNum, performTime }, idx) => {
                        return (
                          <div key={idx} className="flex w-[33.33%] my-3">
                            <ExerciseIcon
                              size="large"
                              shape=""
                              image={performName}
                            ></ExerciseIcon>
                            <div className="flex flex-col justify-center items-center w-[70%]">
                              <p className="font-semibold">
                                {" "}
                                <ChangeLanguage exercise={performName} />
                              </p>
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
            {/* <div className="w-full h-full">
              <div className="p-3">
              </div>
              <div
                className="overflow-scroll scrollbar-hide"
                style={{ height: "200px" }}
              >
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
