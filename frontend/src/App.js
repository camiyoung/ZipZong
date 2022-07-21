import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Components from "./pages/Components"
import Invite from "./pages/Invite"
import Group from "./pages/Group"
import Home from "./pages/Home"
import MyPage from "./pages/MyPage"
import RoomPage from "./pages/RoomPage"

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
          <Route path="/room" element={<RoomPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
