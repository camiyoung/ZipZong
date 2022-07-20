import React from "react"

const groupInfo = [
  {
    groupExerciseName: "레그 레이즈",
    groupExerciseCount: "120",
    groupExerciseKey: 1,
  },
  {
    groupExerciseName: "스쿼트",
    groupExerciseCount: "200",
    groupExerciseKey: 2,
  },
  {
    groupExerciseName: "런지",
    groupExerciseCount: "130",
    groupExerciseKey: 3,
  },
  {
    groupExerciseName: "팔굽혀펴기",
    groupExerciseCount: "380",
    groupExerciseKey: 4,
  },
  {
    groupExerciseName: "마운틴 클라이밍",
    groupExerciseCount: "140",
    groupExerciseKey: 5,
  },
]

export default function GroupExerciseInfo() {
  return (
    <div>
      {groupInfo.map(
        ({ groupExerciseName, groupExerciseCount, groupExerciseKey }) => {
          return (
            <div key={groupExerciseKey}>
              <p>{groupExerciseCount}</p>
              <p>{groupExerciseName}</p>
            </div>
          )
        }
      )}
      <p>a</p>
    </div>
  )
}
