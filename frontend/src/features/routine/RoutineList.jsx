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
      <div className="w-full flex">
        {routines.map(({ routineId, routineName, exercise, breakTime }) => {
          return (
            <div className="w-[20%]" key={routineId}>
              <div className="p-2">
                <div className="p-2 bg-white rounded-2xl border border-gray-200 shadow-md">
                  <div className="w-full">
                    <div className=" bg-lgBlue-400 shadow-sm m-3 p-1 rounded-2xl flex justify-center font-bold text-xl">
                      {routineName}
                    </div>
                    <div className="flex flex-col justify-center px-3">
                      {exercise.map(({ name, count }, index) => {
                        return (
                          <div
                            className="flex bg-white py-1 border-b"
                            key={index}
                          >
                            {/* <div className="w-1/6 flex justify-center">
                          {index + 1}
                        </div> */}
                            <div className="w-4/6 ml-2 flex justify-start items-center">
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
            </div>
          )
        })}

        {routines.length < 5 ? (
          <div className="w-[20%]">
            <div className="p-2">
              <div
                className="hover:scale-110 p-2 py-6 rounded-2xl border border-gray-200 shadow-md cursor-pointer"
                onClick={() => navigate(`/routine/${params.teamId}/make`)}
              >
                <div className="flex justify-center">
                  <img
                    src="/images/plus.png"
                    className="w-[5.6rem] border-4 border-black rounded-full p-4"
                  />
                </div>
                <p className="p-2 font-bold flex justify-center text-lg">
                  루틴을 추가해보세요.
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
