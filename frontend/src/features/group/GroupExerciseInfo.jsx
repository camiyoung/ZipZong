import React from "react"
import ImageIcon from "../../components/icon/ImageIcon"

const groupInfo = [
  {
    groupExerciseIcon:
      "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    groupExerciseName: "레그 레이즈",
    groupExerciseCount: "120",
    groupExerciseKey: 1,
  },
  {
    groupExerciseIcon:
      "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    groupExerciseName: "스쿼트",
    groupExerciseCount: "200",
    groupExerciseKey: 2,
  },
  {
    groupExerciseIcon:
      "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    groupExerciseName: "런지",
    groupExerciseCount: "130",
    groupExerciseKey: 3,
  },
  {
    groupExerciseIcon:
      "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    groupExerciseName: "팔굽혀펴기",
    groupExerciseCount: "380",
    groupExerciseKey: 4,
  },
  {
    groupExerciseIcon:
      "https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg",
    groupExerciseName: "마운틴 클라이밍",
    groupExerciseCount: "140",
    groupExerciseKey: 5,
  },
]

export default function GroupExerciseInfo() {
  return (
    <div className="flex mt-10">
      {groupInfo.map(
        ({
          groupExerciseIcon,
          groupExerciseName,
          groupExerciseCount,
          groupExerciseKey,
        }) => {
          return (
            <div key={groupExerciseKey} className="flex">
              <ImageIcon image={groupExerciseIcon} size="middle" />
              <div className="flex flex-col mx-5">
                <p>{groupExerciseName}</p>
                <p>{groupExerciseCount}</p>
              </div>
            </div>
          )
        }
      )}
    </div>
  )
}
