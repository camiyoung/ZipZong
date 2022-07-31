export default function RoutineButton({
  routineName,
  exercise,
  breakTime,
  index,
  routines,
}) {
  return (
    <div className="flex justify-center">
      <button
        className="bg-primary-500 w-[160px] h-[60px] m-3 font-bold text-xl rounded-2xl"
        onClick={() => {
          const totalTime = exercise.length * 60 + breakTime

          const newRoutine = {
            routineName,
            exercise,
            breakTime,
            totalTime,
          }

          if (index) {
            routines[index] = newRoutine
          }

          console.log(newRoutine)
        }}
      >
        {" "}
        {index ? "루틴 수정" : "루틴 생성"}{" "}
      </button>
    </div>
  )
}
