import React, { useEffect, useState } from "react"
import Trainer from "../assets/personal_trainer.svg"
import Workout from "../assets/workout.svg"
import AOS from "aos"
import "aos/dist/aos.css"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

const grid = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
}

const language = {
  PUSHUP: "팔굽혀펴기",
  BURPEE: "버피",
  SQUAT: "스쿼트",
  JUMPINGJACK: "팔벌려뛰기",
  LUNGE: "런지",
  LATERALRAISE: "레터럴레이즈",
}

const ResultCard = ({ name, target, performed }) => {
  return (
    <div
      className=" w-40 bg-white m-3 h-64  rounded-2xl shadow-md  "
      data-aos="fade-up"
    >
      <img
        className={"rounded-xl mb-2"}
        src={`/images/exerciseIcon/${name}.png`}
      />
      <div className=" ">
        <div className="mb-2 p-0.25 rounded-2xl text-center  text-lg font-semibold  ">
          {language[name]}
        </div>
        <div className="mb-2 p-0.25 rounded-2xl text-center   text-border-indigo-400/80 ">
          성공 : {performed} / 목표 : {target}
        </div>
      </div>
    </div>
  )
}

const OtherPlayerResult = ({ name, res }) => {
  return (
    <div className="bg-indigo-500/80 text-white w-24 h-24 min-w-[92px] border border-indigo-400 flex justify-center items-center flex-col m-2 rounded-lg shadow-xl shadow-indigo-500/40">
      <div className="text-sm text-center">{name}</div>
      <p className="text-sm text-center">{res} %</p>
    </div>
  )
}
export default function ExerciseResulPage() {
  const [hasRes, setHasRes] = useState(false)
  const result = useSelector((state) => state.exercise.result)
  const myPercentage = useSelector((state) => state.exercise.myPercentage)
  const navigate = useNavigate()

  useEffect(() => {
    if (result.myResult && result.allResult) setHasRes(true)
    AOS.init()
  }, [])

  return (
    <>
      <div className="w-screen flex justify-center">
        {/* 운동 종료 안내 섹션  */}
        <div className="w-4/5 rounded-3xl  pb-32  ">
          <section className=" w-full p-3 h-screen  flex flex-col justify-center items-center relative">
            <img
              src={Trainer}
              alt=""
              className="absolute  -left-52 w-3/6 h-3/6 bottom-0 animate-slide-from-left  -z-1"
            />
            <img
              src={Workout}
              alt=""
              className="absolute  -right-40 w-3/6 h-3/6 top-10  animate-slide-from-right  -z-1"
            />
            <h1 className=" text-4xl my-4  text-indigo-500 font-semibold ">
              운동이 종료되었습니다!
            </h1>
            {result.myResult && (
              <h2 className="font-medium text-2xl m-4 text-gray-600 ">
                {myPercentage !== undefined && (
                  <span> 내 달성률 : {myPercentage}%</span>
                )}
              </h2>
            )}
            {result.allResult && (
              <h2 className="font-medium text-2xl mb-8 mt-12 text-gray-600">
                우리팀 평균 달성률 : {result.allResult.avgPercentage}%
              </h2>
            )}
            {result.allResult && (
              <div className="flex w-4/5 justify-center z-10">
                {result.allResult.personalPercentages.map((user, idx) => (
                  <OtherPlayerResult
                    name={user.nickname}
                    res={user.percentage}
                    key={idx}
                  />
                ))}
              </div>
            )}
            {result?.myResult && (
              <p className=" text-xl mt-20 animate-pulse  ">
                스크롤을 내려서 기록을 확인해 보세요
              </p>
            )}
          </section>
          {/* 운동 루틴 결과 섹션 */}
          {result.myResult && (
            <section className="w-full flex justify-center items-center flex-col p-8  pb-16 bg-white rounded-xl  shadow-md">
              <h1 className="text-2xl font-semibold my-4 text-lgBlue-700">
                내 운동 기록
              </h1>
              <div
                className={` grid content-center align-middle ${
                  result.myResult.personalResultDetails.length < 5
                    ? grid[result.myResult.personalResultDetails.length]
                    : grid[5]
                }`}
              >
                {result.myResult.personalResultDetails.map((item, idx) => (
                  <ResultCard
                    name={item.exerciseName}
                    target={item.targetNum}
                    performed={item.performNum}
                    key={idx}
                  />
                ))}
              </div>
            </section>
          )}

          <div className="w-full flex items-center justify-center my-8">
            <button
              onClick={() => {
                navigate("/")
              }}
              className="bg-lgBlue-400 border border-white w-[250px]   font-bold text-xl rounded-2xl p-3 shadow-lg text-white"
            >
              마이 페이지 가기
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
