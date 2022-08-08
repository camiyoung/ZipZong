// import "flowbite"
import { Carousel } from "flowbite-react"

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
      <div className="flex h-full items-center justify-center bg-primary-100  ">
        그룹 1 00/00/00 66일 달성!
      </div>
      <div className="flex h-full items-center justify-center bg-primary-100  ">
        그룹 2 00/00/00 66일 달성!
      </div>
      <div className="flex h-full items-center justify-center bg-primary-100  ">
        그룹 3 00/00/00 66일 달성!
      </div>
    </Carousel>
  )
}

const ListItemSamll = ({ text }) => {
  return (
    <li className="w-1/3  " key={text}>
      <div className="m-2  text-center bg-white">{text}</div>
    </li>
  )
}

export const TopRank = ({ list = rankList }) => {
  return (
    <div
      className=" relative  w-full  h-full py-10 rounded-3xl flex  items-center justify-center shadow-md"
      style={{
        backgroundImage: `url(/images/rankPage/rank_bg.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="  w-full  p-3   flex flex-col items-center justify-center ">
        <div className="flex  w-full justify-center ml-14">
          <div className="w-[33%] h-full  flex items-center animate-prize-silver relative top-16 ">
            <img
              src="/images/rankPage/ruby.png"
              alt=""
              className=" w-[80%] h-[80%] "
            />
            <div className="text-lg font-semibold absolute  flex justify-center items-center w-[80%] h-[80%]  ">
              그룹B
            </div>
          </div>
          <div className="w-[33%] h-full flex items-center animate-prize-gold relative ">
            <img
              src="/images/rankPage/diamond.png"
              alt=""
              className=" w-full h-full"
            />
            <div className="text-lg font-semibold  absolute  flex justify-center items-center w-full h-full ">
              그룹A
            </div>
          </div>

          <div className="w-[33%] h-full flex items-center animate-prize-bronze relative  top-20 left-8 ">
            <img
              src="/images/rankPage/gold.png"
              alt=""
              className=" w-[75%] h-[75%]"
            />
            <div className="text-lg font-semibold absolute  flex justify-center items-center w-[75%] h-[75%] ">
              그룹C
            </div>
          </div>
        </div>
        <div className=" h-16 w-4/5 shadow-md">
          <RankSlider />
        </div>
      </div>
    </div>
  )
}
