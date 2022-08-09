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

const ListItem = ({ text, rank }) => {
  return (
    <li
      className=" w-9/12 flex my-3 bg-white p-4 pl-5 h-16 rounded-3xl shadow-md"
      key={rank}
      data-aos="flip-down"
    >
      <h2 className="text-black font-semibold text-xl  py-2 text-center flex w-full items-center">
        <div className=" w-2/12   text-primary-300  bg-white  font-semibold  mr-2  ">
          {rank + 1}위
        </div>
        <div className="w-10/12 text-center text-gray-500"> {text}</div>
      </h2>
    </li>
  )
}

export const RankList = ({
  title = "제목",
  description = "랭킹 설명",
  list = rankList,
}) => {
  return (
    <>
      <h2 className="text-center text-4xl p-2 rounded-3xl m-2  w-4/6  font-bold ">
        {title}
      </h2>
      <p className=" font-semibold mb-6">{description}</p>
      <div className="w-full">
        <ul className=" flex flex-col justify-center items-center">
          {list.map((group, index) => (
            <ListItem text={group} key={index} rank={index} />
          ))}
        </ul>
      </div>
    </>
  )
}
