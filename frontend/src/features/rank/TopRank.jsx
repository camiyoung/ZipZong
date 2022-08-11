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
        <div className="w-full h-full bg-[#ffffff85] text-[#9898cf]" key={idx}>
          <div className="flex h-full items-center justify-center  text-2xl font-medium">
            {group.rank !== -1 ? (
              <span>[{group.teamName}] 66일 연속 운동 성공!</span>
            ) : (
              <span> 연속 66일의 운동으로 명예의 전당에 도전해보세요 ! </span>
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

export const TopRank = ({ list }) => {
  const rankList = [...list]
  if (rankList.length < 10) {
    for (let i = rankList.length; i < 10; i++) rankList.push(defaultItem)
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
          <h1 className="text-5xl font-extrabold  text-center ">
            <span>💎 </span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              명예의 전당
            </span>
            <span> 💎</span>
          </h1>
          <p className="text-center font-semibold mt-4 text-lg">
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
            <div className="text-lg font-semibold absolute  flex  flex-col justify-center items-center w-[80%] h-[80%]  ">
              {top3[1].rank !== -1 ? (
                <Avatar img={`/images/badgeIcon/${top3[1].teamIcon}.png`} />
              ) : (
                <Avatar rounded={true} />
              )}

              <div>{top3[1].teamName} </div>
              <div className="font-medium text-base ">
                {top3[1].rank !== -1 && <div>{top3[1].satisfiedTime} 분 </div>}
              </div>
            </div>
          </div>
          <div className="w-[33%] h-full flex items-center justify-center animate-prize-gold relative ">
            <img
              src="/images/rankPage/diamond.png"
              alt=""
              className=" w-full h-full"
            />
            <div className="text-lg font-semibold absolute  flex  flex-col justify-center items-center w-[80%] h-[80%]  ">
              {top3[0].rank !== -1 ? (
                <Avatar img={`/images/badgeIcon/${top3[0].teamIcon}.png`} />
              ) : (
                <Avatar rounded={true} />
              )}

              <div>{top3[0].teamName} </div>
              <div className="font-medium text-base ">
                {top3[0].rank !== -1 && <div>{top3[0].satisfiedTime} 분 </div>}
              </div>
            </div>
          </div>

          <div className="w-[33%] h-full flex items-center justify-center animate-prize-bronze relative  top-20 ">
            <img
              src="/images/rankPage/gold.png"
              alt=""
              className=" w-[75%] h-[75%]"
            />
            <div className="text-lg font-semibold absolute  flex  flex-col justify-center items-center w-[80%] h-[80%]  ">
              {top3[2].rank !== -1 ? (
                <Avatar img={`/images/badgeIcon/${top3[2].teamIcon}.png`} />
              ) : (
                <Avatar rounded={true} />
              )}

              <div>{top3[2].teamName} </div>
              <div className="font-medium text-base ">
                {top3[2].rank !== -1 && <div>{top3[2].satisfiedTime} 분 </div>}
              </div>
            </div>
          </div>
        </div>
        <div className=" h-16 w-4/5">
          <RankSlider list={under3} />
        </div>
      </div>
    </div>
  )
}
