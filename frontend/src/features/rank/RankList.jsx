import { Avatar } from "flowbite-react"

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

const ListItem = ({ group }) => {
  return (
    <li
      className=" w-9/12 flex my-3 bg-white px-2 pl-4 h-16 rounded-3xl shadow-md "
      data-aos="flip-down"
    >
      {group.rank > 0 ? (
        <h2 className="text-black  text-xl  py-2 text-center flex w-full items-center justify-evenly">
          <div className=" w-1/12   text-primary-300  bg-white  font-semibold  mr-2  ">
            {group.rank}위
          </div>
          <div className=" w-2/12  flex justify-center ">
            <Avatar
              img={`/images/badgeIcon/${group.teamIcon}.png`}
              rounded={true}
            />
          </div>

          <div className=" text-center font-semibold text-xl text-gray-500 w-6/12 ">
            {group.teamName}
          </div>
          {group.maxStrick && (
            <div className=" text-center text-lg  font-medium text-gray-500 w-3/12 ">
              {group.maxStrick} 일째 {group.rank <= 3 && <span>🔥</span>}
            </div>
          )}
          {group.totalTime && (
            <div className=" text-center text-lg  font-medium text-gray-500 w-3/12 ">
              {group.totalTime} 분째 {group.rank <= 3 && <span>🔥</span>}
            </div>
          )}
        </h2>
      ) : (
        <div className="flex justify-center items-center w-full">
          <Avatar rounded={true} />
        </div>
      )}
    </li>
  )
}

const defaultItem = {
  rank: "-1",
}

export const RankList = ({
  title = "제목",
  description = "랭킹 설명",
  list = rankList,
}) => {
  const rankList = [...list]
  if (rankList.length < 10) {
    for (let i = rankList.length; i < 10; i++) rankList.push(defaultItem)
  }

  return (
    <>
      <h2 className="text-center text-4xl p-2 rounded-3xl m-2  w-4/6  font-bold ">
        {title}
      </h2>
      <div className="flex flex-col items-center text-gray-500">
        <p className=" text-md font-medium mb-3">{description[0]}</p>
      </div>

      <div className="w-full">
        <ul className=" flex flex-col justify-center items-center">
          {rankList.map((group, index) => (
            <ListItem group={group} key={index} />
          ))}
        </ul>
      </div>
    </>
  )
}
