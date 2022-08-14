export default function ChangeLanguage({ exercise, ...restProps }) {
  const exerciseName = {
    PUSHUP: "팔굽혀펴기",
    BURPEE: "버피",
    SQUAT: "스쿼트",
    JUMPINGJACK: "팔벌려뛰기",
    LUNGE: "런지",
    LATERALRAISE: "레터럴레이즈",
  }
  return (
    <div {...restProps}>
      <span>{exerciseName[exercise]}</span>
    </div>
  )
}
