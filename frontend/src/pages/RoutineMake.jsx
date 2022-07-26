import LargeTextInput from "../components/input/LargeTextInput"
import ExerciseSetting from "../features/routine/ExerciseSetting"

export default function RoutineMake() {
  return (
    <div className="">
      <div className="flex p-10 justify-center font-extrabold text-3xl">
        루틴 생성하기
      </div>
      <div className="flex justify-center p-3">
        <div className="text-xl font-bold flex items-center pr-5">
          새 루틴 이름
        </div>
        <div>
          <LargeTextInput />
        </div>
      </div>
      <div>
        <ExerciseSetting />
      </div>
    </div>
  )
}
