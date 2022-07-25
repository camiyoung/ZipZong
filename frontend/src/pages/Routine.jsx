import RoutineList from "../features/routine/RoutineList"

export default function Routine() {
  return (
    <div>
      <div className="flex justify-center p-5 pt-10 text-primary-600 text-3xl">
        그룹 루틴
      </div>
      <div className="flex justify-center">
        <RoutineList />
      </div>
      <div className="flex"></div>
    </div>
  )
}
