import ExerciseList from "./ExerciseList"

export default function RoutineButton({ routineName, exercise, breakTime }) {
  return (
    <div className="flex justify-center">
      <button
        className="bg-primary-500 w-[160px] h-[60px] m-3 font-bold text-xl rounded-2xl"
        onClick={() => {
          const totalTime = exercise.length * 60 + breakTime
          for (let i = 0; i < exercise.length; i++) {
            if (exercise[i].name === "푸쉬업") {
              exercise[i].name = "PUSHUP"
            } else if (exercise[i].name === "버피") {
              exercise[i].name = "BURPEE"
            } else if (exercise[i].name === "레그레이즈") {
              exercise[i].name = "LEGRAISE"
            } else if (exercise[i].name === "마운틴클라이밍") {
              exercise[i].name = "MOUNTAINCLIMING"
            } else if (exercise[i].name === "스쿼트") {
              exercise[i].name = "SQUAT"
            }
          }
          const newRoutine = {
            routineName,
            exercise,
            breakTime,
            totalTime,
          }

          console.log(newRoutine)
        }}
      >
        {" "}
        루틴 생성{" "}
      </button>
    </div>
  )
}
