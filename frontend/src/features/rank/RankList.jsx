import { Avatar } from "flowbite-react";
import { useEffect, useState } from "react";
import { http } from "../../api/axios";

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
];

// const info = {
//   nickname: "승주",
//   memberIcon: "whale",
//   currentStrick: 75,
//   maximumStrick: 75,
//   totalTime: 180,
// }

// const info = {
//   teamName: "헬창들",
//   // nickname: "gg",
//   teamIcon: "groupMaxExerciseTime10000",
//   createDate: "2022-08-16",
//   currentStrick: 0,
//   maximumStrick: 50,
//   totalTime: 30036,
//   teamLeader: "지영지영지영",
//   teamMembers: ["지영지영지영", "송지", "ㄹㄹ", "지영2"],
//   content: "운동에 누구보다 진심",
// }

const InfoModal = ({ id, type }) => {
  const [info, setInfo] = useState();
  useEffect(() => {
    async function getInfo() {
      const category = type === "group" ? "team" : "member";
      const {
        data: { data },
      } = await http.get(`information/${category}/${id}`);
      setInfo(data);
    }
    if (id && type) getInfo();
    else {
      setInfo({
        currentStrick: -1,
      });
    }
  }, [type]);
  return (
    <div
      className="w-full h-full  absolute  opacity-0  hover:opacity-100  z-50 transition-all hover:duration-700"
      onClick={() => {
        console.log(info);
      }}
    >
      {info && info.currentStrick !== -1 && (
        <div className="w-48  absolute -right-8 translate-y-2  z-10  rounded-2xl p-3 text-sm bg-white shadow-md border-lgBlue-300 border-4">
          {info && (
            <div className="w-full h-full roudned-2xl text-center">
              <h1 className="text-base font-medium mb-0.5">
                {info.nickname || info.teamName}
              </h1>
              {info.createDate && (
                <p className="text-xs mb-1">
                  <span>
                    생성 : {info.createDate[0]}년 {info.createDate[1]}월{" "}
                    {info.createDate[2]}일{" "}
                  </span>
                </p>
              )}
              {info.content ? (
                <p className=" text-xs mb-2 border-b-2 border-b-lightBlue pb-1 pb">
                  {info.content}
                </p>
              ) : (
                <p className=" text-xs mb-2 border-b-2 border-b-lightBlue pb-1 pb"></p>
              )}

              <div className="p-1 rounded mb-2">
                <p> 총 운동 시간 : {info.totalTime}분</p>
                <p>최대 스트릭 : {info.maximumStrick}일</p>
                <p>현재 스트릭 : {info.currentStrick}일</p>
              </div>
              {type === "group" && (
                <div className=" bg-white text-xs border-t-2 border-t-lightBlue pt-1">
                  {info.teamMembers && (
                    <p className="text-xs"> {info.teamMembers.join(" / ")}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ListItem = ({ group, type }) => {
  return (
    <div className="w-full relative flex justify-center">
      <InfoModal id={group.teamId || group.memberId} type={type} />
      <li
        className=" w-9/12 flex my-3 bg-white px-2 pl-4 h-16 rounded-3xl shadow-md relative"
        data-aos="flip-down"
      >
        {group.rank > 0 ? (
          <h2 className="text-black  text-xl  py-2 text-center flex w-full items-center justify-evenly">
            <div className=" w-1/12 min-w-[50px]   text-primary-300  bg-white  font-semibold  mr-2  ">
              {group.rank}위
            </div>
            <div className=" w-2/12  flex justify-center ">
              <Avatar
                img={`/images/badgeIcon/${group.teamIcon}.png`}
                rounded={true}
              />
            </div>

            <div className=" text-center font-semibold text-lg text-gray-500 w-6/12 ">
              {group.teamName}
            </div>
            {group.maxStrick && (
              <div className=" text-center text-base font-semibold text-gray-500 w-3/12 min-w-[110px] ">
                {group.maxStrick} 일째 {group.rank <= 3 && <span>🔥</span>}
              </div>
            )}
            {group.totalTime && (
              <div className=" text-center text-base font-semibold text-gray-500 w-3/12 min-w-[110px]">
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
    </div>
  );
};

const defaultItem = {
  rank: "-1",
};

export const RankList = ({
  title = "제목",
  description = "랭킹 설명",
  list = rankList,
  type,
}) => {
  let rankList = [...list];
  console.log(title, type);
  if (rankList.length < 10) {
    for (let i = rankList.length; i < 10; i++) rankList.push(defaultItem);
  }

  if (type !== "group") {
    const tmpList = rankList.map((item) => {
      return { ...item, teamName: item.nickName, teamIcon: item.memberIcon };
    });
    rankList = tmpList;
  }

  // console.log(rankList)
  const category = type === "group" ? "그룹" : "개인";

  return (
    <>
      <h2 className="text-center text-4xl p-2 rounded-3xl m-2  w-4/6  font-bold relative ">
        <span className="relative">
          <span className="bg-blue-100  text-purple-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded absolute left-10 -top-3 -translate-x-3 -rotate-12 ">
            {category}
          </span>
          {title}
        </span>
      </h2>
      <div className="flex flex-col items-center text-gray-500">
        <p className=" text-md font-medium mb-3">{description[0]}</p>
      </div>

      <div className="w-full">
        <ul className=" flex flex-col justify-center items-center">
          {rankList.map((group, index) => (
            <ListItem group={group} key={index} type={type} />
          ))}
        </ul>
      </div>
    </>
  );
};
