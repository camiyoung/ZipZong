export default function ChangeLanguage({ exercise }) {
  const exerciseENG = [
    "PUSHUP",
    "BURPEE",
    "SQUAT",
    "JUMPINGJACK",
    "LUNGE",
    "LATERALRAISE",
  ]
  const exerciseKOR = [
    "팔굽혀펴기",
    "버피",
    "스쿼트",
    "팔벌려뛰기",
    "런지",
    "레터럴레이즈",
  ]

  return (
    <div>
      {exerciseKOR.map((KOR, index) => {
        if (exercise === exerciseENG[index]) {
          return <span key={index}>{KOR}</span>
        }
      })}
    </div>
  )
}
