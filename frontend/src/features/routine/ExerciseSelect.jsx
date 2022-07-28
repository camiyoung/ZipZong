import ImageIcon from "../../components/icon/ImageIcon"
import ExerciseIcon from "../../components/icon/ExerciseIcon"
import ChangeLanguage from "./ChangeLanguage"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

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

export default function ExerciseSelect({
  routine,
  setRoutine,
  idx,
  setIdx,
  breakTime,
  setBreakTime,
}) {
  const params = useParams()

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      console.log(routines[params.index].exercise)
      setRoutine(routines[params.index].exercise)
      setBreakTime(routines[params.index].breaktime)
    }
  }, [])

  return (
    <div>
      <div> </div>
      <div className="flex">
        <div className="bg-primary-100 w-[1100px] h-[300px] rounded-2xl m-3 items-center flex overflow-hidden relative px-16">
          <div
            className="bg-primary-300 w-[50px] h-[300px] absolute left-0 hover:bg-mainBlue cursor-pointer"
            onClick={() => {
              if (routine.length >= 5 && idx === 5) {
                setIdx(0)
              }
            }}
          ></div>
          <div className="flex">
            {routine.slice(idx, idx + 5).map(({ name, count }, index) => {
              return (
                <div className="" key={index}>
                  <div className="bg-white w-[170px] h-[240px] rounded-3xl m-3 border-primary-200 flex items-center flex-col justify-center relative">
                    <div
                      className="absolute right-4 top-2 text-red-300 cursor-pointer"
                      onClick={() => {
                        let delRoutine = [...routine]
                        delRoutine.splice(index + idx, 1)
                        setRoutine(delRoutine)
                      }}
                    >
                      ×
                    </div>
                    <div className="">
                      <ExerciseIcon
                        size="large"
                        shape="round"
                        image={name}
                      ></ExerciseIcon>
                    </div>
                    <div className="p-3">
                      <ChangeLanguage exercise={name} />
                    </div>
                    <div className="flex">
                      <div>
                        <button
                          className="w-6 bg-lightBlue rounded-2xl hover:bg-mainBlue"
                          onClick={() => {
                            if (count > 6) {
                              let newRoutine = [...routine]
                              newRoutine[idx + index].count -= 5
                              setRoutine(newRoutine)
                            }
                          }}
                        >
                          -
                        </button>
                      </div>
                      <div className="px-3"> {count} </div>
                      <div>
                        <button
                          className="w-6 bg-lightBlue rounded-2xl hover:bg-mainBlue "
                          onClick={() => {
                            if (count <= 99) {
                              let newRoutine = [...routine]
                              newRoutine[idx + index].count += 5
                              setRoutine(newRoutine)
                            }
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div
            className="bg-primary-300 w-[50px] h-[300px] absolute right-0 hover:bg-mainBlue cursor-pointer"
            onClick={() => {
              if (idx === 0 && routine.length >= 6) {
                setIdx(5)
              }
            }}
          ></div>
        </div>
        <div className="bg-secondary-300 w-[200px] h-[300px] rounded-2xl m-3 flex items-center flex-col justify-center">
          <div className="bg-white w-[170px] h-[240px] rounded-3xl m-3 border-primary-200 flex items-center flex-col justify-center">
            <div className="flex justify-center">
              <ImageIcon
                size="large"
                shape="round"
                image="http://kaka0.net/data/file/humor/2950631858_xklV5CvP_6.jpeg"
              ></ImageIcon>
            </div>
            <div className="flex justify-center p-3"> 휴식</div>
            <div className="flex justify-center">
              <button
                className="w-6 bg-lightBlue rounded-2xl hover:bg-mainBlue "
                onClick={() => {
                  if (breakTime >= 5) {
                    setBreakTime(breakTime - 5)
                  }
                }}
              >
                -
              </button>
              <div className="w-16 flex justify-center"> {breakTime}초 </div>
              <button
                className="w-6 bg-lightBlue rounded-2xl hover:bg-mainBlue "
                onClick={() => {
                  if (breakTime < 60) {
                    setBreakTime(breakTime + 5)
                  }
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
