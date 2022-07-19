import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      main page
      <Link to='/components'>컴포넌트 보기 </Link>
    </div>
  )
}
