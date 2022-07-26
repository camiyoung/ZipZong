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

export default function ExerciseList({ routine, setRoutine }) {
  return (
    <div className="flex justify-center">
      {exerciseList.map(({ name }, index) => {
        return (
          <div key={index} className="p-5">
            <div
              className="flex justify-center pt-3 cursor-pointer"
              onClick={() => setRoutine(routine.concat(exerciseList[index]))}
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
