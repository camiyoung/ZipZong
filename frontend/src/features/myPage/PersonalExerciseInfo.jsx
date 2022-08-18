import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  memberExerciseHistoryCheck,
  memberExerciseHistorySumCheck,
  setDailyHistory,
  showYearChange,
  showMonthChange,
  showDayChange,
} from "./myPageReducer"
import { registrationTeam } from "../group/groupReducer"
import CalendarForm from "../../components/calendar/CalendarForm"
import ExerciseIcon from "../../components/icon/ExerciseIcon"
import ChangeLanguage from "../routine/ChangeLanguage"

export default function ExerciseInfo() {
  const dispatch = useDispatch()
  const { memberId, memberNickname } = useSelector((state) => state.member)
  const {
    selectedMonth,
    selectedYear,
    showYear,
    showMonth,
    showDay,
    memberDailyHistory,
    stateDailyHistory,
  } = useSelector((state) => state.mypage)
  useEffect(() => {
    if (!memberId) return
    if (selectedYear && selectedMonth) {
      dispatch(
        memberExerciseHistoryCheck({
          memberId: memberId,
          year: selectedYear,
          month: selectedMonth,
        })
      )
    }

    const date = new Date()

    if (memberId) {
      dispatch(memberExerciseHistorySumCheck(memberId))
      dispatch(registrationTeam(memberId))
    }
    dispatch(showYearChange(date.getFullYear()))
    dispatch(showMonthChange(date.getMonth() + 1))
    dispatch(showDayChange(date.getDate()))

    if (memberDailyHistory.length !== 0 && showDay) {
      dispatch(setDailyHistory(memberDailyHistory[showDay - 1].performs))
    }
  }, [memberId])
  useEffect(() => {
    if (memberDailyHistory.length !== 0 && showDay) {
      setTodayExercise()
    }
  }, [memberDailyHistory, showDay])

  const setTodayExercise = () => {
    dispatch(setDailyHistory(memberDailyHistory[showDay - 1].performs))
  }

  return (
    <div className="flex mt-10 flex-col w-4/5">
      <div className="flex">
        <div className="flex w-full justify-center">
          <div className="w-1/4 m-3">
            <CalendarForm />
          </div>
          <div className="rounded-3xl bg-white h-[340px] w-[70%] flex shadow-md m-3 ">
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
              <p className="text-lg text-white font-normal">
                {" "}
                {memberNickname} 님
              </p>
            </div>
            <div className="w-3/4 h-full flex items-center justify-center">
              <div className="flex justify-center w-10/12">
                <div className="flex flex-wrap w-full justify-start">
                  {stateDailyHistory === null ||
                  stateDailyHistory.length === 0 ? (
                    // true, false 순서를 바꾸면 정상적으로 작동함 -> 운동을 하면 결과, 없으면 운동 안했다는 메시지 출력
                    <p className="text-lg font-normal text-center w-full">
                      운동 기록이 존재하지 않습니다.
                    </p>
                  ) : (
                    stateDailyHistory.map(
                      ({ performName, performNum, performTime }, idx) => {
                        return (
                          <div
                            key={idx}
                            className="flex items-center w-[33.33%] my-5"
                          >
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
