export default function ChangeLanguage({ exercise }) {
  const exerciseENG = [
    "PUSHUP",
    "BURPEE",
    "LEGRAISE",
    "MOUNTAINCLIMING",
    "SQUAT",
  ]
  const exerciseKOR = [
    "팔굽혀펴기",
    "버피",
    "레그 레이즈",
    "마운틴 클라이밍",
    "스쿼트",
  ]

  return (
    <div>
      {exerciseKOR.map((KOR, index) => {
        if (exercise === exerciseENG[index]) {
          return <span>{KOR}</span>
        }
      })}
    </div>
  )
}
