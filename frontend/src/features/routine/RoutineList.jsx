import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import ImageIcon from "../../components/icon/ImageIcon"
import Modal from "../../components/modal/Modal"
import Button from "../../components/button/Button"
import Card from "../../components/card/Card"
import ChangeLanguage from "./ChangeLanguage"
import { getRoutine, deleteRoutine } from "./routineReducer"
import { useParams, useNavigate } from "react-router-dom"

export default function RoutineList() {
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()

  const [isOpen, setOpen] = useState(false)
  const modalClose = () => setOpen(false)

  const routines = useSelector((state) => state.routine.routines)

  useEffect(() => {
    dispatch(getRoutine(params.teamId))
  }, [])

  return (
    <div className="w-4/5">
      <Modal isOpen={isOpen} modalClose={modalClose}>
        <div>
          루틴이 삭제되었습니다.
          <div className="flex justify-end">
            <Button onClick={() => modalClose()} text="확인" />
          </div>
        </div>
      </Modal>
      <div className="w-full flex justify-between">
        {routines.map(({ routineId, routineName, exercise, breakTime }) => {
          return (
            <div className="w-[20%] m-2" key={routineId}>
              <div className="p-2 bg-white rounded-2xl border border-gray-200 shadow-md">
                <div className="w-full">
                  <div className=" bg-lgBlue-400 shadow-sm m-3 p-1 rounded-2xl flex justify-center font-bold text-xl">
                    {routineName}
                  </div>
                  <div className="flex flex-col justify-center px-3">
                    {exercise.map(({ name, count }, index) => {
                      return (
                        <div className="flex bg-white rounded-2xl py-1 border-b">
                          {/* <div className="w-1/6 flex justify-center">
                          {index + 1}
                        </div> */}
                          <div
                            className="w-4/6 ml-2 flex justify-start items-center"
                            key={index}
                          >
                            <ChangeLanguage exercise={name} />
                          </div>
                          <div className="w-2/6 flex mr-3 justify-end">
                            {count}회
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex justify-center p-3">
                    쉬는 시간 {breakTime}초
                  </div>
                  {/* <div className="flex justify-center">
                    총 운동 시간 :{" "}
                    {exercise.length * 60 + (exercise.length - 1) * breakTime}{" "}
                    초
                  </div> */}
                  <div className="flex justify-center mb-1">
                    <div
                      className="bg-secondary-300 m-2 w-[50px] rounded-xl flex justify-center text-sm items-center h-[35px] pointer hover:bg-secondary-500"
                      onClick={() =>
                        navigate(`/routine/${params.teamId}/${routineId}`)
                      }
                    >
                      수정
                    </div>
                    <div
                      className="bg-secondary-300 m-2 w-[50px] rounded-xl flex justify-center text-sm items-center pointer hover:bg-secondary-500"
                      onClick={() => {
                        setOpen(true)
                        dispatch(deleteRoutine(routineId))
                      }}
                    >
                      삭제
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        {routines.length < 5 ? (
          <div
            className="m-3"
            onClick={() => navigate(`/routine/${params.teamId}/make`)}
          >
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
          </div>
        ) : null}
      </div>
    </div>
  )
}
