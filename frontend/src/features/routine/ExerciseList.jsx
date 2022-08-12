import "./Routine.css"

import React, { useState } from "react"
import Modal from "../../components/modal/Modal"
import Button from "../../components/button/Button"

import ExerciseIcon from "../../components/icon/ExerciseIcon"
import ChangeLanguage from "./ChangeLanguage"

const exerciseList = [
  {
    name: "LUNGE",
    count: 10,
  },
  {
    name: "JUMPINGJACK",
    count: 10,
  },
  {
    name: "SQUAT",
    count: 10,
  },
  {
    name: "BURPEE",
    count: 10,
  },
  {
    name: "PUSHUP",
    count: 10,
  },
  {
    name: "LATERALRAISE",
    count: 10,
  },
]

export default function ExerciseList({ routine, setRoutine, idx, setIdx }) {
  const [isOpen, setOpen] = useState(false)
  const modalClose = () => setOpen(false)

  return (
    <div>
      <div className="flex justify-center pb-3">
        <Modal isOpen={isOpen} modalClose={modalClose}>
          <div>
            동작은 최대 10개까지 넣을 수 있습니다.
            <div className="flex justify-end pt-3">
              <Button onClick={() => modalClose()} text="확인" />
            </div>
          </div>
        </Modal>
        <div className="flex">
          {exerciseList.map(({ name }, index) => {
            return (
              <div key={index} className="flex justify-center">
                <div
                  className="w-[150px] shadow-md flex justify-center items-center bg-cover bg-center rounded-3xl mx-3 border-white border-4 clickbtn cursor-pointer text-base"
                  style={{
                    backgroundImage: `url(/images/exerciseIcon/${name}.png)`,
                  }}
                  onClick={() => {
                    if (routine.length < 10) {
                      const selected = { ...exerciseList[index] }
                      const newR = [...routine, selected]
                      setRoutine(newR)
                      if (routine.length >= 5) {
                        setIdx(5)
                      }
                    } else {
                      setOpen(true)
                    }
                  }}
                >
                  <div className="w-full h-full backdrop-blur-lg rounded-3xl">
                    <div className="flex flex-col justify-center items-center w-full h-full py-6">
                      <ExerciseIcon
                        size="large"
                        shape="round"
                        image={name}
                      ></ExerciseIcon>
                      <span className="bg-[#ffffffee] mt-4 p-1 w-full flex justify-center">
                        <ChangeLanguage exercise={name} className="" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div></div>
      </div>
    </div>
  )
}
