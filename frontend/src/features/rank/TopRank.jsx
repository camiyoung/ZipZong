// import "flowbite"
import { Carousel, Avatar } from "flowbite-react"

const RankSlider = ({ list }) => {
  return (
    <Carousel
      indicators={false}
      slideInterval={3000}
      slide={true}
      leftControl=" "
      rightControl=" "
    >
      {list.map((group, idx) => (
        <div
          className="w-full h-full bg-[#ffffff85] text-[#9898cf] border-double border-4 border-[#d6d6ee] rounded-xl"
          key={idx}
        >
          <div className="flex h-full items-center justify-center  text-2xl font-medium">
            {group.rank !== -1 ? (
              <p>
                <span className="underline decoration-solid underline-offset-4  decoration-[#9898cf]  decoration-2 inline-block mx-3">
                  {group.teamName}
                </span>
                <span>
                  {caculateDate(group.satisfiedTime)}에 66일 연속 운동 달성!
                </span>
              </p>
            ) : (
              <p> 연속 66일의 운동으로 명예의 전당에 도전해보세요 ! </p>
            )}
          </div>
        </div>
      ))}
    </Carousel>
  )
}

const defaultItem = {
  rank: -1,
  teamIcon: undefined,
  teamName: "",
  satisfiedTime: "",
}

const caculateDate = (day = 0) => {
  const date = new Date()
  date.setDate(date.getDate() - day)
  const completedDay = date
    .toLocaleDateString()
    .split(".")
    .map((item) => item.trim())

  completedDay.pop()
  const res = `${completedDay[0]}년 ${completedDay[1]}월 ${completedDay[2]}일`
  return res
}

const CompletedBadge = ({ day, rank }) => {
  const color = {
    1: "moving-grad text-white",
    2: "bg-pink-600 text-white",
    3: "bg-yellow-500 text-white",
  }

  return (
    <span
      className={`${color[rank]}  text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded-lg`}
    >
      <svg
        aria-hidden="true"
        className="mr-1 w-3 h-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
          clipRule="evenodd"
        ></path>
      </svg>
      {day === 0 ? (
        <span>오늘 66일 달성</span>
      ) : (
        <span>{day}일전 66일 달성</span>
      )}
    </span>
  )
}

const Top3Info = ({ team }) => {
  const gradient = {
    1: "top1",
    2: "top2",
    3: "top3",
  }

  const { rank, teamName: name, satisfiedTime: day, teamIcon: icon } = team
  return (
    <div className=" text-lg font-semibold absolute  flex  flex-col justify-center items-center w-[80%] h-[80%]  ">
      <div
        className={` top3 border-double border-4  px-2 rounded-xl flex flex-col items-center py-2 pt-3 ${gradient[rank]} `}
      >
        {rank !== -1 ? (
          <Avatar img={`/images/badgeIcon/${icon}.png`} rounded={true} />
        ) : (
          <Avatar rounded={true} />
        )}
        <div className=" px-2 rounded-xl my-1 ">{name}</div>
        <div className=" font-medium text-base ">
          {rank !== -1 && <CompletedBadge day={day} rank={rank} />}
        </div>
      </div>
    </div>
  )
}

export const TopRank = ({ list }) => {
  const rankList = [...list]
  if (rankList.length < 5) {
    for (let i = rankList.length; i < 5; i++) rankList.push(defaultItem)
  }

  const top3 = [rankList[0], rankList[1], rankList[2]]
  const under3 = rankList.slice(3)

  return (
    <div
      className=" relative  w-full  h-full rounded-3xl flex  items-center justify-center shadow-md"
      style={{
        backgroundImage: `url(/images/rankPage/rank_bg.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="  w-full  p-3   flex flex-col items-center justify-center ">
        <div>
          <h1 className="text-5xl font-extrabold  text-center  ml-10 ">
            <span>💎 </span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              명예의 전당
            </span>
            <span> 💎</span>
          </h1>
          <p className="text-center font-semibold mt-4 text-lg ml-10">
            66일 연속 운동을 달성한 그룹입니다 !
          </p>
        </div>
        <div className="flex  w-full justify-center ml-14">
          <div className="w-[33%] h-full  flex items-center animate-prize-silver relative top-16 ">
            <img
              src="/images/rankPage/ruby.png"
              alt=""
              className=" w-[80%] h-[80%] "
            />
            <Top3Info team={top3[1]} />
          </div>
          <div className="w-[33%] h-full flex items-center justify-center animate-prize-gold relative ">
            <img
              src="/images/rankPage/diamond.png"
              alt=""
              className=" w-full h-full"
            />
            <div className=" text-lg font-semibold absolute  flex  flex-col justify-center items-center w-[80%] h-[80%]  ">
              <Top3Info team={top3[0]} />
            </div>
          </div>

          <div className="w-[33%] h-full flex items-center justify-center animate-prize-bronze relative  top-20 ">
            <img
              src="/images/rankPage/gold.png"
              alt=""
              className=" w-[75%] h-[75%]"
            />
            <Top3Info team={top3[2]} />
          </div>
        </div>
        <div className=" h-16 w-4/5">
          <RankSlider list={under3} />
        </div>
      </div>
    </div>
  )
}
