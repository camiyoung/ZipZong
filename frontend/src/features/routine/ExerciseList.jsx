import ImageIcon from "../../components/icon/ImageIcon"

const exerciseList = [
  {
    name: "푸쉬업",
    icon: "https://i1.sndcdn.com/artworks-erzOr48vb9Eirk8t-SUOCEg-t500x500.jpg",
  },
  {
    name: "버피",
    icon: "https://obj-kr.thewiki.kr/data/53637265656e73686f745f323031382d31302d32322d30302d35362d33337e322e706e67.png",
  },
  {
    name: "레그레이즈",
    icon: "https://mblogthumb-phinf.pstatic.net/20150621_132/jihorose_14348943565211fc7C_JPEG/_6263770.jpg?type=w2",
  },
  {
    name: "마운틴클라이밍",
    icon: "https://pbs.twimg.com/media/Dyt7HHwVAAIg2Oy.jpg",
  },
  {
    name: "스쿼트",
    icon: "https://pbs.twimg.com/profile_images/512585847162417152/GDerpg-I_400x400.jpeg",
  },
]

export default function ExerciseList() {
  return (
    <div className="flex justify-center">
      {exerciseList.map(({ name, icon }) => {
        return (
          <div className="p-5">
            <div className="flex justify-center pt-3">
              <ImageIcon size="xLarge" shape="round" image={icon}></ImageIcon>
            </div>
            <div className="flex justify-center p-3">{name}</div>
          </div>
        )
      })}
    </div>
  )
}
