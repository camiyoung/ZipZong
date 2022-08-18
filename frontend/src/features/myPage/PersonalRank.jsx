import { useEffect, useState } from "react"
import { http } from "../../api/axios"

const ListItem = ({ item }) => {
  return (
    <li
      className={`flex  w-ful items-center justify-center h-8 w-full ${
        item.me ? "my-3.5" : "my-2.5"
      }`}
    >
      <div
        className={`flex justify-evenly  rounded-full shadow-md  border border-secondary-300 bg-white  shadow-lgBlue-200 ${
          item.me ? "py-2 w-[85%]" : " w-[75%]  py-1  "
        }`}
      >
        <div
          className={` w-1/12  min-w-[45px] text-center   font-semibold  pt-0.5   text-primary-300 `}
        >
          {item.rank} 위
        </div>
        <div
          style={{
            backgroundImage: `url(/images/badgeIcon/${item.memberIcon}.png)`,
          }}
          className={`bg-cover borderColor:border-secondary-900 w-[30px] h-[30px] rounded-full`}
        ></div>
        <div>
          {item.nickName}
          {item.me && (
            <span className="  bg-gradient-to-br from-[#7bcaff] to-[#ffb3f2]  text-white   text-xs text-center inline-block  font-semibold ml-2 px-2.5 py-0.5 rounded -translate-y-0.5">
              me
            </span>
          )}
        </div>
        {item.maxStrick && (
          <div className="text-center font-medium text-gray-500 ">
            {item.maxStrick}
            <span className="text-sm">일째</span>
          </div>
        )}
        {item.totalTime && (
          <div className="text-center  font-medium text-gray-500">
            {item.totalTime}
            <span className="text-sm">분째</span>
          </div>
        )}
      </div>
    </li>
  )
}

const RankList = ({ title, description, list }) => {
  return (
    <div className="w-full  h-full  ">
      <h1 className="text-center text-xl font-semibold pt-4 pl-6 h-[10%] mb-2">
        <span className="mr-2">{title}</span>
        <span className="text-sm font-medium">{description}</span>
      </h1>
      <div className="w-full flex flex-col justify-center  h-[90%]">
        <ul className="h-full justify-center items-center  flex flex-col w-full">
          {list.map((item, idx) => (
            <ListItem item={item} key={idx} />
          ))}
        </ul>
      </div>
    </div>
  )
}

const makeList = (list) => {
  if (!list) return undefined
  const over =
    list.over.length > 2
      ? list.over.slice(list.over.length - 2, list.over.length)
      : [...list.over]
  const under = list.under.length > 2 ? list.under.slice(0, 2) : [...list.under]

  const rankList = [...over, { ...list.me, me: true }, ...under]
  return rankList
}

function PersonalRank({ memberId, memberNickname }) {
  const [strickRank, setStrickRank] = useState()
  const [timeRank, setTimeRank] = useState()

  useEffect(() => {
    async function getRank() {
      const {
        data: { data },
      } = await http.get(`ranking/member/${memberId}`)
      const { strickRank, timeRank } = data

      setStrickRank(makeList(strickRank))
      setTimeRank(makeList(timeRank))
    }
    if (memberId) getRank()
  }, [memberId])

  return (
    <div className="flex mt-10 flex-col w-full">
      <div className="flex w-full justify-center">
        <div className=" rounded-3xl bg-white min-w-min h-[340px] w-[80%] flex shadow-md">
          <div
            className="w-1/4 bg-lgBlue-400 h-full bg-gradient-to-t from-lgBlue-500 to-secondary-300 flex flex-col justify-center items-center"
            style={{
              borderRadius: "1rem 0px 0px 1rem",
            }}
          >
            <p className="text-5xl text-white font-bold mb-3">개인 랭킹</p>
            <p className="text-lg text-white font-normal">
              {memberNickname} 님
            </p>
          </div>
          <div className="w-3/4 h-full flex items-center justify-center">
            {!strickRank && !timeRank ? (
              <span className="text-lg font-normal">
                {" "}
                개인 기록이 존재하지 않습니다.{" "}
              </span>
            ) : (
              <div className="flex justify-center w-full h-full ">
                <div className="flex w-1/2 ">
                  {timeRank && (
                    <RankList
                      title={"⏰ 타임 랭킹"}
                      description={"누적 시간"}
                      list={timeRank}
                    />
                  )}
                </div>
                <div className="flex w-1/2 ">
                  {strickRank && (
                    <RankList
                      title={"🗓️ 스트릭 랭킹"}
                      description={"최장 기간"}
                      list={strickRank}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalRank
