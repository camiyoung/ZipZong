import Profile from "../features/myPage/Profile"
import { useSelector, useDispatch } from "react-redux"
import PersonalExerciseInfo from "../features/myPage/PersonalExerciseInfo"
import GroupList from "../features/myPage/GroupList"
import { http } from "../api/axios"
import {
  checkMemberName,
  checkMemberNickname,
  checkMemberProvider,
  checkMemberEmail,
} from "../features/login/memberReducer"

export default function MyPage() {
  const dispatch = useDispatch()
  const memberId = useSelector((state) => state.memberId)
  http
    .get(`/member/info/${memberId}`)
    .then((res) => {
      dispatch(checkMemberName(res.data.name))
      dispatch(checkMemberEmail(res.data.email))
      dispatch(checkMemberProvider(res.data.provider))
      dispatch(checkMemberNickname(res.data.nickname))
      console.log("로그인함", res)
    })
    .catch((err) => console.error(err))
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
