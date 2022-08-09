// import "flowbite"
import { Carousel, Avatar } from "flowbite-react"

const rankList = [
  "그룹1",
  "그룹2",
  "그룹3",
  "그룹4",
  "그룹5",
  "그룹6",
  "그룹7",
  "그룹8",
  "그룹9",
  "그룹10",
]

const RankSlider = () => {
  return (
    <Carousel
      indicators={false}
      slideInterval={3000}
      slide={true}
      leftControl=" "
      rightControl=" "
    >
      {rankList.map((name, idx) => (
        <div className="w-full h-full bg-[#ffffff85] text-[#9898cf]">
          <div className="flex h-full items-center justify-center  text-2xl font-medium">
            {name} 2022/08/09 66일 달성!
          </div>
        </div>
      ))}
    </Carousel>
  )
}

export const TopRank = ({ list = rankList }) => {
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
              <Avatar img="/images/animalIcon/basic.png" />
              <div>그룹B</div>
            </div>
          </div>
          <div className="w-[33%] h-full flex items-center justify-center animate-prize-gold relative ">
            <img
              src="/images/rankPage/diamond.png"
              alt=""
              className=" w-full h-full"
            />
            <div className="text-lg font-semibold absolute  flex  flex-col justify-center items-center w-[80%] h-[80%]  ">
              <Avatar img="/images/animalIcon/frog.png" />
              <div>그룹A</div>
            </div>
          </div>

          <div className="w-[33%] h-full flex items-center justify-center animate-prize-bronze relative  top-20 ">
            <img
              src="/images/rankPage/gold.png"
              alt=""
              className=" w-[75%] h-[75%]"
            />
            <div className="text-lg font-semibold absolute  flex  flex-col justify-center items-center w-[80%] h-[80%]  ">
              <Avatar img="/images/animalIcon/rabbit.png" />
              <div>그룹B</div>
            </div>
          </div>
        </div>
        <div className=" h-16 w-4/5">
          <RankSlider />
        </div>
      </div>
    </div>
  )
}
