import React, { useEffect, useState } from "react"
import Trainer from "../assets/personal_trainer.svg"
import Workout from "../assets/workout.svg"
import AOS from "aos"
import "aos/dist/aos.css"
import { useSelector } from "react-redux"

const ResultCard = ({ name, target, performed }) => {
  return (
    <div
      className="border w-40 bg-white m-3 h-64 p-3 rounded-2xl"
      data-aos="fade-up"
    >
      <div className="border h-32 mb-2">운동이미지</div>
      <div className="space-y-2">
        <div className="border rounded-2xl text-center">{name}</div>
        <div className="border rounded-2xl text-center">목표 : {target} </div>
        <div className="border rounded-2xl text-center">성공 :{performed}</div>
      </div>
    </div>
  )
}

const OtherPlayerResult = ({ name, res }) => {
  return (
    <div className="bg-white w-24 h-24 border flex justify-center items-center flex-col m-1 rounded-lg">
      <div>{name}</div>
      <div>{res}</div>
    </div>
  )
}
export default function ExerciseResulPage() {
  const [hasRes, setHasRes] = useState(false)
  const result = useSelector((state) => state.exercise.result)

  useEffect(() => {
    if (result.myResult && result.allResult) setHasRes(true)
    AOS.init()
  }, [])

  return (
    <>
      {hasRes ? (
        <div className="w-screen">
          {/* 운동 종료 안내 섹션  */}
          <section className=" w-full p-3 h-screen flex flex-col justify-center items-center relative">
            <img
              src={Trainer}
              alt=""
              className="absolute  -left-32 w-3/6 h-3/6 bottom-0 animate-slide-from-left"
            />
            <img
              src={Workout}
              alt=""
              className="absolute  -right-0 w-2/6 h-3/6 top-10  animate-slide-from-right"
            />
            <h1 className=" text-4xl font-bold my-4  text-black">
              운동이 종료되었습니다!
            </h1>
            <h2 className="font-semibold text-2xl mb-4">
              내 달성률 :{result.myResult.percentage}%
            </h2>
            <h2 className="font-semibold text-2xl mb-12 mt-12">
              우리팀 평균 달성률 : {result.allResult.avgPercentage}%
            </h2>
            <div className="flex w-4/5 justify-center z-30">
              {result.allResult.personalPercentages.map((user, idx) => (
                <OtherPlayerResult
                  name={user.nickname}
                  res={user.percentage}
                  key={idx}
                />
              ))}
            </div>
            <p className=" text-xl mb-4 absolute bottom-20 animate-pulse ">
              스크롤을 내려서 기록을 확인해 보세요
            </p>
          </section>
          {/* 운동 루틴 결과 섹션 */}
          <section className="w-full  flex justify-center items-center flex-col p-3">
            <h1 className=" text-4xl font-bold my-12 "> 진행한 운동 루틴 </h1>
            <div className="flex flex-wrap  justify-center">
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
          {/* footer */}
          <section className="w-full h-40 flex justify-center items-center flex-col p-3"></section>
        </div>
      ) : (
        <div className="w-screen">
          <section className=" w-full p-3 h-screen flex flex-col justify-center items-center relative">
            <img
              src={Trainer}
              alt=""
              className="absolute  -left-32 w-3/6 h-3/6 bottom-0 animate-slide-from-left"
            />
            <img
              src={Workout}
              alt=""
              className="absolute  -right-0 w-2/6 h-3/6 top-10  animate-slide-from-right"
            />
            <h1 className=" text-4xl font-bold my-4  text-black animate-pulse">
              운동이 종료되었습니다!
            </h1>
          </section>
        </div>
      )}
    </>
  )
}
