import ImageIcon from "../../components/icon/ImageIcon"
import Card from "../../components/card/Card"
import { Link } from "react-router-dom"

const Routines = [
  {
    routineName: "슬기세트",
    exercise: [
      { name: "윗몸일으키기", count: 5, order: 1 },
      { name: "윗몸일으키기", count: 5, order: 2 },
      { name: "윗몸일으키기", count: 5, order: 3 },
      { name: "윗몸일으키기", count: 5, order: 4 },
    ],
    breaktime: 60,
    totaltime: 300,
  },
  {
    routineName: "종민세트",
    exercise: [
      { name: "버피", count: 5 },
      { name: "버피", count: 5 },
      { name: "버피", count: 5 },
      { name: "버피", count: 5 },
    ],
    breaktime: 60,
  },
  {
    routineName: "준우세트",
    exercise: [
      { name: "레그레이즈", count: 5 },
      { name: "레그레이즈", count: 5 },
      { name: "레그레이즈", count: 5 },
      { name: "레그레이즈", count: 5 },
    ],
    breaktime: 60,
  },
  {
    routineName: "승주세트",
    exercise: [
      { name: "푸쉬업", count: 5 },
      { name: "푸쉬업", count: 5 },
      { name: "푸쉬업", count: 5 },
      { name: "푸쉬업", count: 5 },
    ],
    breaktime: 60,
  },
  {
    routineName: "지영세트",
    exercise: [
      { name: "PT체조", count: 5 },
      { name: "PT체조", count: 5 },
      { name: "PT체조", count: 5 },
      { name: "PT체조", count: 5 },
    ],
    breaktime: 60,
  },
]

export default function RoutineList() {
  return (
    <div className="flex">
      {Routines.map(({ routineName, exercise, breaktime }) => {
        return (
          <div className="m-3">
            <Card size="middle">
              <div className="">
                <div className=" bg-lightBlue border-2 m-2 rounded-3xl flex justify-center">
                  {routineName}
                </div>
                {exercise.map(({ name, count }) => {
                  return (
                    <div className="flex justify-center">
                      {name} {count}
                    </div>
                  )
                })}
                <div className="flex justify-center">쉬는 시간 {breaktime}</div>
                <div className="flex justify-center p-3">
                  총 운동 시간 : {exercise.length * 60 + breaktime} 초
                </div>
              </div>
            </Card>
          </div>
        )
      })}
      <div className="m-3">
        <Link to="/routine/make">
          <Card size="middle">
            <div className="flex justify-center p-2">
              <ImageIcon
                image="https://icons-for-free.com/download-icon-circle+more+plus+icon-1320183136549593898_512.png"
                size="large"
              />
            </div>
            <p className="p-2 font-bold flex justify-center text-lg">
              루틴을 추가해보세요.
            </p>
          </Card>
        </Link>
      </div>
    </div>
  )
}
