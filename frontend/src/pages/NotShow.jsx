export default function NotShow() {
  return (
    <div
      className="w-screen h-screen bg-white flex justify-center items-center notshow"
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        zIndex: "999",
      }}
    >
      <div className="notshow2">
        <div className="flex flex-col items-center">
          <p className="text-4xl font-semibold">
            본 사이트는 가로 1240px 이상만 보입니다.
          </p>
          <p className="text-4xl mt-10 font-semibold">
            가로 사이즈를 늘려주세요
          </p>
        </div>
      </div>
    </div>
  )
}
