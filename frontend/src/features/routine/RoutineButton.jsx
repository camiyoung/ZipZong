import { useSelector } from "react-redux"
import React, { useState } from "react"
import Modal from "../../components/modal/Modal"
import Button from "../../components/button/Button"

export default function RoutineButton({
  routineName,
  exercise,
  breakTime,
  routineId,
}) {
  const [errorMessage, setError] = useState("")
  const [isOpen, setOpen] = useState(false)
  const modalClose = () => setOpen(false)
  const routines = useSelector((state) => state.routine.routines)

  return (
    <div className="flex justify-center">
      <Modal isOpen={isOpen} modalClose={modalClose}>
        <div>
          {errorMessage}
          <div className="flex justify-end pt-3">
            <Button onClick={() => modalClose()} text="확인" />
          </div>
        </div>
      </Modal>

      <button
        className="bg-primary-500 w-[160px] h-[60px] m-3 font-bold text-xl rounded-2xl"
        onClick={() => {
          const totalTime = exercise.length * 60 + breakTime
          if (routineName === "") {
            setError("한 글자 이상의 루틴 이름을 설정해 주세요")
            setOpen(true)
          } else if (exercise.length === 0) {
            setError("루틴에 하나 이상의 동작을 넣어주세요")
            setOpen(true)
          } else if (routines.length >= 5) {
            setError("그룹의 루틴이 이미 최대 개수입니다")
            setOpen(true)
          } else {
            const newRoutine = {
              routineName,
              exercise,
              breakTime,
              totalTime,
            }

            console.log(newRoutine)
          }
        }}
      >
        {" "}
        {routineId ? "루틴 수정" : "루틴 생성"}{" "}
      </button>
    </div>
  )
}
