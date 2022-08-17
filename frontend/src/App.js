import "./App.css"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Components from "./pages/Components"
import Invite from "./pages/Invite"
import Group from "./pages/Group"
import GroupSet from "./pages/GroupSet"
import Home from "./pages/Home"
import MyPage from "./pages/MyPage"
import RoomPage from "./pages/RoomPage"
import RankPage from "./pages/RankPage"
import Login from "./pages/Login"
import ExerciseResultPage from "./pages/ExerciseResutlPage"
import Routine from "./pages/Routine"
import RoutineMake from "./pages/RoutineMake"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { memberInfo } from "./features/login/memberReducer"
import { memberIconListReview } from "./features/myPage/myPageReducer"
import NotFound from "./pages/NotFound"

function App() {
  const dispatch = useDispatch()
  const token = localStorage.getItem("accessToken")
  const nickname = localStorage.getItem("nickname")

  // useEffect(() => {
  //   const checkLogined = async () => {
  //     if (!token) return
  //     if (!nickname) {
  //       // 토큰 있는데 닉네임이 없는 경우 -> 회원가입시 소셜 로그인만 완료후 닉네임을 설정하지 않은 경우.
  //       // 다시 로그인하고 닉네임 설정하도록 돌려보냄.
  //       return
  //     }
  //     dispatch(memberInfo(nickname))
  //     dispatch(memberIconListReview(localStorage.getItem("memberId")))
  //   }

  //   checkLogined()
  // }, [])

  return (
    <>
      {/* {!token || !nickname ? (
        <Login />
      ) : ( */}
      <div className="w-screen bg-gradient-to-b from-secondary-100 to-lgBlue-200">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Navigate replace to="/mypage" />} />
            <Route path="/components" element={<Components />} />
            <Route path="/invite" element={<Invite />} />

            <Route path="/group/:teamId" element={<Group />} />
            {/* <Route path="/group" element={<Group />} /> */}

            <Route path="/groupset/:teamId" element={<GroupSet />} />
            <Route path="/groupset" element={<GroupSet />} />
            <Route path="/routine/:teamId" element={<Routine />} />
            <Route path="/routine/:teamId/make" element={<RoutineMake />} />
            <Route
              path="/routine/:teamId/:routineId"
              element={<RoutineMake />}
            />

            <Route path="/login" element={<Login />} />
            {/* <Route path="/room" element={<RoomPage />} /> */}
            <Route path="/room/:teamId" element={<RoomPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/rank" element={<RankPage />} />
            <Route path="/result" element={<ExerciseResultPage />} />
          </Routes>
        </BrowserRouter>
      </div>
      {/* )} */}
    </>
  )
}
export default App
