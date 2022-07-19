import { BrowserRouter, Routes, Route } from "react-router-dom"
import Components from "./pages/Components"
import Home from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/components" element={<Components />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
