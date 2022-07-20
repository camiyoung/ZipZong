import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Components from "./pages/Components"
import Invite from "./pages/Invite"
import Group from "./pages/Group"
import Home from "./pages/Home"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/components" element={<Components />} />
          <Route path="/invite" element={<Invite />} />
          <Route path="/group" element={<Group />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
