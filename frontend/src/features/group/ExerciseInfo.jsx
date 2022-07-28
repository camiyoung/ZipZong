import React from "react"
import CalendarForm from "../../components/calendar/CalendarForm"
import ImageIcon from "../../components/icon/ImageIcon"

const dayExerciseInfo = [
  {
    exerciseType: "윗몸일으키기",
    exerciseIcon:
      "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    exerciseTime: 900,
    exerciseCount: 1000,
  },
  {
    exerciseType: "Test1",
    exerciseIcon:
      "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    exerciseTime: 780,
    exerciseCount: 1001,
  },
  {
    exerciseType: "Test2",
    exerciseIcon:
      "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    exerciseTime: 600,
    exerciseCount: 1004,
  },
  {
    exerciseType: "Test4",
    exerciseIcon:
      "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    exerciseTime: 600,
    exerciseCount: 1004,
  },
  {
    exerciseType: "Test3",
    exerciseIcon:
      "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    exerciseTime: 600,
    exerciseCount: 1004,
  },
]
function Ranking() {
  return (
    <div className="w-full">
      <p className="text-xl text-center">
        <strong>Time Ranking</strong>
      </p>
      {/* Time Ranking ul */}
      <ul className="flex flex-col items-center">
        <li className="flex items-center mb-5">
          <ImageIcon
            image="https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg"
            size="small"
            shape="round"
          />
          <p className="mx-3">집에서 운동중</p>
          <p>09:17:22</p>
        </li>
        <li className="flex items-center mb-5">
          <ImageIcon
            image="https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg"
            size="small"
            shape="round"
          />
          <p className="mx-3">집에서 운동중</p>
          <p>09:17:25</p>
        </li>
      </ul>

      <p className="text-xl text-center">
        <strong>Continue Ranking</strong>
      </p>
      {/* Continue Ranking ul */}
      <ul className="flex flex-col items-center">
        <li className="flex items-center mb-5">
          <ImageIcon
            image="https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg"
            size="small"
            shape="round"
          />
          <p className="mx-3">집에서 운동중</p>
          <p>10일차</p>
        </li>
      </ul>
    </div>
  )
}

export default function ExerciseInfo() {
  let totalTime = 9
  let streak = 3
  let sheildCount = 1
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
              <p className="text-[18px]">{totalTime} 시간</p>
            </div>
            <p className="mt-1 text-md">연속 {streak}일째!</p>
            <div
              className="overflow-scroll scrollbar-hide"
              style={{
                // 달력의 높이에 따라 변하게 만들어야 함
                height: "235px",
              }}
            >
              {dayExerciseInfo.map(
                ({ exerciseIcon, exerciseTime, exerciseCount }, idx) => {
                  return (
                    <div key={idx} className="flex m-5">
                      <ImageIcon
                        image={exerciseIcon}
                        size="middle"
                        shape="round"
                      />
                      <div>
                        <p>운동 개수: {exerciseCount}</p>
                        <p>운동 시간: {exerciseTime}</p>
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
      <Ranking />
      <p>현재 스트릭 쉴드를 {sheildCount}개 소지 중입니다.</p>
    </div>
  )
}
