import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div>
      main page
      <button className="bg-yellow-400">
        <Link to="/components">컴포넌트 보기</Link>
      </button>
    </div>
  )
}
