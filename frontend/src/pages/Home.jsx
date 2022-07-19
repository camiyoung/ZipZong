import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div>
      <h1>메인페이지 </h1>
      <Link to="/components">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          컴포넌트 보기
        </button>
      </Link>
    </div>
  )
}
