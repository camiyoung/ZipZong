import React, { useState } from "react"
import ImageIcon from "../../components/icon/ImageIcon"
import Modal from "../../components/modal/Modal"
import Button from "../../components/button/Button"
import Card from "../../components/card/Card"
import { Link } from "react-router-dom"
import ChangeLanguage from "./ChangeLanguage"

const routines = [
  {
    routineId: 0,
    routineName: "슬기세트",
    exercise: [
      { name: "PUSHUP", count: 5 },
      { name: "PUSHUP", count: 5 },
      { name: "PUSHUP", count: 5 },
      { name: "PUSHUP", count: 5 },
    ],
    breaktime: 60,
    totaltime: 300,
  },
  {
    routineId: 1,
    routineName: "종민세트",
    exercise: [
      { name: "BURPEE", count: 5 },
      { name: "BURPEE", count: 5 },
      { name: "BURPEE", count: 5 },
      { name: "BURPEE", count: 5 },
    ],
    breaktime: 60,
  },
  {
    routineId: 2,
    routineName: "준우세트",
    exercise: [
      { name: "LEGRAISE", count: 5 },
      { name: "LEGRAISE", count: 5 },
      { name: "LEGRAISE", count: 5 },
      { name: "LEGRAISE", count: 5 },
    ],
    breaktime: 60,
  },
  {
    routineId: 3,
    routineName: "승주세트",
    exercise: [
      { name: "PUSHUP", count: 5 },
      { name: "PUSHUP", count: 5 },
      { name: "PUSHUP", count: 5 },
      { name: "PUSHUP", count: 5 },
    ],
    breaktime: 60,
  },
]

export default function RoutineList() {
  const [isOpen, setOpen] = useState(false)
  const modalClose = () => setOpen(false)
  return (
    <div className="flex">
      <Modal isOpen={isOpen} modalClose={modalClose}>
        <div>
          루틴이 삭제되었습니다.
          <div className="flex justify-end">
            <Button onClick={() => modalClose()} text="확인" />
          </div>
        </div>
      </Modal>
      {routines.map(
        ({ routineId, routineName, exercise, breaktime }, index) => {
          return (
            <div className="m-3" key={routineId}>
              <Card size="middle">
                <div className="">
                  <div className=" bg-lgBlue-500 border-2 m-2 rounded-3xl flex justify-center">
                    {routineName}
                  </div>
                  {exercise.map(({ name, count }, index) => {
                    return (
                      <div className="flex justify-center" key={index}>
                        <ChangeLanguage exercise={name} />
                        {count}
                      </div>
                    )
                  })}
                  <div className="flex justify-center">
                    쉬는 시간 {breaktime}
                  </div>
                  <div className="flex justify-center p-3">
                    총 운동 시간 : {exercise.length * 60 + breaktime} 초
                  </div>
                  <div className="flex justify-center">
                    <Link to={`/routine/modify/${index}`}>
                      <div className="bg-secondary-300 m-2 w-[50px] rounded-xl flex justify-center text-sm items-center h-[35px] pointer hover:bg-secondary-500">
                        수정
                      </div>
                    </Link>
                    <div
                      className="bg-secondary-300 m-2 w-[50px] rounded-xl flex justify-center text-sm items-center pointer hover:bg-secondary-500"
                      onClick={() => {
                        setOpen(true)
                        routines.splice(index, 1)
                      }}
                    >
                      삭제
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )
        }
      )}
      {routines.length < 5 ? (
        <div className="m-3">
          <Link to="/routine/make">
            <Card size="middle">
              <div className="flex justify-center p-2">
                <ImageIcon
                  image="https://icons-for-free.com/download-icon-circle+more+plus+icon-1320183136549593898_512.png"
                  size="large"
                />
              </div>
              <p className="p-2 font-bold flex justify-center text-lg">
                루틴을 추가해보세요.
              </p>
            </Card>
          </Link>
        </div>
      ) : null}
    </div>
  )
}
