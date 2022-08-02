import "./App.css"

import { BrowserRouter, Routes, Route } from "react-router-dom"
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

function App() {
  return (
    <div className="h-screen w-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/components" element={<Components />} />
          <Route path="/invite" element={<Invite />} />

          <Route path="/group/:teamId" element={<Group />} />
          <Route path="/group" element={<Group />} />

          <Route path="/groupset" element={<GroupSet />} />
          <Route path="/routine" element={<Routine />} />
          <Route path="/routine/make" element={<RoutineMake />} />
          <Route path="/routine/modify/:routineId" element={<RoutineMake />} />

          <Route path="/login" element={<Login />} />
          <Route path="/room" element={<RoomPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/rank" element={<RankPage />} />
          <Route path="/result" element={<ExerciseResultPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
