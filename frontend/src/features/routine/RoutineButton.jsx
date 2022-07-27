export default function RoutineButton({ routineName, exercise, breakTime }) {
  return (
    <div className="flex justify-center">
      <button
        onClick={() => {
          const totalTime = exercise.length * 60 + breakTime
          const newRoutine = [
            {
              routineName,
              exercise,
              breakTime,
              totalTime,
            },
          ]
          console.log(newRoutine)
        }}
      >
        {" "}
        루틴 완성{" "}
      </button>
    </div>
  )
}
