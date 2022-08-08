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
      className=" w-9/12 flex m-2 bg-lgBlue-100  p-4 pl-5 h-16"
      key={rank}
      data-aos="flip-down"
    >
      <div className="w-2/12">{rank + 1}등 </div>
      <div className="w-10/12 text-center">{text}</div>
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
      <h2 className="text-center  text-2xl p-2 rounded-3xl m-2 w-4/6  font-bold">
        {title}
      </h2>
      <p className=" font-semibold">{description}</p>
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
