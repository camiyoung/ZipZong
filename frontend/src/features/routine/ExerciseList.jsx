import ExerciseIcon from "../../components/icon/ExerciseIcon"

const exerciseList = [
  {
    name: "푸쉬업",
    count: 10,
  },
  {
    name: "버피",
    count: 10,
  },
  {
    name: "레그레이즈",
    count: 10,
  },
  {
    name: "마운틴클라이밍",
    count: 10,
  },
  {
    name: "스쿼트",
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
            <div className="flex justify-center p-3">{name}</div>
          </div>
        )
      })}
    </div>
  )
}
