import { Carousel } from "flowbite-react"

export default function Tutorial() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-4/5 flex flex-col justify-center my-14">
        <div className="flex text-primary-700 justify-center font-extrabold text-3xl">
          📖 튜토리얼{" "}
        </div>
        <div className="h-[45rem]">
          <Carousel slide={false}>
            <div className="w-full flex shadow-md rounded-3xl">
              <div className="w-1/5 bg-primary-100 p-10 rounded-tl-3xl rounded-bl-3xl">
                <span className="text-9xl font-bold text-white">1</span>
                <p className="mt-5">
                  신규 그룹을 생성하거나 초대 링크를 통해 친구의 그룹에
                  가입합니다.
                </p>
                <p className="mt-5">그룹은 최대 5개까지 가입 가능합니다.</p>
              </div>
              <img
                src="/images/tutorial/tutorial1.gif"
                alt=""
                className="w-4/5 rounded-tr-3xl rounded-br-3xl"
              />
            </div>
            <div className="w-full flex shadow-md rounded-3xl">
              <div className="w-1/5 bg-primary-200 p-10 rounded-tl-3xl rounded-bl-3xl">
                <span className="text-9xl font-bold text-white">2</span>
                <p className="mt-5">
                  그룹 페이지의 운동 루틴 관리 버튼을 눌러 루틴을 만들거나 수정,
                  삭제 할 수 있습니다.
                </p>
                <p className="mt-5">
                  원하는 종목을 눌러 추가한 후 개수를 설정해보세요.
                </p>
              </div>
              <img
                src="/images/tutorial/tutorial2.gif"
                alt=""
                className="w-4/5 rounded-tr-3xl rounded-br-3xl"
              />
            </div>
            <div className="w-full flex shadow-md rounded-3xl">
              <div className="w-1/5 bg-primary-300 p-10 rounded-tl-3xl rounded-bl-3xl">
                <span className="text-9xl font-bold text-white">3</span>
                <p className="mt-5">운동 방을 개설해보세요.</p>
                <p className="mt-5">
                  방장이 선택한 루틴에 맞춰 다 같이 운동을 할 수 있습니다.
                </p>
              </div>
              <img
                src="/images/tutorial/tutorial3.gif"
                alt=""
                className="w-4/5 rounded-tr-3xl rounded-br-3xl"
              />
            </div>
            <div className="w-full flex shadow-md rounded-3xl">
              <div className="w-1/5 bg-primary-400 p-10 rounded-tl-3xl rounded-bl-3xl">
                <span className="text-9xl font-bold text-white">4</span>
                <p className="mt-5">
                  운동이 끝난 후 운동 결과 페이지에서 자신과 모두의 달성률을
                  확인할 수 있습니다.
                </p>
              </div>
              <img
                src="/images/tutorial/tutorial4.gif"
                alt=""
                className="w-4/5 rounded-tr-3xl rounded-br-3xl"
              />
            </div>
            <div className="w-full flex shadow-md rounded-3xl">
              <div className="w-1/5 bg-primary-500 p-10 rounded-tl-3xl rounded-bl-3xl">
                <span className="text-9xl font-bold text-white">5</span>
                <p className="mt-5">
                  마이 페이지에서 매일매일 내가 한 운동과 시간을 확인해볼 수
                  있습니다. 운동을 하면 바로 도장이 찍힙니다.
                </p>
              </div>
              <img
                src="/images/tutorial/tutorial5.gif"
                alt=""
                className="w-4/5 rounded-tr-3xl rounded-br-3xl"
              />
            </div>
            <div className="w-full flex shadow-md rounded-3xl">
              <div className="w-1/5 bg-primary-600 p-10 rounded-tl-3xl rounded-bl-3xl">
                <span className="text-9xl font-bold text-white">6</span>
                <p className="mt-5 text-gray-300">
                  그룹 페이지에서 오늘 운동을 진행한 멤버의 이름표에는 색상이
                  칠해집니다.
                </p>
                <p className="mt-5 text-gray-300">
                  모든 멤버가 운동을 진행하였을 시 밤 12시가 지나면 캘린더에
                  도장이 찍힙니다.
                </p>
              </div>
              <img
                src="/images/tutorial/tutorial6.gif"
                alt=""
                className="w-4/5 rounded-tr-3xl rounded-br-3xl"
              />
            </div>
            <div className="w-full flex shadow-md rounded-3xl">
              <div className="w-1/5 bg-primary-700 p-10 rounded-tl-3xl rounded-bl-3xl">
                <span className="text-9xl font-bold text-white">7</span>
                <p className="mt-5 text-gray-300">
                  특정 조건을 달성해서 숨겨진 아이콘이나 스트릭 실드를 획득할 수
                  있습니다.
                </p>
                <p className="mt-5 text-sm text-gray-300">
                  (실드가 있을 경우 모두가 운동을 하지 않은 날도 스트릭이
                  유지됩니다.)
                </p>
              </div>
              <img
                src="/images/tutorial/tutorial7.gif"
                alt=""
                className="w-4/5 rounded-tr-3xl rounded-br-3xl"
              />
            </div>
            <div className="w-full flex shadow-md rounded-3xl">
              <div className="w-1/5 bg-primary-800 p-10 rounded-tl-3xl rounded-bl-3xl">
                <span className="text-9xl font-bold text-white">8</span>
                <p className="mt-5 text-gray-300">
                  명예의 전당에서 그룹과 개인의 랭킹을 확인해 볼 수 있습니다.
                </p>
                <p className="mt-5 text-gray-300">
                  매일매일 운동을 열심히 해서 랭킹을 달성해보세요!
                </p>
              </div>
              <img
                src="/images/tutorial/tutorial8.gif"
                alt=""
                className="w-4/5 rounded-tr-3xl rounded-br-3xl"
              />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  )
}
