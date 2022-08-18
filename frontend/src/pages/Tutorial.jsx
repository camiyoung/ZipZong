import { Carousel } from "flowbite-react"

export default function Tutorial() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-4/5 flex flex-col justify-center mt-14 border-4">
        <div className="flex text-primary-700 justify-center font-extrabold text-3xl">
          📖튜토리얼{" "}
        </div>
        <div className="w-full">
          <Carousel slide={false}>
            <div>내놔</div>
            <div>여기</div>
          </Carousel>
        </div>
      </div>
    </div>
  )
}
