import Profile from "../features/myPage/Profile"
import PersonalExerciseInfo from "../features/myPage/PersonalExerciseInfo"
import GroupList from "../features/myPage/GroupList"

export default function MyPage() {
  return (
    <div>
      <div className="flex justify-center pt-4">
        <Profile />
      </div>
      <div className="flex justify-center pb-10">
        <PersonalExerciseInfo />
      </div>
      <div className="p-5">
        <GroupList />
      </div>
    </div>
  )
}
