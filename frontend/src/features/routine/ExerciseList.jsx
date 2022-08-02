import React, { useState } from "react"
import Modal from "../../components/modal/Modal"
import Button from "../../components/button/Button"

import ExerciseIcon from "../../components/icon/ExerciseIcon"
import ChangeLanguage from "./ChangeLanguage"

const exerciseList = [
  {
    name: "PUSHUP",
    count: 10,
  },
  {
    name: "BURPEE",
    count: 10,
  },
  {
    name: "LEGRAISE",
    count: 10,
  },
  {
    name: "MOUNTAINCLIMING",
    count: 10,
  },
  {
    name: "SQUAT",
    count: 10,
  },
]

export default function ExerciseList({ routine, setRoutine, idx, setIdx }) {
  const [isOpen, setOpen] = useState(false)
  const modalClose = () => setOpen(false)

  return (
    <div className="flex justify-center">
      <Modal isOpen={isOpen} modalClose={modalClose}>
        <div>
          동작은 최대 10개까지 넣을 수 있습니다.
          <div className="flex justify-end pt-3">
            <Button onClick={() => modalClose()} text="확인" />
          </div>
        </div>
      </Modal>

      {exerciseList.map(({ name }, index) => {
        return (
          <div key={index} className="p-5">
            <div
              className="flex justify-center pt-3 cursor-pointer"
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
              <ExerciseIcon
                size="xLarge"
                shape="round"
                image={name}
              ></ExerciseIcon>
            </div>
            <div className="flex justify-center p-3">
              <ChangeLanguage exercise={name} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
