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
  return (
    <div className="flex justify-center">
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
