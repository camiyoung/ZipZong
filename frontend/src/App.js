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

function App() {
  return (
    <div className="h-screen w-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/components" element={<Components />} />
          <Route path="/invite" element={<Invite />} />
          <Route path="/group" element={<Group />} />
          <Route path="/groupset" element={<GroupSet />} />

          <Route path="/login" element={<Login />} />
          <Route path="/room" element={<RoomPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/rank" element={<RankPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
