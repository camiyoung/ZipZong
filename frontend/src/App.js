import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Components from "./pages/Components"
import Invite from "./pages/Invite"
import Home from "./pages/Home"
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

          <Route path="/room" element={<RoomPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
