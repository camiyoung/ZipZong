import RoutineList from "../features/routine/RoutineList"

export default function Routine() {
  return (
    <div className="">
      <div className="">
        <div className="flex pt-10 text-primary-700 justify-center font-extrabold text-3xl">
          그룹 루틴
        </div>
        <div className="flex pt-2 pb-5 text-lgBlue-600 justify-center font-bold text-md">
          📃 루틴은 최대 다섯 개 까지 생성 가능합니다.
        </div>
      </div>
      <div className="flex justify-center pt-10">
        <RoutineList />
      </div>
      <div className="flex"></div>
    </div>
  )
}
