import ImageIcon from "../../components/icon/ImageIcon"
import ExerciseIcon from "../../components/icon/ExerciseIcon"
import ChangeLanguage from "./ChangeLanguage"

export default function ExerciseSelect({
  routine,
  setRoutine,
  idx,
  setIdx,
  breakTime,
  setBreakTime,
}) {
  return (
    <div className="text-base">
      <div className="flex">
        <div className="w-[1100px] h-[300px] rounded-2xl m-3 items-center flex overflow-hidden relative px-16 bg-gradient-to-b from-primary-100 to-lgBlue-300 shadow-md">
          <div
            className="bg-primary-300 w-[50px] h-[300px] absolute left-0 hover:bg-mainBlue cursor-pointer"
            onClick={() => {
              if (routine.length >= 5 && idx === 5) {
                setIdx(0)
              }
            }}
            style={{
              backgroundImage: `url(/images/routine/LEFT.png)`,
            }}
          ></div>
          <div className="flex">
            {routine.slice(idx, idx + 5).map(({ name, count }, index) => {
              return (
                <div className="" key={index}>
                  <div className="bg-white w-[170px] h-[240px] rounded-3xl m-3 shadow-md flex items-center flex-col justify-center relative">
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
                    <div>
                      <ExerciseIcon
                        size="large"
                        shape="round"
                        image={name}
                      ></ExerciseIcon>
                    </div>
                    <div className="m-3 mt-2 text-base flex w-full justify-center">
                      <span className="mr-2 text-sm flex items-center rounded-full">
                        {idx + index + 1}
                      </span>{" "}
                      <span>
                        <ChangeLanguage exercise={name} />
                      </span>
                    </div>
                    <div className="flex">
                      <div className=" flex items-white">
                        <button
                          className="clickbtn text-primary-500"
                          onClick={() => {
                            if (count > 5) {
                              let newRoutine = routine.map((r, ridx) => {
                                if (ridx === idx + index) {
                                  return { name: r.name, count: r.count - 5 }
                                } else return r
                              })
                              setRoutine(newRoutine)
                            }
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="w-[60px] flex justify-center text-sm items-center">
                        {" "}
                        {count} 회
                      </div>
                      <div className=" flex items-center">
                        <button
                          className="clickbtn text-primary-500"
                          onClick={() => {
                            if (count <= 94) {
                              let newRoutine = routine.map((r, ridx) => {
                                if (ridx === idx + index) {
                                  return { name: r.name, count: r.count + 5 }
                                } else return r
                              })
                              setRoutine(newRoutine)
                            }
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
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
            style={{
              backgroundImage: `url(/images/routine/RIGHT.png)`,
            }}
          ></div>
        </div>
        <div className="w-[200px] h-[300px] rounded-2xl m-3 flex items-center flex-col justify-center bg-gradient-to-b from-secondary-100 to-secondary-300 shadow-md">
          <div className="bg-white w-[170px] h-[240px] rounded-3xl m-3 flex items-center flex-col justify-center">
            <div className="flex justify-center">
              <ImageIcon
                size="large"
                shape="round"
                image={`/images/exerciseIcon/BREAK.png`}
                borderStyle="none"
              ></ImageIcon>
            </div>
            <div className="flex justify-center p-3"> 휴식</div>
            <div className="flex justify-center">
              <button
                className="clickbtn text-primary-500"
                onClick={() => {
                  if (breakTime > 15) {
                    setBreakTime(breakTime - 15)
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <div className="w-[60px] flex justify-center text-sm items-center">
                {" "}
                {breakTime}초{" "}
              </div>
              <button
                className="clickbtn text-primary-500"
                onClick={() => {
                  if (breakTime < 60) {
                    setBreakTime(breakTime + 15)
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
